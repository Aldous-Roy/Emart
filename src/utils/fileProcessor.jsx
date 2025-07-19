// Note: This utility assumes that the PapaParse library has been loaded globally
// in your main index.html file via a <script> tag.
// Example:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/papaparse/5.3.2/papaparse.min.js"></script>

/**
 * Parses a CSV file containing product data.
 * @param {File} file - The CSV file object from a file input.
 * @param {Function} onComplete - A callback function to execute after parsing is complete. It receives the parsed data as an argument.
 */
export const processCSV = (file, onComplete) => {
    // Check if the PapaParse library is available on the window object
    if (file && window.Papa) {
        window.Papa.parse(file, {
            header: true, // Treat the first row as headers
            skipEmptyLines: true,
            complete: (results) => {
                // Map the parsed rows to the product object structure
                const newProducts = results.data.map(row => ({
                    vendor: row.VendorCode,
                    category: row['Product Category'],
                    name: row['Product Description'],
                    warehouseStock: parseInt(row.Count) || 0,
                    shelfStock: 0, // Default to 0 for new uploads
                    price: parseFloat(row.Cost) || 0,
                    expiryDate: row['Product Expiry Date'],
                    status: 'Pending', // New items are always pending approval
                    damageType: 'None'
                }));
                // Call the callback function with the array of new products
                onComplete(newProducts);
            }
        });
    } else {
        alert("Error: Could not process file. The CSV parsing library (PapaParse) is missing.");
        console.error("PapaParse library not found on window object.");
    }
};
