import subprocess
import sys

# List of required packages
required_packages = [
    'flask', 'flask-cors', 'tensorflow', 'selenium', 'pillow', 'pandas'
]

# Function to check if a package is installed
def check_package(package):
    try:
        subprocess.check_call([sys.executable, '-m', 'pip', 'show', package], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        return True
    except subprocess.CalledProcessError:
        return False

# Function to install a package
def install_package(package):
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', package])

# Check and install missing packages
if __name__ == '__main__':
    for package in required_packages:
        if not check_package(package):
            print(f"Installing missing package: {package}")
            install_package(package)
        else:
            print(f"Package already installed: {package}")
