import React, { createContext, useState, useEffect } from 'react';

// The base URL for your running json-server API
const API_URL = 'http://localhost:3004';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [alerts, setAlerts] = useState([]);

    // This effect runs once when the component mounts to fetch initial data from the API
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // Fetch both products and invoices concurrently
                const [productsResponse, invoicesResponse] = await Promise.all([
                    fetch(`${API_URL}/products`),
                    fetch(`${API_URL}/invoices`)
                ]);

                const productsData = await productsResponse.json();
                const invoicesData = await invoicesResponse.json();

                setProducts(productsData);
                setInvoices(invoicesData);
            } catch (error) {
                console.error("Failed to fetch initial data:", error);
                // Optionally, set an error state to show a message to the user
            }
        };

        fetchAllData();
    }, []); // The empty dependency array ensures this runs only once on mount

    // This effect recalculates alerts whenever the product list changes
    useEffect(() => {
        if (products.length === 0) return; // Don't run if products haven't loaded yet

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

    /**
     * Saves a product (creates or updates) via an API call.
     */
    const saveProduct = async (productData, userRole) => {
        try {
            if (productData.id) { // --- UPDATE (PATCH) ---
                const response = await fetch(`${API_URL}/products/${productData.id}`, {
                    method: 'PATCH', // Use PATCH to update only changed fields
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productData),
                });
                const updatedProduct = await response.json();
                // Update the product in the local state
                setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
            } else { // --- CREATE (POST) ---
                const newProduct = { ...productData, status: userRole === 'maker' ? 'Pending' : 'Approved', damageType: 'None' };
                const response = await fetch(`${API_URL}/products`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newProduct),
                });
                const addedProduct = await response.json();
                // Add the new product to the local state
                setProducts(prev => [...prev, addedProduct]);
            }
        } catch (error) {
            console.error("Failed to save product:", error);
        }
    };

    /**
     * Approves a product by updating its status via an API call.
     */
    const approveProduct = async (id) => {
        try {
            const response = await fetch(`${API_URL}/products/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'Approved' }),
            });
            const updatedProduct = await response.json();
            // Update the product's status in the local state
            setProducts(products.map(p => (p.id === id ? updatedProduct : p)));
        } catch (error) {
            console.error("Failed to approve product:", error);
        }
    };

    /**
     * Adds a batch of products from a CSV file via multiple API calls.
     */
    const addProductsFromFile = async (newProducts) => {
        try {
            // Create a POST request for each new product and run them all concurrently
            const addedProducts = await Promise.all(newProducts.map(p =>
                fetch(`${API_URL}/products`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(p),
                }).then(res => res.json())
            ));
            // Update the local state with all the newly added products
            setProducts(prev => [...prev, ...addedProducts]);
        } catch (error) {
            console.error("Failed to add products from file:", error);
        }
    };

    const value = { products, invoices, alerts, saveProduct, approveProduct, addProductsFromFile };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};
