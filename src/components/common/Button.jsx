import React from 'react';

/**
 * A reusable button component with default styling.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {Function} props.onClick - The function to call when the button is clicked.
 * @param {string} [props.className='bg-blue-600 hover:bg-blue-700'] - Additional or overriding CSS classes.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - The type of the button.
 */
const Button = ({ children, onClick, className = 'bg-blue-600 hover:bg-blue-700', type = 'button' }) => (
    <button 
        type={type} 
        onClick={onClick} 
        className={`text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out ${className}`}
    >
        {children}
    </button>
);

export default Button;
