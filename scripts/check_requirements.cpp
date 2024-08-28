#include <iostream>
#include <vector>
#include <cstdlib> // For system()
#include <string>
#include <sstream>       // For std::ostringstream
#include <chrono>        // For timing
#include <cstdio>        // For popen()
#include <unordered_set> // For unordered_set

// Function to get the list of installed Python packages
std::unordered_set<std::string> get_installed_packages()
{
    std::unordered_set<std::string> installed_packages;
    FILE *pipe = popen("pip list --format=freeze", "r");
    if (!pipe)
    {
        std::cerr << "Failed to get installed packages." << std::endl;
        return installed_packages;
    }

    char buffer[128];
    while (fgets(buffer, sizeof(buffer), pipe) != nullptr)
    {
        std::string line(buffer);
        auto pos = line.find("==");
        if (pos != std::string::npos)
        {
            installed_packages.insert(line.substr(0, pos));
        }
    }

    pclose(pipe);
    return installed_packages;
}

// Function to install Python packages
void install_packages(const std::vector<std::string> &packages)
{
    if (packages.empty())
    {
        return; // No packages to install
    }

    std::ostringstream cmd;
    cmd << "python -m pip install";

    for (const auto &package : packages)
    {
        cmd << " " << package;
    }

    int status = system(cmd.str().c_str());
    if (status != 0)
    {
        std::cerr << "Failed to install some packages." << std::endl;
    }
    else
    {
        std::cout << "All missing packages installed successfully." << std::endl;
    }
}

int main()
{
    auto start = std::chrono::high_resolution_clock::now(); // Start timing

    std::cout << "Starting package check..." << std::endl;

    const std::vector<std::string> required_packages = {
        "Flask", "Flask-Cors", "tensorflow", "selenium", "pillow", "pandas"};

    // Get list of currently installed packages
    std::unordered_set<std::string> installed_packages = get_installed_packages();

    std::vector<std::string> missing_packages;
    for (const auto &package : required_packages)
    {
        if (installed_packages.find(package) == installed_packages.end())
        {
            missing_packages.push_back(package);
        }
        else
        {
            std::cout << "Package already installed: " << package << std::endl;
        }
    }

    if (!missing_packages.empty())
    {
        std::cout << "Missing packages detected, starting installation..." << std::endl;
        install_packages(missing_packages); // Install all missing packages in one go
    }
    else
    {
        std::cout << "All packages are already installed." << std::endl;
    }

    auto end = std::chrono::high_resolution_clock::now(); // End timing
    std::chrono::duration<double> duration = end - start; // Calculate duration

    std::cout << "Program completed in " << duration.count() << " seconds." << std::endl;

    return 0;
}
