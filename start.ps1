# Navigate to the root folder
Set-Location -Path $PSScriptRoot

# Display the current directory
Write-Output "Current Directory: $(Get-Location)"

# Check if the .exe file exists
if (Test-Path "scripts\check_requirements.exe") {
    Write-Output "Executable found."
}
else {
    Write-Output "Executable not found. Exiting..."
    Read-Host -Prompt "Press Enter to exit"
    exit 1
}

# Run the executable and wait for it to complete
Write-Output "Running executable..."
Start-Process -FilePath "scripts\check_requirements.exe" -Wait

# Check the exit code of the executable
if ($LASTEXITCODE -ne 0) {
    Write-Output "The executable failed with exit code $LASTEXITCODE."
    Read-Host -Prompt "Press Enter to exit"
    exit $LASTEXITCODE
}

# Start the Python server in a new PowerShell window
Write-Output "Starting Python server in a new window..."
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", "python scripts\image_scraper.py"

# Wait for the Python server to start
Write-Output "Waiting for Python server to start..."

while ($true) {
    Start-Sleep -Seconds 2
    try {
        # Check a valid endpoint instead of the root URL
        $response = Invoke-WebRequest -Uri "http://localhost:5000/api/images/serveAll" -UseBasicParsing -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Output "Python server is ready."
            break
        }
        else {
            Write-Output "Received status code $($response.StatusCode), server not ready."
        }
    }
    catch {
        Write-Output "Error encountered: $_"
        Write-Output "Python server not ready, waiting..."
    }
}

# Run npm command to start the development server in the root folder
Write-Output "Starting npm development server..."
Start-Process -FilePath "npm" -ArgumentList "run", "dev" -NoNewWindow

# Pause to keep the window open after the script runs
Read-Host -Prompt "Press Enter to exit"
