import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import Card from '../components/common/Card';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/**
 * The main dashboard page, providing a high-level overview of the inventory.
 */
const Dashboard = () => {
    const { products, invoices, alerts } = useContext(ProductContext);

    // Prepare data for the stock levels bar chart
    const chartData = {
        labels: products.map(p => p.name),
        datasets: [
            {
                label: 'Warehouse Stock',
                data: products.map(p => p.warehouseStock),
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
            },
            {
                label: 'Shelf Stock',
                data: products.map(p => p.shelfStock),
                backgroundColor: 'rgba(255, 99, 132, 0.7)',
            },
        ],
    };

    // Calculate summary statistics for the top cards
    const totalWarehouse = products.reduce((acc, p) => acc + (p.warehouseStock || 0), 0);
    const totalShelf = products.reduce((acc, p) => acc + (p.shelfStock || 0), 0);

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card title="Total Products"><p className="text-4xl font-bold text-blue-600">{products.length}</p></Card>
                <Card title="Items in Warehouse"><p className="text-4xl font-bold text-blue-600">{totalWarehouse}</p></Card>
                <Card title="Items on Shelf"><p className="text-4xl font-bold text-blue-600">{totalShelf}</p></Card>
                <Card title="Pending Invoices"><p className="text-4xl font-bold text-red-500">{invoices.filter(i => i.status === 'Pending').length}</p></Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                    <Card title="Stock Levels">
                        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card title="System Alerts">
                        {alerts.length > 0 ? (
                            <ul className="space-y-3 max-h-96 overflow-y-auto">
                                {alerts.map((alert) => (
                                    <li key={alert.id} className={`p-3 rounded-lg text-sm ${
                                        alert.type === 'warning' ? 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500' :
                                        alert.type === 'danger' ? 'bg-red-100 text-red-800 border-l-4 border-red-500' : 'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
                                    }`}>
                                        {alert.message}
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="text-gray-500">No system alerts at the moment.</p>}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
