# Poloroid - A Social Media Website

Poloroid is a social media website that allows users to sign up, log in, upload pictures with captions, and interact with other users through friend requests. Users can view posts from their accepted friends and stay connected with people in their network.


## Features

- User Authentication: Users can sign up and log in to their accounts securely.
- Picture Upload: Users can upload pictures along with captions to share their moments.
- Friend Requests: Users can send and receive friend requests to connect with others.
- News Feed: Users can view posts from their accepted friends on their personalized news feed.

## Technologies Used

- Next.js 13: A React framework for server-side rendering and building modern web applications.
- Tailwind CSS: A utility-first CSS framework for designing responsive and customizable UI components.
- Node.js: A JavaScript runtime environment that allows running server-side applications.
- Express: A minimal and flexible Node.js web application framework for handling server-side logic.
- MongoDB: A NoSQL database for storing user data and posts.

## Getting Started

To run Poloroid on your local machine, follow these instructions:

1. **Clone the repository:**

```bash
git clone https://github.com/ashish74624/MERNsocial.git
cd MERNsocial
```

2. **Install Dependencies:**

```bash
npm install
```

3. **Set Environment Variables:**

Create a `.env` file in the root directory and add the following:

```bash
MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key_for_session
```

Replace `your_mongodb_connection_string` with the MongoDB URI you use for connecting to the database and `your_secret_key_for_session` with a secure secret key for managing user sessions.

4. **Run the Application:**

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

## How to Use

1. **Sign Up:**
   - Open the Poloroid website and click on the "Sign Up" button.
   - Fill in the required details and create your account.

2. **Log In:**
   - After signing up, click on the "Log In" button.
   - Enter your credentials and log in to your account.

3. **Upload Pictures:**
   - Once logged in, navigate to the "Upload" page.
   - Choose an image and add a caption.
   - Click on the "Upload" button to share the picture.

4. **Send Friend Requests:**
   - Explore the "Users" page to find other users.
   - Click on the "Add Friend" button to send a friend request to a user.

5. **Accept Friend Requests:**
   - If someone sends you a friend request, you'll receive a notification.
   - Navigate to the "Friend Requests" page to see pending requests.
   - Click on "Accept" to become friends and see each other's posts.

6. **View News Feed:**
   - On the "News Feed" page, you'll see posts from your accepted friends.

## Contribute

Contributions are welcome! If you want to enhance Poloroid's features, fix bugs, or improve the UI/UX, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/fix: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature/fix"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request to the `main` branch.


## Contact

If you have any questions or feedback, feel free to contact us at ashish74624@gmail.com.

Thank you for using Poloroid! Enjoy connecting with friends and sharing your moments! 📸✨