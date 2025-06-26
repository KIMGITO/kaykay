import ClearPaymnet from '@/components/clearPayment';
import CreateButton from '@/components/createButton';
import { Button } from '@/components/ui/button';
import dateToday from '@/helper/dateToday';
import { formatCurrency } from '@/helper/formatCurrency';
import { formatDate } from '@/helper/formatDate';
import formatNumber from '@/helper/formatNumber';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Receipt } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';

interface Customer {
    name: string;
    phone: string;
    location: string;
}

interface Product {
    product_id: number;
    name: string;
    unit: string;
}
interface Sale {
    id: number;
    quantity: number;
    price: number;
    date: string;
    product: Product;
    customer: Customer;
}

interface Credit {
    id: number;
    created_at: string;
    balance: number;
    amount_paid: string;
    due_date: string;
    is_paid: boolean;
    sale: Sale;
    
}

interface CreditProps {
    credits: Credit[];
}

export default function Index({ credits }: CreditProps) {
    
    const { props } = usePage<{ flash?: { success?: string; undo_id?: string } }>();

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
            <Head title="Credit Sales" />
            <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                    <Toaster position="top-center" richColors closeButton></Toaster>

                    <h2 className="text-xl font-semibold">Credit Sales</h2>
                    <CreateButton toRoute="sale.create" action="New Sale" />
                </div>

                <div className="overflow-auto rounded-xl border">
                    <table className="min-w-full text-sm">
                        <thead className="bg-muted text-muted-foreground">
                            <th className="px-4 py-2 text-left">#</th>
                            <th className="px-4 py-2 text-left">Customer</th>
                            <th className="px-4 py-2 text-left">Product</th>
                            <th className="px-4 py-2 text-left">Sale Date</th>

                            <th className="px-4 py-2 text-left">Amount</th>
                            <th className="px-4 py-2 text-left">Paid</th>

                            <th className="px-4 py-2 text-left">Balance</th>
                            <th className="px-4 py-2 text-left">Due Date</th>
                            <th className="px-4 py-2 text-end">Actions</th>
                        </thead>
                        <tbody>
                            {credits ?
                                credits.map((credit, index) => (
                                    <tr key={index} >
                                        <td className="px-4 py-2 text-left">{index + 1}</td>
                                        <td className="px-4 py-2 text-left">{credit.sale?.customer?.name || 'Walk-in'}</td>
                                        <td className="px-4 py-2 text-left">{`${credit.sale?.product?.name.toUpperCase()} 
                                        (${formatNumber(credit.sale?.quantity)} ${
                                            credit.sale?.product?.unit.toLowerCase() !== 'unit' ? credit.sale?.product?.unit : ''
                                        })`}</td>
                                        <td className="px-4 py-2 text-left">{formatDate(credit.sale?.date)}</td>
                                        <td className="px-4 py-2 text-left text-yellow-500">{formatCurrency(credit.sale?.price)}</td>
                                        <td className="px-4 py-2 text-left text-green-500">{formatCurrency(parseFloat(credit.amount_paid))}</td>
                                        <td className="px-4 py-2 text-left text-red-500">{formatCurrency(credit.balance)}</td>

                                        <td className="px-4 py-2 text-center">
                                            {credit.due_date == null ? (
                                                <div> - - </div>
                                            ) : formatDate(credit.due_date) <= dateToday() ? (
                                                <span
                                                    className={`inline-flex items-center rounded bg-red-300 px-2.5 py-0.5 text-xs font-medium text-red-700`}
                                                >
                                                    Over Due
                                                </span>
                                            ) : (
                                                <span
                                                    className={`inline-flex items-center rounded bg-green-200 px-2.5 py-0.5 text-xs font-medium text-green-900`}
                                                >
                                                    {formatDate(credit.due_date)}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            <div className="flex h-full items-center gap-3">
                                               

                                                <ClearPaymnet
                                                    credit={{
                                                        id: credit.id,
                                                        is_paid: credit.is_paid,
                                                        balance: credit.balance,
                                                        sale: {
                                                            id: credit.sale?.id,
                                                            price: credit.sale?.price,
                                                        },
                                                    }}
                                                ></ClearPaymnet>

 
                                                <Link href={route('credits.show', credit.id)}>
                                                    <Button variant={'ghost'} className="border-2 md:border-0">
                                                        <Receipt className="text-blue-500" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )) : 
                                <tr>
                                    <td colSpan={9} className="text-center py-4">
                                        <div className="text-muted-foreground">No credit sales found.</div>
                                    </td>
                                </tr>
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
