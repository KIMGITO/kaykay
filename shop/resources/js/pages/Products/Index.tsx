import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Plus, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';

type Product = {
    id: number;
    name: string;
    unit: string;
    price_per_unit: number;
    is_active: boolean;
};

export default function Index({ products }: { products: Product[] }) {
    const handleToggle = (id: number) => {
        router.patch(route('product.toggle', id));
    };

    const handleDelete = (id: number) => {
        // router.delete(route('products.destroy', id));
    };

    const { props } = usePage<{ flash?: { success?: string; undo_id: string } }>();

    const undoid = props.flash?.undo_id;
    const [message, setMessage] = useState(props.flash?.success || '');

   useEffect(() => {

       if (message && typeof message === 'string' && message.trim() !== '') {

           toast.success('Success', {
               description: message,
               ...(undoid != null && {
                   // Conditional spread
                   icon: <Trash2 className="animate-bounce" size={30} />,
                   action: {
                       label: 'Undo',
                       onClick: () => {
                           router.patch(route('product.undo', undoid));
                       },
                   },
               }),
               duration: 3000,
           });
       }
   }, [message, undoid]); 
    return (
        <AppLayout>
            <Head title="Product List" />
            <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                    <Toaster position="top-center" richColors closeButton></Toaster>

                    <h2 className="text-xl font-semibold">Products</h2>

                    <Link href={'/product/create'}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Product
                        </Button>
                    </Link>
                </div>

                <div className="overflow-auto rounded-xl border">
                    <table className="min-w-full text-sm">
                        <thead className="bg-muted text-muted-foreground">
                            <tr>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Unit</th>
                                <th className="px-4 py-2 text-left">Price</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Set Status</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.map((product) => (
                                <tr key={product.id} className="border-t align-middle transition hover:bg-accent">
                                    <td className="px-4 py-2">{product.name}</td>
                                    <td className="px-4 py-2">{product.unit}</td>
                                    <td className="px-4 py-2">Ksh {product.price_per_unit}</td>
                                    <td className="px-4 py-2">
                                        <Badge variant={product.is_active ? 'default' : 'secondary'}>
                                            {product.is_active ? 'Available' : 'Not Available'}
                                        </Badge>
                                    </td>
                                    <td className="">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="p-0"
                                            onClick={() => {
                                                handleToggle(product.id);
                                            }}
                                        >
                                            {product.is_active ? (
                                                <ToggleRight className="h-7 text-green-500" />
                                            ) : (
                                                // <Switch checked />
                                                <ToggleLeft className="h-7" />
                                                // <Switch />
                                            )}
                                        </Button>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex gap-2">
                                            <Link href={`${route('product.edit', product.id)}`}>
                                                <Button size="sm" className="border-yellow-300 p-0 hover:border" variant="ghost">
                                                    <Pencil className="h-4 w-4 text-yellow-400" />
                                                </Button>
                                            </Link>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button size="sm" className="border-red-500 p-0 hover:border" variant="ghost">
                                                        <Trash2 className="h-4 w-4 text-red-600" />
                                                    </Button>
                                                </AlertDialogTrigger>

                                                <AlertDialogContent className="">
                                                    <AlertDialogHeader className="text-red-500">
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription className="text-red-500">
                                                            This action will permanently delete the product. You cannot undo this.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel className="bg-blue-500 text-blue-600 hover:bg-blue-600">
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(product.id)}
                                                            className="bg-red-400 text-white hover:bg-red-700"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td className="p-4 text-center text-muted-foreground" colSpan={5}>
                                        No products available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
