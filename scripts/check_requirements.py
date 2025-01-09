import subprocess
import sys
import time

start_time = time.time()

# List of required packages
required_packages = [
    'flask', 'flask-cors', 'tensorflow', 'selenium', 'pillow', 'pandas'
]

# Function to check if a package is installed
def check_package(package):
    try:
        subprocess.run([sys.executable, '-m', 'pip', 'show', package], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        return True
    except subprocess.CalledProcessError:
        return False

# Collect missing packages
missing_packages = [pkg for pkg in required_packages if not check_package(pkg)]

# Install missing packages in one go
if missing_packages:
    print(f"Installing missing packages: {', '.join(missing_packages)}")
    subprocess.run([sys.executable, '-m', 'pip', 'install', *missing_packages])
else:
    print("All packages are already installed.")
    
print(f"Execution time: {time.time() - start_time:.2f} seconds")
