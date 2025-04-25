# Fetch-and-Display-List-from-an-API
A simple React app that fetches data from a public API and displays it using a reusable, customizable list component. This project follows best practices in React functional programming, reusability, and error handling.

Features

Fetches data from JSONPlaceholder API

Displays user list with names and emails

Reusable ListComponent that accepts any array and custom render logic

Handles loading, empty states, and API errors gracefully

Built with React hooks: useState, useEffect

Semantic HTML for accessibility


Tech Stack

React

JavaScript (ES6+)

Fetch API (built-in)

CSS (optional)


File Structure

src/
│
├── ListComponent.jsx       // Reusable list renderer
├── UserList.jsx            // Fetches data and uses ListComponent
└── App.jsx                 // Renders UserList

How to Run

1. Clone the repo:

git clone https://github.com/your-username/react-api-list-app.git


2. Navigate to the folder:

cd react-api-list-app


3. Install dependencies:

npm install


4. Start the development server:

npm start



Customization

To use a different API, update the fetch call in UserList.jsx.

You can pass any render function to ListComponent:

<ListComponent
  items={data}
  renderItem={(item) => <div>{item.title}</div>}
/>


License

MIT License
