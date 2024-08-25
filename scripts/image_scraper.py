from flask import Flask, jsonify, send_file, abort
from flask_cors import CORS  # Import CORS
import json
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

app = Flask(__name__)
CORS(app) # allow cors for all routes

# Load the model
CNN_MODEL = tf.keras.models.load_model("scripts/cool_model.keras", compile=False)

TOTAL_IMAGES = 5
url = "https://prnt.sc/"

# Set up Chrome options
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run in headless mode
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument('--ignore-certificate-errors')
chrome_options.add_argument('--disable-web-security')
chrome_options.add_argument('--disable-site-isolation-trials')

# Add logging preferences to suppress some logs
chrome_options.add_experimental_option("excludeSwitches", ["enable-logging", "enable-blink-features=TrustedDOMTypes"])
chrome_options.add_argument('--log-level=3')  # Set log level to suppress unwanted logs

# Initialize the WebDriver with options
driver = webdriver.Chrome(options=chrome_options)

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
# Move up one directory to get to 'tokamak'
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
IMAGE_DIR = os.path.join(PROJECT_ROOT, "saved_images")
os.makedirs(IMAGE_DIR, exist_ok=True)

@app.route('/api/images', methods=['GET'])
def get_images():
    delete_images()
    images = find_image_url()
    print("Returning images:", images)
    return jsonify(images)


@app.route('/image/<filename>', methods=['GET'])
def serve_image(filename):
    print("Current working directory:", os.getcwd())
    print("Script directory:", SCRIPT_DIR)
    print("Project root directory:", PROJECT_ROOT)
    print("Image directory being used:", IMAGE_DIR)

    image_path = os.path.join(IMAGE_DIR, filename)
    print(f"Attempting to serve file from: {image_path}")

    if not os.path.exists(image_path):
        print(f"File not found: {image_path}")
        return abort(404)  # Return a 404 error if the file is not found

    return send_file(image_path, mimetype='image/png')

def delete_images():
    for file in os.listdir(IMAGE_DIR):
        os.remove(os.path.join(IMAGE_DIR, file))

def generate_url():
    return url + ''.join(random.choices('abcdefghijklmnopqrstuvwxyz0123456789', k=6))

def find_image_url():
    images = []
    all_images = set()
    while len(images) < TOTAL_IMAGES:
        image_url = generate_url()
        print("Checking", image_url)

        if image_url in all_images:
            continue

        driver.get(image_url)
        
        try:
            # Wait for the 'under-image' div to load (if it exists)
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'under-image'))
            )
        except:
            print("No div found, skipping this URL")
            all_images.add(image_url)
            continue  # Skip to the next iteration if the div is not found

        try:
            # Find the image element within the 'under-image' div
            div = driver.find_element(By.CLASS_NAME, 'under-image')
            image_element = div.find_element(By.TAG_NAME, 'img')
            image_src = image_element.get_attribute('src')

            if image_src:
                # Take a snapshot of the image and show it using matplotlib
                image_png = image_element.screenshot_as_png
                image_open = Image.open(BytesIO(image_png))
                image = tf.image.resize(image_open, [224, 224])
                image = tf.cast(image, tf.float32) / 255.0
                image = tf.expand_dims(image, 0)

                prediction = CNN_MODEL.predict(image)
                if prediction[0][0] > 0.5:
                    # Get the width and height
                    width, height = image_open.size

                    filename = f"image_{len(images)}.png"
                    image_open.save(os.path.join(IMAGE_DIR, filename))

                    full_image = {
                        "image": f"http://localhost:5000/image/{filename}",  # Local server URL for the saved image
                        "width": width,
                        "height": height
                    }

                    images.append(full_image)
                    print("\033[92m" + f"Image added to list {len(images)}/{TOTAL_IMAGES}" + "\033[0m")
                else:
                    print("\033[93m" + "Image not added to list" + "\033[0m")

            all_images.add(image_url)
        except Exception as e:
            if "stale element reference" in str(e):
                print("\033[93m" + "Stale element reference, retrying..." + "\033[0m")
                continue  # Skip and retry fetching another URL
            print("\033[91m" + f"An error occurred: {str(e)}" + "\033[0m")


              # Sleep between 0.5 and 1 seconds
        time.sleep(random.uniform(0.5, 1))

    return images

if __name__ == '__main__':
    try:
        print("Starting Python server...")
        app.run(host='0.0.0.0', port=5000, threaded=False)
    except KeyboardInterrupt:
        print("Shutting down gracefully...")
    finally:
        driver.quit()  # Ensure the WebDriver quits gracefully

