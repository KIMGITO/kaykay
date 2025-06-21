import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';import SaleForm from './AddSalesForm';

interface Product {
    id: number;
    name: string;
    price_per_unit: number;
    unit: string;
}

interface Customer {
    id: number;
    name: string;
    
}

interface Props {
    products: Product[];
    customers: Customer[];
}

export default function AddSale({ products, customers }: Props) {
    return (
        <AppLayout>
            <Head title="Record New Sale" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <SaleForm products={products} customers={customers} />
            </div>
        </AppLayout>
    );
}
