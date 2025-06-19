 // <- this is the form from earlier
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import StockForm from './AddStockForm';

interface Product  {
    id: number;
    name: string;
};

interface Props  {
    products: Product[];
};

export default function Add({ products }: Props) {
    return (
        <AppLayout>
            <Head title="Add Stock" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="flex h-full items-center justify-center px-4 py-2 text-gray-500">
                            <StockForm products={products} />
                        </div>
                    </div>
                </div>

                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="flex h-full items-center justify-center text-gray-500">Additional Stock Details Here</div>
                </div>
            </div>
        </AppLayout>
    );
}
