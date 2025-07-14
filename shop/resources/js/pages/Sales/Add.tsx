import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';import SaleForm from './AddSalesForm';
import AddSalesForm from './AddSale';

// interface Product {
//     id: number;
//     name: string;
//     price_per_unit: number;
//     unit: string;
// }


// interface Stock{
//     stock_id: number
//     quantity_received: string,
//     quantity_available: string,
//     receipt: string,
//     date: string,
//     source: string,
//     product: Product,
// }

// interface Customer {
//     id: number;
//     name: string;
    
// }

// interface Props {
//     products: Product[];
//     stocks: Stock[],
//     customers: Customer[];
// }

interface Product {
    id: string;
    name: string;
    unit: string;
    price_per_unit: string;
}

interface Stock {
    id: string;
    receipt: string;
    quantity_received: string;
    quantity_available: number;
    product: Product;
}

interface Customer {
    name: string;
    id: string;
}

interface SaleProps {
    stocks: Stock[];
    customers: Customer[];
}

const breadcrumb = [
    {
        title: 'Sales',
        href: '/sale',
    },
    {
        title: 'Add new sale',
        href: '/sale/create',
    }
];

export default function AddSale({ customers, stocks }: SaleProps) {
    
    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Record New Sale" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <AddSalesForm stocks={stocks} customers={customers} />
            </div>
        </AppLayout>
    );
}
