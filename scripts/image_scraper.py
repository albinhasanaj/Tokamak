from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import random
import time

TOTAL_IMAGES = 10

url = "https://prnt.sc/"

# Set up Chrome options
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run in headless mode
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

# Set logging preferences
chrome_options.set_capability('goog:loggingPrefs', {'browser': 'ALL'})

# Initialize the WebDriver with options
driver = webdriver.Chrome(options=chrome_options)

# Function to disable logging
def disable_console_logs():
    driver.set_window_size(1920, 1080)
    driver.execute_script("window.console.log = function() {};")
    driver.execute_script("window.console.warn = function() {};")
    driver.execute_script("window.console.error = function() {};")

# Before loading the page, disable console logs
disable_console_logs()

def generate_url():
    return url + ''.join(random.choices('abcdefghijklmnopqrstuvwxyz0123456789', k=6))

def find_image_url():
    images = []
    while len(images) < TOTAL_IMAGES:
        image_url = generate_url()
        print("Checking", image_url)
        driver.get(image_url)
        
        try:
            # Wait for the 'under-image' div to load (if it exists)
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'under-image'))
            )
        except:
            print("No div found, skipping this URL")
            continue # Skip to the next iteration if the div is not found

        try:
            # Find the image element within the 'under-image' div
            div = driver.find_element(By.CLASS_NAME, 'under-image')
            image_element = div.find_element(By.TAG_NAME, 'img')
            image_src = image_element.get_attribute('src')

            if image_src:

                #TODO: USE A CNN TO CHECK IF THE IMAGE IS AN IMAGE OR NOT 
                raise Exception("CNN")

                images.append(image_src)
                print("Found image", image_src)

        except Exception as e:
            if str(e) == "CNN":
                print("CNN not implemented yet")
                quit()
            print("No image found, skipping this URL")

        time.sleep(random.uniform(1, 3))  # Sleep to mimic human behavior and avoid detection

    return images


if __name__ == '__main__':
    images = find_image_url()
    print("Collected Images:", images)
    driver.quit()
