📋 User Management Application
A modern, responsive web application for managing user data with full CRUD (Create, Read, Update, Delete) operations, built with React.js and Vite.

https://img.shields.io/badge/React-18.2.0-blue
https://img.shields.io/badge/Vite-4.4.5-purple
https://img.shields.io/badge/API-JSONPlaceholder-green

✨ Features
🔧 Core Functionality
View Users: Display all users in a clean, responsive table

Add Users: Create new users with form validation

Edit Users: Modify existing user information

Delete Users: Remove users with confirmation dialog

🎯 Advanced Features
Pagination: Browse users with 10, 25, 50, or 100 items per page

Search: Real-time search across all user fields

Sorting: Click column headers to sort ascending/descending

Filtering: Advanced filtering by individual fields

Responsive Design: Works seamlessly on desktop and mobile devices

🛡️ Quality & UX
Form Validation: Client-side validation with error messages

Error Handling: Comprehensive API error management

Loading States: Visual feedback during operations

Local Storage: Data persistence between sessions

Confirmations: Safe delete operations with confirmation dialogs

🚀 Quick Start
Prerequisites
Node.js (version 14 or higher)

npm or yarn

Installation
Clone the repository

bash
git clone <repository-url>
cd user-management-app
Install dependencies

bash
npm install
Start the development server

bash
npm run dev
Open your browser
Navigate to http://localhost:3000

Build for Production
bash
npm run build
npm run preview
📁 Project Structure
text
src/
├── components/          # React components
│   ├── UserList.jsx    # Main user table with sorting
│   ├── UserForm.jsx    # Add/Edit user form
│   ├── FilterPopup.jsx # Advanced filtering interface
│   ├── Pagination.jsx  # Pagination controls
│   └── LoadingSpinner.jsx # Loading indicator
├── hooks/
│   └── useUsers.js     # Custom hook for user management
├── services/
│   └── api.js          # API communication layer
├── utils/
│   └── validation.js   # Form validation utilities
├── App.jsx             # Main application component
└── main.jsx            # Application entry point
🎮 How to Use
Adding a User
Click the "Add User" button

Fill in the required fields (First Name, Last Name, Email)

Optionally add department information

Click "Add User" to save

Editing a User
Click the "Edit" button next to any user

Modify the information in the form

Click "Update User" to save changes

Deleting a User
Click the "Delete" button next to any user

Confirm the action in the dialog

User will be permanently removed

Searching and Filtering
Use the search bar for quick text search across all fields

Click "Filters" for advanced filtering by specific fields

Use column headers to sort data

Pagination
Use the dropdown to select items per page (10, 25, 50, 100)

Navigate through pages using the pagination controls

🔧 Technical Details
API Integration
The application uses JSONPlaceholder as a mock backend:

Base URL: https://jsonplaceholder.typicode.com

Endpoints:

GET /users - Fetch all users

POST /users - Create new user

PUT /users/:id - Update user

DELETE /users/:id - Delete user

Data Persistence
Uses localStorage to persist user data between sessions

Automatically saves changes locally

Survives browser refreshes and restarts

State Management
React Hooks for local state management

Custom Hook (useUsers) centralizes all user-related logic

Unidirectional data flow for predictable state updates

Form Validation
Required field validation for name and email

Email format validation

Real-time feedback with error messages

Prevents invalid submissions

🎨 Customization
Adding New Fields
To add new user fields:

Update the form in UserForm.jsx:

jsx
<input
  type="text"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  placeholder="Phone number"
/>
Update validation in utils/validation.js:

javascript
if (!userData.phone.trim()) {
  errors.phone = 'Phone number is required';
}
Update the table in UserList.jsx:

jsx
<th onClick={() => handleSort('phone')}>
  Phone <SortIcon columnKey="phone" />
</th>
Styling Modifications
The application uses CSS modules with a modern design:

Primary color: Purple gradient (#667eea to #764ba2)

Responsive breakpoints for mobile/tablet

Hover effects and smooth transitions

Modify App.css to customize the appearance.

🐛 Troubleshooting
Common Issues
1. Data not persisting

Check if localStorage is enabled in browser

Verify no browser extensions are blocking storage

2. API errors

Check internet connection

Verify JSONPlaceholder API status

Check browser console for detailed errors

3. Form validation issues

Ensure all required fields are filled

Check email format is valid

Browser Support
Chrome (recommended)

Firefox

Safari

Edge

🤝 Contributing
Fork the repository

Create a feature branch: git checkout -b feature/amazing-feature

Commit changes: git commit -m 'Add amazing feature'

Push to branch: git push origin feature/amazing-feature

Open a pull request



🙏 Acknowledgments
JSONPlaceholder for providing free mock API

React Team for the amazing framework

Vite for fast development build tools
