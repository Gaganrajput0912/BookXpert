# Employee Management Dashboard

## Project Overview

A modern, responsive, and interactive Employee Management Dashboard designed to streamline HR operations. This application allows users to view, add, edit, and delete employee records with a focus on usability and professional aesthetics.

**Key Features:**

- **Interactive Dashboard:** Real-time statistics with animated counters.
- **Employee Directory:** Searchable and filterable table with paginated views.
- **Professional Profiles:** Generate and download individual PDF profiles for any employee.
- **Modern UI:** Glassmorphism effects, smooth transitions, and a responsive layout.
- **Data Persistence:** All modifications are saved locally, ensuring data remains available across sessions.

## Tech Stack

- **Frontend Framework:** React 19 (Vite)
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS v4
- **Routing:** React Router DOM v7
- **Icons:** Lucide React
- **Data Visualization:** Recharts
- **PDF Generation:** jsPDF & jsPDF-AutoTable
- **Utilities:** date-fns, clsx, tailwind-merge, react-hot-toast, react-countup

## Steps to Run Locally

1.  **Clone the Repository** (if applicable) or navigate to the project directory.

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Start the Development Server**

    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    The application will typically run at `http://localhost:5173`.

5.  **Build for Production**
    ```bash
    npm run build
    ```

## Design Decisions & Assumptions

- **Single-Page Experience:** The layout is designed to eliminate main window scrolling. The sidebar and content areas scroll independently to mimic a native desktop application feel.
- **Local Persistence:** For demonstration purposes, data is persisted using `localStorage` via Redux. In a real-world scenario, this would be replaced with API calls to a backend database.
- **Authentication:** The login system is a simulation. Any email/password combination will work, collecting the user's name from the email address. This allows for immediate testing without backend dependencies.
- **Tailwind v4:** Utilized the latest Tailwind CSS version for improved performance and a simplified configuration usage.
- **Component Modularity:** UI elements like Buttons, Inputs, and Charts are built as reusable components to ensure consistency and ease of maintenance.
