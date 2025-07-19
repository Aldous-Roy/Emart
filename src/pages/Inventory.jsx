import React, { useState, useContext, useRef } from 'react';
import { ProductContext } from '../context/ProductContext';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/common/Button';
import ProductFormModal from '../components/product/ProductFormModal';
import { processCSV } from '../utils/fileProcessor';

/**
 * The inventory management page, displaying a table of all products
 * and providing functionality to add, edit, and approve them.
 */
const Inventory = () => {
    const { products, approveProduct, addProductsFromFile } = useContext(ProductContext);
    const { user } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const fileInputRef = useRef(null);

    const openModalForEdit = (product) => {
        setProductToEdit(product);
        setIsModalOpen(true);
    };

    const openModalForNew = () => {
        setProductToEdit(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setProductToEdit(null);
    };

    const handleFileUpload = (event) => {
        processCSV(event.target.files[0], (newProducts) => {
            addProductsFromFile(newProducts);
            alert(`${newProducts.length} products uploaded successfully! They are pending approval.`);
        });
    };

    const generateBarcode = (product) => {
        const barcodeValue = `EMART-${product.id}-${product.name.replace(/\s/g, '')}`;
        alert(`Generated Barcode for ${product.name}:\n${barcodeValue}\n\nThis would be printed on a sticker.`);
    };

    return (
        <div>
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <h2 className="text-3xl font-bold text-gray-800">Inventory Management</h2>
                <div className="flex gap-2">
                    <Button onClick={openModalForNew}>Add Product</Button>
                    <Button onClick={() => fileInputRef.current.click()} className="bg-green-600 hover:bg-green-700">Upload CSV</Button>
                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} accept=".csv" />
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            {['Product', 'Category', 'W/H Stock', 'Shelf Stock', 'Price', 'Expiry', 'Vendor', 'Status', 'Actions'].map(h => 
                                <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap font-medium">{p.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{p.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{p.warehouseStock}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{p.shelfStock}</td>
                                {/* <td className="px-6 py-4 whitespace-nowrap">${(p.price || 0).toFixed(2)}</td> */}
                                <td className="px-6 py-4 whitespace-nowrap">{p.expiryDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{p.vendor}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${p.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {p.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {user.role === 'checker' && p.status === 'Pending' && (
                                        <button onClick={() => approveProduct(p.id)} className="text-green-600 hover:text-green-900 mr-3" title="Approve">Approve</button>
                                    )}
                                    <button onClick={() => openModalForEdit(p)} className="text-indigo-600 hover:text-indigo-900 mr-3" title="Edit">Edit</button>
                                    <button onClick={() => generateBarcode(p)} className="text-gray-600 hover:text-gray-900" title="Generate Barcode">Barcode</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ProductFormModal isOpen={isModalOpen} onClose={closeModal} product={productToEdit} />
        </div>
    );
};

export default Inventory;
