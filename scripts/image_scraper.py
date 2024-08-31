from flask import Flask, jsonify, send_file, abort
from flask_cors import CORS  # Import CORS
import tensorflow as tf
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from io import BytesIO
from PIL import Image
import random
import time
import os
import pathlib
import pandas as pd

class ImageScraper:
    def __init__(self):
        self.app = Flask(__name__)
        CORS(self.app)
        self.init_routes()
        
        self.script_dir = os.path.dirname(os.path.abspath(__file__))
        self.project_root = os.path.dirname(self.script_dir)
        self.image_dir = os.path.join(self.project_root, "saved_images")
        os.makedirs(self.image_dir, exist_ok=True)
        
        self.model_path = str(pathlib.Path(__file__).parent.resolve()) + "/cool_model.keras"
        self.cnn_model = tf.keras.models.load_model(self.model_path)
        
        self.url = "https://prnt.sc/"
        self.slidervalue = 3
        
        self.driver = self.initialize_webdriver()
        
    def initialize_webdriver(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument('--ignore-certificate-errors')
        chrome_options.add_argument('--disable-web-security')
        chrome_options.add_argument('--disable-site-isolation-trials')
        chrome_options.add_experimental_option("excludeSwitches", ["enable-logging", "enable-blink-features=TrustedDOMTypes"])
        chrome_options.add_argument('--log-level=3')
        
        return webdriver.Chrome(options=chrome_options)
    
    def init_routes(self):
        self.app.add_url_rule('/api/images/<int:slidervalue>', 'get_images', self.get_images)
        self.app.add_url_rule('/api/images/serveAll', 'serve_all_images', self.serve_all_images)
        self.app.add_url_rule('/image/<filename>', 'serve_image', self.serve_image)
        
    def run(self):
        try:
            print("Starting Python server...")
            self.app.run(host='0.0.0.0', port=5000, threaded=False)
        except KeyboardInterrupt:
            print("Shutting down gracefully...")
        finally:
            self.driver.quit()
        
    def check_image_csv(self):
        if not os.path.exists(self.image_dir):
            os.makedirs(self.image_dir, exist_ok=True)
        
        csv_path = os.path.join(self.script_dir, "images.csv")
        if os.path.exists(csv_path):
            df = pd.read_csv(csv_path)
            return df.to_dict('records')
        return []
            
    def get_images(self, slidervalue):
        images = self.find_image_url(slidervalue)
        return jsonify(images)
    
    def serve_all_images(self):
        images = self.check_image_csv()
        return jsonify(images)
    
    def serve_image(self, filename):
        image_path = os.path.join(self.image_dir, filename)
        if not os.path.exists(image_path):
            return abort(404)
        return send_file(image_path)
    
    def delete_images(self):
        for file in os.listdir(self.image_dir):
            os.remove(os.path.join(self.image_dir, file))
            
    def generate_url(self):
        return self.url + ''.join(random.choices("abcdefghijklmnopqrstuvwxyz0123456789", k=6))
    
    def find_image_url(self, slidervalue):
        images = self.check_image_csv()
        num_images = 0
        all_images = set()
        
        while num_images < slidervalue:
            image_url = self.generate_url()
            print("\033[94m" + f"Fetching image URL: {image_url}" + "\033[0m")
            if image_url in all_images:
                continue
            
            self.driver.get(image_url)
            
            try:
                WebDriverWait(self.driver, 5).until(
                    EC.presence_of_element_located((By.CLASS_NAME, 'under-image'))
                )
            except:
                all_images.add(image_url)
                continue
            
            try:
                div = self.driver.find_element(By.CLASS_NAME, 'under-image')  # Corrected to self.driver
                image_element = div.find_element(By.TAG_NAME, 'img')
                image_src = image_element.get_attribute('src')

                if image_src:
                    # Take a snapshot of the image and show it using matplotlib
                    image_png = image_element.screenshot_as_png
                    image_open = Image.open(BytesIO(image_png))
                    image = tf.image.resize(image_open, [224, 224])
                    image = tf.cast(image, tf.float32) / 255.0
                    image = tf.expand_dims(image, 0)

                    prediction = self.cnn_model.predict(image)
                    if prediction[0][0] > 0.5:
                        # Get the width and height
                        width, height = image_open.size

                        filename = f"image_{len(images)}.png"
                        image_open.save(os.path.join(self.image_dir, filename))

                        full_image = {
                            "image": f"http://localhost:5000/image/{filename}",  # Local server URL for the saved image
                            "width": width,
                            "height": height
                        }

                        images.append(full_image)
                        num_images += 1
                        print("\033[92m" + f"Image added to list {num_images}/{slidervalue}" + "\033[0m")
                    else:
                        print("\033[93m" + "Image not added to list" + "\033[0m")

                all_images.add(image_url)
            except Exception as e:
                if "stale element reference" in str(e):
                    print("\033[93m" + "Stale element reference, retrying..." + "\033[0m")
                    continue  # Skip and retry fetching another URL
                print("\033[91m" + f"An error occurred: {str(e)}" + "\033[0m")
                
            time.sleep(random.uniform(0.5,1))
            
        df = pd.DataFrame(images)
        df.to_csv(os.path.join(self.script_dir, "images.csv"), index=False)
        return images
    
    
if __name__ == '__main__':
    scraper = ImageScraper()
    scraper.run()