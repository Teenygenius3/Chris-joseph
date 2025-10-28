# Book Inventory Frontend

This is the frontend part of the Book Inventory application, built using React.js. The application allows users to manage a collection of books, including adding, listing, editing, and deleting books.

## Project Structure

- **public/index.html**: The main HTML file that serves as the entry point for the React application.
- **src/index.js**: The entry point for the React application, rendering the App component into the DOM.
- **src/App.js**: The main App component that sets up routing and includes other components.
- **src/components**: Contains reusable components for managing books.
  - **BookList.jsx**: Displays all books in a table format, fetching data from the backend API.
  - **BookForm.jsx**: Provides a form for adding new books, handling form submission to the backend API.
  - **BookEdit.jsx**: Displays a modal for editing existing book details.
  - **BookDelete.jsx**: Shows a confirmation popup before deleting a book.
- **src/pages**: Contains page components for routing.
  - **Home.jsx**: Serves as the home page of the application.
  - **ManageBooks.jsx**: Manages the book-related components for CRUD operations.
- **src/services/api.js**: Contains Axios configuration and functions for making API calls to the backend.
- **src/hooks/useFetch.js**: Custom hook for handling data fetching logic.
- **src/styles/App.css**: Custom CSS styles for the application.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd book-inventory-fullstack/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Features

- Add new books to the inventory.
- List all books with details.
- Edit existing book information.
- Delete books from the inventory.

## Technologies Used

- React.js
- Axios for API calls
- CSS for styling

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.