// In a real application, this data would come from a database or a backend API.
// For now, we are using this mock data to simulate that.
export const initialProducts = [
    { id: 1, name: 'Organic Apples', category: 'Fruits', warehouseStock: 150, shelfStock: 50, price: 2.99, expiryDate: '2025-07-28', vendor: 'FreshFarms', status: 'Approved', damageType: 'None' },
    { id: 2, name: 'Whole Wheat Bread', category: 'Bakery', warehouseStock: 200, shelfStock: 75, price: 4.50, expiryDate: '2025-08-15', vendor: 'BakeryDelights', status: 'Pending' , damageType: 'None'},
    { id: 3, name: 'Cheddar Cheese', category: 'Dairy', warehouseStock: 100, shelfStock: 30, price: 6.75, expiryDate: '2025-09-01', vendor: 'DairyGold', status: 'Approved', damageType: 'None' },
    { id: 4, name: 'Chicken Breast', category: 'Meat', warehouseStock: 45, shelfStock: 20, price: 9.99, expiryDate: '2025-07-21', vendor: 'QualityMeats', status: 'Approved', damageType: 'Transport' },
    { id: 5, name: 'Frozen Peas', category: 'Frozen', warehouseStock: 300, shelfStock: 100, price: 1.99, expiryDate: '2026-01-10', vendor: 'FrostyPicks', status: 'Pending', damageType: 'None' },
    { id: 6, name: 'Almond Milk', category: 'Dairy', warehouseStock: 35, shelfStock: 15, price: 3.50, expiryDate: '2025-07-22', vendor: 'DairyGold', status: 'Approved', damageType: 'None' },
];

export const initialInvoices = [
    { id: 'INV-001', vendor: 'FreshFarms', date: '2025-07-10', amount: 448.50, status: 'Paid' },
    { id: 'INV-002', vendor: 'BakeryDelights', date: '2025-07-11', amount: 900.00, status: 'Pending' },
    { id: 'INV-003', vendor: 'QualityMeats', date: '2025-07-12', amount: 649.35, status: 'Paid' },
    { id: 'INV-004', vendor: 'DairyGold', date: '2025-07-15', amount: 472.50, status: 'Pending' },
];
