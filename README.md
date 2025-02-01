

# Beyonder - Chatbot Integration Platform
![image](https://github.com/user-attachments/assets/244de4b1-ec18-4395-8344-7af2d6618455)


[LIVE-LINK](https://beyonder-chat.vercel.app/)

Beyonder is a powerful platform that allows businesses to easily integrate AI-powered chatbots into their websites. The platform provides a seamless onboarding experience, website scraping for chatbot training, and real-time chatbot integration and testing.

## Features

### User Onboarding:

- User registration with email/password or Google OAuth.

- Email verification for secure signups.

### Organization Setup:

- Add company details (name, website URL, description).

- Auto-fetch meta descriptions from the website URL.


### Scraping Progress:

- View scraped data chunks for each webpage.

### Chatbot Integration:

- Test the chatbot on the client’s website.

- Provide easy-to-follow instructions for integration.

- Test the integration and display success/failure UIs.

### Chatbot Testing:

- A floating chatbot button on the client’s website.

- Interactive chatbot UI for real-time conversations.


## Tech Stack

### Frontend:

- Next.js (App Router)

- Tailwind CSS

- Framer Motion (for animations)

- React Icons
- HeroUI
- Firebase

### Backend:

- Next.js API Routes

- Cheerio (for web scraping)

- OpenAI API (for chatbot responses)

### Deployment:

- Vercel (for hosting)

- GitHub (for version control)

## Setup Instructions
```bash
1. Clone the Repository
git clone https://github.com/tuhinexe/beyonder.git

cd Beyonder

2. Install Dependencies

npm install
```
3. Set Up Environment Variables
Create a .env.local file in the root directory and add the following variables:

```env
# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# OpenAI API
OPENAI_API_KEY=your-openai-api-key
```
4. Run the Development Server
bash
Copy
npm run dev
Visit http://localhost:3000 to view the application.

Project Structure
Beyonder/
```bash
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── chat/
│   │   └── scrape/
│   ├── components/
│   ├── login/
│   ├── dashboard/
│   └── layout.tsx
├── public/
│   ├── chatbot.js
│   └── images/
├── styles/
│   └── globals.css
├── .env.local
├── package.json
├── README.md
└── tailwind.config.js
```
## How It Works
### 1. User Onboarding
Users can register using their email/password or Google OAuth.

Email verification ensures secure signups.

### 2. Organization Setup
Users provide company details (name, website URL, description).

The platform auto-fetches meta descriptions from the website URL.

The backend scrapes the client’s website to train the chatbot.

### 3. Scraping Progress

They can click on any webpage to see the scraped data chunks.

### 4. Chatbot Integration
Users can test the chatbot on their website.

The platform provides instructions for integrating the chatbot.

Users can test the integration and view success/failure UIs.

### 5. Chatbot Testing
A floating button on the client’s website opens the chatbot.

Users can interact with the chatbot in real-time.



Thank you for using Beyonder! 🚀


