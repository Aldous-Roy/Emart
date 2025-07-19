import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

/**
 * The main navigation sidebar for the application.
 * @param {object} props - The component props.
 * @param {object} props.user - The currently logged-in user object.
 * @param {string} props.currentPage - The identifier for the currently active page.
 * @param {Function} props.setCurrentPage - The function to call to change the current page.
 */
const Sidebar = ({ user, currentPage, setCurrentPage }) => {
    const { logout } = useContext(AuthContext);

    const navItems = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'inventory', label: 'Inventory' },
        { id: 'invoices', label: 'Invoices' },
        { id: 'reports', label: 'Reports' },
    ];

    return (
        <aside className="w-64 bg-gray-800 text-white flex flex-col flex-shrink-0">
            {/* Header */}
            <div className="h-20 flex items-center justify-center text-2xl font-bold border-b border-gray-700">
                eMart
            </div>
            
            {/* Navigation Links */}
            <nav className="flex-1 px-4 py-4">
                <ul>
                    {navItems.map(item => (
                         <li 
                            key={item.id}
                            className={`mb-2 rounded-lg transition-colors duration-200 ${currentPage === item.id ? 'bg-gray-900' : 'hover:bg-gray-700'}`}
                         >
                            <a href="#" onClick={() => setCurrentPage(item.id)} className="block p-3">{item.label}</a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer with user info and logout */}
            <div className="p-4 border-t border-gray-700">
                <p className="text-sm">Logged in as: <span className="font-bold capitalize">{user.role}</span></p>
                <button 
                    onClick={logout} 
                    className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
