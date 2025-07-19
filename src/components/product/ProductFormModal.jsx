import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { AuthContext } from '../../context/AuthContext';
import Modal from '../common/Modal';
import Button from '../common/Button';

/**
 * A modal form for adding a new product or editing an existing one.
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Whether the modal is currently visible.
 * @param {Function} props.onClose - The function to call to close the modal.
 * @param {object | null} props.product - The product object to edit, or null if adding a new product.
 */
const ProductFormModal = ({ isOpen, onClose, product }) => {
    const { saveProduct } = useContext(ProductContext);
    const { user } = useContext(AuthContext);

    // This state holds all the data for the form fields
    const [formData, setFormData] = useState({});

    // This effect runs when the modal is opened or when the product to edit changes.
    // It populates the form with the product's data or with default values for a new product.
    useEffect(() => {
        const defaultData = {
            id: null, name: '', category: '', warehouseStock: 0, shelfStock: 0, price: 0, expiryDate: '', vendor: '', damageType: 'None'
        };
        setFormData(product || defaultData);
    }, [product, isOpen]);

    // A generic handler to update the form state as the user types.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handles the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        saveProduct(formData, user.role); // Call the context function to save the data
        onClose(); // Close the modal after saving
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={product ? "Edit Product" : "Add New Product"}>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input type="text" name="category" value={formData.category || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Vendor</label>
                        <input type="text" name="vendor" value={formData.vendor || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Warehouse Stock</label>
                        <input type="number" name="warehouseStock" value={formData.warehouseStock || 0} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Shelf Stock</label>
                        <input type="number" name="shelfStock" value={formData.shelfStock || 0} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input type="number" name="price" value={formData.price || 0} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" step="0.01" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                        <input type="date" name="expiryDate" value={formData.expiryDate || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
                    </div>
                    <div className="md:col-span-2">
                         <label className="block text-sm font-medium text-gray-700">Damage Type</label>
                         <select name="damageType" value={formData.damageType || 'None'} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white">
                            <option>None</option>
                            <option>During Transport</option>
                            <option>During Shopping</option>
                            <option>By Expiry</option>
                         </select>
                    </div>
                </div>
                <div className="mt-8 flex justify-end gap-3">
                    <Button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800">Cancel</Button>
                    <Button type="submit">Save Product</Button>
                </div>
            </form>
        </Modal>
    );
};

export default ProductFormModal;
