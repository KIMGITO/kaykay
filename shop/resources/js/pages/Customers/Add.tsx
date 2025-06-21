import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import CustomerForm from './AddCustomerForm';

interface Props {
    // Add any initial props you might need, like initial customer data for editing
    initialData?: {
        id?: number;
        name: string;
        phone?: string;
        location?: string;
        note?: string;

    };
}

export default function AddCustomer({ initialData }: Props) {
    return (
        <AppLayout>
            <Head title={initialData?.id ? 'Edit Customer' : 'Add New Customer'} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* <CustomerForm initialData={initialData} /> */}
                <CustomerForm initialData={initialData} />
            </div>
        </AppLayout>
    );
}
