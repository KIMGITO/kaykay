import { Head, Link, router, usePage } from '@inertiajs/react';
import { MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';

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
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDate } from '@/helper/formatDate';
import AppLayout from '@/layouts/app-layout';

interface Customer {
    id: number;
    name: string;
    type: 'Individual' | 'Business';
    phone: string | null;
    location: string | null;
    created_at: string;
    note: string;
}

export default function CustomerIndex({ customers }: { customers: Customer[] }) {
    const handleDelete = (id: number) => {
        router.delete(route('customers.destroy', id));
    };

    const { props } = usePage<{ flash?: { success?: string } }>();
    const [message, setMessage] = useState(props.flash?.success || '');

    useEffect(() => {
        if (message && typeof message === 'string' && message.trim() !== '') {
            toast.success('Success', {
                description: message,
                duration: 3000,
            });
        }
    }, [message]);

    return (
        <AppLayout>
            <Head title="Customers" />
            <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                    <Toaster position="top-center" richColors />
                    <h2 className="text-xl font-semibold">Customers</h2>
                    <Link href={route('customers.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            New Customer
                        </Button>
                    </Link>
                </div>

                <div className="overflow-auto rounded-xl border">
                    <table className="min-w-full text-sm">
                        <thead className="bg-muted text-muted-foreground">
                            <tr>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Phone</th>
                                <th className="px-4 py-2 text-left">Location</th>
                                <th className="px-4 py-2 text-left">Created</th>
                                <th className="px-4 py-2 text-left">Note</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers && customers.map((customer) => (
                                <tr key={customer.id} className="border-t transition hover:bg-accent">
                                    <td className="px-4 py-2 font-medium">{customer.name}</td>

                                    <td className="px-4 py-2">{customer.phone || '-'}</td>
                                    <td className="px-4 py-2">{customer.location || '-'}</td>
                                    <td className="px-4 py-2">{formatDate(customer.created_at)}</td>
                                    <td className="px-4 py-2">{customer.note}</td>
                                    <td>
                                        <Link href={route('customers.edit', customer.id)} className="">
                                            <Button size="sm" variant="ghost" className="p-0 text-yellow-500">
                                                <Pencil className="h-4 w-4 text-yellow-500" />
                                            </Button>
                                        </Link>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button size="sm" variant="ghost" className="p-0 text-red-500">
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle className="text-red-500">Confirm Delete</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you sure you want to delete this customer? This action is irreversible.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleDelete(customer.id)}
                                                        className="bg-red-500 text-white hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </td>
                                </tr>
                            ))}
                            {customers.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="p-4 text-center text-muted-foreground">
                                        No customers found.
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