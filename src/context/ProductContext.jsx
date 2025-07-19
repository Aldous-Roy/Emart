import React, { createContext, useState, useEffect } from 'react';
// Correct the import path to be more explicit for Vite
import { initialProducts, initialInvoices } from '../api/mockData.js';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(initialProducts);
    const [invoices, setInvoices] = useState(initialInvoices);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const newAlerts = [];
        const today = new Date();
        const lowStockThreshold = 50;

        products.forEach(p => {
            const expiry = new Date(p.expiryDate);
            const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
            if (diffDays <= 3 && diffDays > 0) {
                newAlerts.push({ id: `exp-${p.id}`, type: 'warning', message: `${p.name} is expiring in ${diffDays} days.` });
            } else if (diffDays <= 0) {
                newAlerts.push({ id: `exp-${p.id}`, type: 'danger', message: `${p.name} has expired.` });
            }

            if ((p.warehouseStock + p.shelfStock) < lowStockThreshold) {
                newAlerts.push({ id: `low-${p.id}`, type: 'info', message: `${p.name} stock is low (${p.warehouseStock + p.shelfStock} remaining).` });
            }
        });
        setAlerts(newAlerts);
    }, [products]);

    const saveProduct = (productData, userRole) => {
        if (productData.id) {
            setProducts(products.map(p => p.id === productData.id ? { ...p, ...productData } : p));
        } else {
            const newProduct = {
                ...productData,
                id: products.length + 1,
                status: userRole === 'maker' ? 'Pending' : 'Approved',
                damageType: 'None'
            };
            setProducts(prev => [...prev, newProduct]);
        }
    };

    const approveProduct = (id) => {
        setProducts(products.map(p => (p.id === id ? { ...p, status: 'Approved' } : p)));
    };

    const addProductsFromFile = (newProducts) => {
        const productsWithIds = newProducts.map((p, index) => ({
            ...p,
            id: products.length + index + 1,
        }));
        setProducts(prev => [...prev, ...productsWithIds]);
    };

    const value = { products, invoices, alerts, saveProduct, approveProduct, addProductsFromFile };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};
