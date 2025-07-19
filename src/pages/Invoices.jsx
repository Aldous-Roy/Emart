import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { generateInvoicePDF } from '../utils/pdfGenerator';

/**
 * The invoice management page, displaying a list of all invoices
 * and providing an option to download them as PDFs.
 */
const Invoices = () => {
    const { invoices, products } = useContext(ProductContext);

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Invoice Management</h2>
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            {['Invoice ID', 'Vendor', 'Date', 'Amount', 'Status', 'Actions'].map(h => 
                                <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {invoices.map(inv => (
                            <tr key={inv.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap font-medium">{inv.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{inv.vendor}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{inv.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">${(inv.amount || 0).toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${inv.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {inv.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button onClick={() => generateInvoicePDF(inv, products)} className="text-indigo-600 hover:text-indigo-900">Download PDF</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Invoices;
