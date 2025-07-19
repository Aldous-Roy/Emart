import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import AppRouter from './AppRouter';

/**
 * This is the root component of the application.
 * Its primary role is to wrap the entire application with the necessary
 * context providers (`AuthProvider` and `ProductProvider`). This makes the
 * global state for authentication and product data available to all child components
 * without needing to pass props down manually.
 */
 function App() {
    return (
        <AuthProvider>
            <ProductProvider>
                <AppRouter />
            </ProductProvider>
        </AuthProvider>
    );
}
export default App;
