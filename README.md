# Grocery List App
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fc540ec9-71f6-4226-8304-425b0807d8e6" />

A simple, user-friendly web application for creating and managing grocery lists. Built with React and Vite, this app allows users to add, edit, delete, and check off items on their shopping lists, making grocery shopping more organized and efficient.

The Knapsack Algorithm is an optimization technique used to select the most valuable combination of items without exceeding a specified limit which is cost.
In simple terms, it helps determine “the best items to include when you can’t take everything.”

In this project, the algorithm is used to generate an optimized grocery list based on the user’s available budget and each item’s priority and price.

## Features
 - Add Items: Easily add new grocery items to your list with categories (e.g., fruits, dairy).
 - Edit and Delete: Modify item names, quantities, or remove items as needed.
 - Check Off Items: Mark items as purchased to track progress.
 - Persistent Storage: (Optional: If implemented) Save lists locally using browser storage or a backend.
 - Responsive Design: Works seamlessly on desktop and mobile devices.
 - Fast Performance: Powered by Vite for quick development and builds.

## Screenshots
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/86445f57-0e11-4667-99a2-c01d0d9dccd7" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/02aeb786-2228-48fb-83a0-825cf78591f7" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b78e3022-e75f-4758-97eb-d000f0268eff" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/76d834cd-b5b4-4438-870e-00a2aaf05cef" />

## Installation

Follow these steps to set up the project locally:

1. Clone the Repository
```bash
  git clone https://github.com/apitongcm/grocery-list-app.git
  cd grocery-list-app
```
2. Install Dependencies
Ensure you have Node.js (version 16 or higher) installed, then run:
```bash
  npm install
```

3. Start the Development Server
```bash
  npm run dev
```

The app will be available at http://localhost:5173
 (default Vite port).

4. Build for Production (optional)
```bash
  npm run build
```

This creates an optimized build in the dist/ folder.

## Usage
  1. Open the application in your preferred browser.
  2. Search for an item by entering its name, brand, or a related keyword.
  3. Input desired budget for this grocery list
  4. A modal window will appear to validate whether the entered item is valid or already exists in the database.
  5. Click “Add Item” to create a new grocery entry.
  6. The first item added will automatically receive the highest priority ranking.
  7. Drag and drop items to reorder and adjust their priority.
  8. Delete items using the available action buttons.
  9. Click “Generate” to execute the "Knapsack Algorithm" and produce an optimized grocery list based on your input.
  10. Use the checkboxes to mark items as completed once purchased or fulfilled.
  11. Click "Download" button to download the optimized list in csv file format. 
     
## Technologies Used
  - Frontend: React (with Hooks for state management)
  - Build Tool: Vite (for fast development and HMR - Hot Module Replacement)
  - Plugins:
        -- @vitejs/plugin-react (for React Fast Refresh)
        -- ESLint (for code linting)
  - Styling: ( Framer motion, CSS Modules, Tailwind CSS)
  - Other: JavaScript (ES6+), HTML5
