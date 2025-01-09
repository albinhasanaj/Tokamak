# Tokamak - Explore and Share Images

Tokamak is a unique social platform that allows users to explore, post, and interact with images scraped from the `prnt.sc` website. Leveraging a custom deep learning model, Tokamak intelligently detects valid images and distinguishes them from deleted or unavailable ones. Users can engage with content through likes, comments, and by sharing their own curated images.

## Features

### 1. User Registration and Authentication
- **Create an Account**: Users can sign up to create a personal account, enabling them to interact with the content and post their own images.
- **Secure Login**: Authentication is managed using **Clerk** to ensure user data security and privacy.

### 2. Explore Images
- **Dynamic Image Scraping**: Browse a variety of images scraped from `prnt.sc` using a Python backend powered by **Selenium** and a custom deep learning model developed with **TensorFlow**.
- **Custom Deep Learning Model**: This model filters out invalid images (e.g., those that have been deleted) and ensures only relevant content is presented to users.

### 3. Interact with Content
- **View and Like Posts**: Explore images posted by other users, read their descriptions, and give a "like" to show appreciation.
- **Comment on Posts**: Engage in conversations by leaving comments on your favorite images.

### 4. Create and Share Your Own Posts
- **Explore and Select Images**: Use the **Explore** page to browse various images scraped from `prnt.sc`. If you find an image you like, click on it to start crafting your post.
- **Add a Description**: Write a custom description for the image before sharing it with the community.
- **Post to the Community**: Share your curated image and description on the homepage for other users to see and interact with.

### 5. Dynamic Image Fetching
- **Fetch New Images**: If the current selection of images does not appeal to you, easily fetch a new batch. You can choose how many images to fetch, ranging from 1 to 25 per request.
- **Control Your Feed**: This feature allows users to have a fresh set of images to choose from, keeping the exploration experience dynamic and personalized.

### 6. Profile Management
- **Edit Your Posts**: Visit your profile page to manage your posted images. Update the description if needed to keep your content up-to-date.
- **Delete Posts**: If you change your mind about a post, you can easily remove it from your profile.

## How It Works

1. **Image Scraping and Filtering**: The backend uses **Python** and **Selenium** to scrape images from `prnt.sc`. Images are processed through a custom **TensorFlow** model that detects valid images and filters out unwanted content.
2. **Frontend and User Interaction**: The frontend, built with **Next.js** and **React**, provides a seamless user interface for browsing, interacting, and posting images.
3. **User Authentication**: **Clerk** is used to manage user registration, login, and authentication, ensuring a secure and personalized user experience.
4. **Responsive Design**: The application is styled using **Tailwind CSS**, ensuring it looks great on all devices and screen sizes.

## Technologies Used

- **Next.js**: Framework for building server-rendered React applications.
- **React**: JavaScript library for building user interfaces.
- **Python**: Backend scripting for web scraping and image processing.
- **Selenium**: Tool for automating web browser interaction.
- **TensorFlow**: Machine learning framework for building and training the custom deep learning model.
- **Clerk**: User authentication service.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **PostCSS**: Tool for transforming CSS with JavaScript plugins.

## Getting Started

### Prerequisites

- **Node.js** and **npm/yarn** installed for frontend development.
- **Python**

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/albinhasanaj/Tokamak.git
   cd Tokamak
2. Navigate to the scripts folder, and follow the readme instructions
3. Run **npm install** in the command prompt
4. Run the **start.bat**
5. Enjoy :)
