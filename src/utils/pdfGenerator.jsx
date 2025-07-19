// Note: This utility assumes that the jsPDF and jsPDF-AutoTable libraries have been loaded
// globally in your main index.html file via <script> tags. This is to avoid potential
// build issues with ES module imports for these specific libraries.
// Example:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.23/jspdf.plugin.autotable.min.js"></script>

/**
 * Generates and downloads a PDF invoice.
 * @param {object} invoice - The invoice object containing details like ID, vendor, date, and amount.
 * @param {Array<object>} products - The full list of products, used to find items associated with the invoice's vendor.
 */
export const generateInvoicePDF = (invoice, products) => {
    // Check if the jsPDF library is available on the window object
    if (!window.jspdf || !window.jspdf.jsPDF) {
        alert("Error: Could not generate PDF. The PDF library (jsPDF) is missing.");
        console.error("jsPDF library not found on window object.");
        return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // --- PDF Header ---
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('eMart Grocery', 14, 22);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('Invoice', 14, 30);

    // --- Invoice Details ---
    doc.setFontSize(11);
    doc.text(`Invoice ID: ${invoice.id}`, 14, 45);
    doc.text(`Vendor: ${invoice.vendor}`, 14, 51);
    doc.text(`Date: ${invoice.date}`, 14, 57);
    doc.text(`Status: ${invoice.status}`, 14, 63);

    // --- Table of Products ---
    const tableColumn = ["Product", "Quantity", "Unit Price", "Total"];
    const tableRows = [];
    
    // In a real app, you'd have specific line items. Here, we mock it by finding products from the same vendor.
    const invoiceProducts = products.filter(p => p.vendor === invoice.vendor).slice(0, 5);
    invoiceProducts.forEach(prod => {
        const productData = [
            prod.name,
            prod.warehouseStock,
            `$${prod.price.toFixed(2)}`,
            `$${(prod.warehouseStock * prod.price).toFixed(2)}`
        ];
        tableRows.push(productData);
    });

    // Check if the jsPDF-AutoTable plugin is available
    if (typeof doc.autoTable === 'function') {
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 75,
            theme: 'striped',
            headStyles: { fillColor: [34, 49, 63] }
        });
        const finalY = doc.lastAutoTable.finalY;
        
        // --- Total Amount ---
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(`Total Amount: $${invoice.amount.toFixed(2)}`, 14, finalY + 15);
    } else {
        alert("Error: Could not generate PDF table. The PDF-table library is missing.");
        console.error("jsPDF-AutoTable plugin not found on jsPDF instance.");
    }
    
    // --- Save the PDF ---
    doc.save(`Invoice-${invoice.id}.pdf`);
};
