import AppLayout from "@/layouts/app-layout";
import ProductForm from "./AddProductForm";
import { Head } from "@inertiajs/react";

import { PageProps } from "@inertiajs/core";

interface ProductData {
    id?: number;
    name: string;
    unit: string;
    price_per_unit: number;
    is_active: boolean;
}

interface EditProps extends PageProps {
    initialData?: ProductData ;
}

export default function Add({ initialData }: EditProps) {
    


     return (
         <AppLayout>
             <Head title="Add Stock" />
             <div className="flex h-full  justify-center items-center w-full flex-col gap-4 overflow-x-auto rounded-xl p-4">
                 <ProductForm  initialData={initialData} />
             </div>
         </AppLayout>
     );
}