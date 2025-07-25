# 🏕️ Wanderlust

Wanderlust is a full-stack web application inspired by Airbnb. It allows users to discover, list, book, and review unique accommodations around the world. This project demonstrates a complete MERN-stack-like development cycle, featuring robust backend functionalities and a dynamic, server-rendered frontend.

[![GitHub repo size](https://img.shields.io/github/repo-size/Mehul-Agarwaal/wanderlust?style=flat-square)](https://github.com/Mehul-Agarwaal/wanderlust)
[![GitHub language count](https://img.shields.io/github/languages/count/Mehul-Agarwaal/wanderlust?style=flat-square)](https://github.com/Mehul-Agarwaal/wanderlust)
[![GitHub last commit](https://img.shields.io/github/last-commit/Mehul-Agarwaal/wanderlust?style=flat-square)](https://github.com/Mehul-Agarwaal/wanderlust)

**Live Demo:** [Click here](https://wanderlust-krt7.onrender.com)

---

## ✨ Features

* **User Authentication:** Secure user registration and login functionality using Passport.js.
* **RESTful Routing:** Follows REST principles for predictable and clean API endpoints.
* **CRUD for Listings:** Users can Create, Read, Update, and Delete their own property listings.
* **Image Uploads:** Seamless image uploading to the cloud via Cloudinary.
* **Interactive Maps:** Listings are displayed on an interactive map using the Mapbox API, showing the precise location.
* **Reviews and Ratings:** Authenticated users can post and delete reviews for different listings.
* **Responsive Design:** A mobile-first approach ensures the application is accessible and looks great on all devices, from desktops to mobile phones.
* **Schema Validation:** Server-side data validation to ensure data integrity before saving to the database.
* **Flash Messages:** Provides users with contextual feedback (e.g., success or error messages) after performing actions.

---

## 🛠️ Tech Stack

This project is built with the following technologies:

* **Backend:** Node.js, Express.js
* **Frontend:** EJS (Embedded JavaScript templates), CSS, Bootstrap
* **Database:** MongoDB (with Mongoose for object data modeling)
* **Authentication:** Passport.js (Local Strategy)
* **Image Hosting:** Cloudinary
* **Geocoding & Maps:** Mapbox
* **Middleware & Utilities:** `method-override`, `connect-flash`, `express-session`, `joi`

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:
* [Node.js](https://nodejs.org/en/) (which includes npm)
* [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/Mehul-Agarwaal/wanderlust.git](https://github.com/Mehul-Agarwaal/wanderlust.git)
    cd wanderlust
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory of the project and add the following variables. You will need to get your own API keys from the respective services.

    ```env
    # Cloudinary Credentials for image storage
    CLOUDINARY_CLOUD_NAME=<your_cloud_name>
    CLOUDINARY_API_KEY=<your_api_key>
    CLOUDINARY_API_SECRET=<your_api_secret>

    # Mapbox API Token for maps
    MAP_TOKEN=<your_mapbox_token>

    # MongoDB Connection URL
    # For local DB: MONGO_URL=mongodb://127.0.0.1:27017/wanderlust
    # For Atlas: MONGO_URL=<your_mongodb_atlas_connection_string>
    MONGO_URL=mongodb://127.0.0.1:27017/wanderlust

    # A secret string for signing the session ID cookie
    SECRET=<your_session_secret>
    ```

4.  **Run the application:**
    The project uses `nodemon` for development, which automatically restarts the server on file changes.
    ```sh
    nodemon app.js
    ```
    If you don't have `nodemon` installed globally, you can use `node`:
    ```sh
    node app.js
    ```
    The application should now be running on `http://localhost:8080`.

---

## 📄 License

This project can be used under the MIT License. See the `LICENSE` file for more details. *(Suggestion: Add a LICENSE file to your repository for clarity).*

---

## 👤 Author

**Mehul Agarwal**

* **GitHub:** [@Mehul-Agarwaal](https://github.com/Mehul-Agarwaal)

Feel free to reach out if you have any questions or suggestions!
