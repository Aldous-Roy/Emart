import React, { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext.jsx';

// Import Layout Components
import Sidebar from './components/layout/Sidebar.jsx';

// Import Page Components
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Inventory from './pages/Inventory.jsx';
import Invoices from './pages/Invoices.jsx';
import Reports from './pages/Reports.jsx';

/**
 * This component handles the core routing logic.
 * - It shows the Login page if the user is not authenticated.
 * - It shows the main application layout with the correct page if the user is logged in.
 */
const AppRouter = () => {
    const { isLoggedIn, user } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState('dashboard');

    // If the user is not logged in, only render the Login component
    if (!isLoggedIn) {
        return <Login />;
    }

    // A helper function to determine which page component to render
    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard': return <Dashboard />;
            case 'inventory': return <Inventory />;
            case 'invoices': return <Invoices />;
            case 'reports': return <Reports />;
            default: return <Dashboard />;
        }
    };

    // If the user is logged in, render the full application layout
    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <Sidebar 
                user={user} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
            />
            <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                {renderPage()}
            </main>
        </div>
    );
};

export default AppRouter;
