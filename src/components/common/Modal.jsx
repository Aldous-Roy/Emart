import React from 'react';

/**
 * A reusable modal component that displays content in a centered overlay.
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Whether the modal is currently visible.
 * @param {Function} props.onClose - The function to call when the modal should be closed.
 * @param {string} props.title - The title to display at the top of the modal.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal body.
 */
const Modal = ({ isOpen, onClose, title, children }) => {
    // If the modal isn't open, don't render anything
    if (!isOpen) return null;

    return (
        // The semi-transparent background overlay
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            {/* The modal container */}
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl font-light">&times;</button>
                </div>
                {/* Modal Body */}
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
