export type Employee = {
    id: string;
    name: string;
    role: string;
    shift: 'morning' | 'afternoon' | 'evening';
    hoursWorked: number;
};

export type Debtor = {
    id: string;
    name: string;
    amount: number;
    since: string;
    lastPayment: string;
    phone: string;
};

export type Order = {
    id: string;
    customer: string;
    items: { name: string; quantity: number; price: number }[];
    total: number;
    time: string;
    status: 'completed' | 'preparing' | 'pending';
    paymentMethod: 'cash' | 'mpesa' | 'credit';
};

export type InventoryItem = {
    id: string;
    item: string;
    stock: number;
    status: 'good' | 'warning' | 'critical';
    unit: string;
    lastRestock: string;
    supplier: string;
};

export type QuickAction = {
    icon: React.ReactNode;
    label: React.ReactNode;
    action: () => void;
    color: string;
};