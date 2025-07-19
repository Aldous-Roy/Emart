import React from 'react';

/**
 * A reusable card component for displaying content in a styled container.
 * @param {object} props - The component props.
 * @param {string} props.title - The title to be displayed at the top of the card.
 * @param {React.ReactNode} props.children - The content to be displayed inside the card body.
 * @param {string} [props.className] - Additional CSS classes to apply to the card container.
 */
const Card = ({ title, children, className }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
        <div>
            {children}
        </div>
    </div>
);

export default Card;
