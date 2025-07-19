import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import Card from '../components/common/Card';

/**
 * The reports page, which shows categorized reports such as
 * lists of damaged and expired products.
 */
const Reports = () => {
    const { products } = useContext(ProductContext);

    // Filter products to find damaged ones
    const damagedProducts = products.filter(p => p.damageType && p.damageType !== 'None');
    // Filter products to find expired ones
    const expiredProducts = products.filter(p => new Date(p.expiryDate) < new Date());

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Damaged Goods Report">
                    {damagedProducts.length > 0 ? (
                         <ul className="space-y-2">
                            {damagedProducts.map(p => <li key={p.id}>{p.name} - <span className="font-semibold">{p.damageType}</span></li>)}
                        </ul>
                    ) : <p className="text-gray-500">No damaged products recorded.</p>}
                </Card>
                <Card title="Expired Products Report">
                    {expiredProducts.length > 0 ? (
                         <ul className="space-y-2">
                            {expiredProducts.map(p => <li key={p.id}>{p.name} (Expired on: {p.expiryDate})</li>)}
                        </ul>
                    ) : <p className="text-gray-500">No expired products found.</p>}
                </Card>
            </div>
        </div>
    );
};

export default Reports;
