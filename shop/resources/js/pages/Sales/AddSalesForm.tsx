import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthLayout from '@/layouts/auth-layout';
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';

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

interface SaleFormData {
    product_id: string;
    customer_id: string;
    quantity: number;
    price: number;
    method: 'cash' | 'mpesa' | 'credit';
    payment_status: 'paid' | 'unpaid' | 'partial';
    amount_paid?: number;
    date: string;
}

interface SaleFormProps {
    products: Product[];
    customers: Customer[];
    initialData?: SaleFormData & { id?: number };
   
}

export default function SaleForm({ products, customers, initialData }: SaleFormProps) {
    const isEditing = !!initialData?.id;

    interface SaleFormData {
        product_id: string;
        customer_id: string;
        quantity: number;
        price: number;
        method: 'cash' | 'mpesa' | 'credit';
        payment_status: 'paid' | 'unpaid' | 'partial';
        amount_paid?: number;
        date: string;
        [key: string]: any; // Added index signature
    }

    const { data, setData, post, put, processing, errors, reset } = useForm<SaleFormData>({
        product_id: initialData?.product_id?.toString() ?? '',
        customer_id: initialData?.customer_id?.toString() ?? '',
        quantity: initialData?.quantity ?? 1,
        price: initialData?.price ?? 0,
        method: initialData?.method ?? 'cash',
        payment_status: initialData?.payment_status ?? 'unpaid',
        amount_paid: initialData?.amount_paid ?? 0,
        date: initialData?.date ?? new Date().toISOString().split('T')[0],
    });

    // Calculate total price when product or quantity changes
    useEffect(() => {
        if (data.product_id) {
            const selectedProduct = products.find((p) => p.id.toString() === data.product_id);
            if (selectedProduct) {
                const newPrice = selectedProduct.price_per_unit * data.quantity;
                setData('price', parseFloat(newPrice.toFixed(2)));

                // If payment status is paid, update amount_paid to match new price
                if (data.payment_status === 'paid') {
                    setData('amount_paid', parseFloat(newPrice.toFixed(2)));
                }
            }
        }
    }, [data.product_id, data.quantity]);

    const handlePaymentStatusChange = (status: 'paid' | 'unpaid' | 'partial') => {
        setData('payment_status', status);

        // Automatically set amount_paid based on status
        if (status === 'paid') {
            setData('amount_paid', data.price);
        } else if (status === 'unpaid') {
            setData('amount_paid', 0);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = {
            product_id: parseInt(data.product_id),
            customer_id: data.customer_id ? parseInt(data.customer_id) : null,
            quantity: data.quantity,
            price: data.price,
            method: data.method,
            payment_status: data.payment_status,
            amount_paid: data.amount_paid,
            date: data.date,
        };

        const requestOptions = {
            onSuccess: () => {
                if (!isEditing) reset();
            },
        };

        if (isEditing) {
            put(route('sale.update', initialData?.id));
        } else {
            post(route('sale.store'));
        }
    };

    return (
        <AuthLayout title={isEditing ? 'Edit Sale' : 'New Sale'} description={isEditing ? 'Update sale record' : 'Record a new sale below.'}>
            <form onSubmit={submit} className="w-full max-w-xl space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    {/* Product Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="product_id">Product</Label>
                        <Select value={data.product_id} onValueChange={(value) => setData('product_id', value)} disabled={processing} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select product" />
                            </SelectTrigger>
                            <SelectContent>
                                {products.map((product) => (
                                    <SelectItem key={product.id} value={product.id.toString()}>
                                        {product.name} ({product.price_per_unit}/{product.unit})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.product_id} />
                    </div>

                    {/* Customer Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="customer_id">Customer</Label>
                        <Select value={data.customer_id} onValueChange={(value) => setData('customer_id', value)} disabled={processing}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select customer" />
                            </SelectTrigger>
                            <SelectContent>
                                {/* <SelectItem value="">Walk-in Customer</SelectItem> */}
                                {customers.map((customer) => (
                                    <SelectItem key={customer.id} value={customer.id.toString()}>
                                        {customer.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.customer_id} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Quantity */}
                    <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                            id="quantity"
                            type="number"
                            step="1"
                            min="1"
                            value={data.quantity}
                            onChange={(e) => setData('quantity', parseFloat(e.target.value))}
                            disabled={processing || !data.product_id}
                            required
                        />
                        <InputError message={errors.quantity} />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <Label htmlFor="price">Total Price</Label>
                        <Input
                            id="price"
                            type="number"
                            min="0"
                            step="0.01"
                            value={data.price.toFixed(2)}
                            onChange={(e) => setData('price', parseFloat(e.target.value))}
                            disabled={processing}
                            required
                        />
                        <InputError message={errors.price} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Payment Method */}
                    <div className="space-y-2">
                        <Label htmlFor="method">Payment Method</Label>
                        <Select
                            value={data.method || ''}
                            onValueChange={(value: 'cash' | 'mpesa' | 'credit') => setData('method', value)}
                            disabled={processing}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cash">Cash</SelectItem>
                                <SelectItem value="mpesa">M-Pesa</SelectItem>
                                <SelectItem value="credit">Credit</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.method} />
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            disabled={processing}
                            required
                        />
                        <InputError message={errors.date} />
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Payment Status Selection */}
                    <div className="space-y-2">
                        <Label>Payment Status</Label>
                        <RadioGroup
                            value={data.payment_status}
                            onValueChange={(value: 'paid' | 'unpaid' | 'partial') => handlePaymentStatusChange(value)}
                            className="flex gap-4"
                        >
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="paid" id="paid" disabled={processing} />
                                <Label htmlFor="paid">Fully Paid</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="unpaid" id="unpaid" disabled={processing} />
                                <Label htmlFor="unpaid">Not Paid</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="partial" id="partial" disabled={processing} />
                                <Label htmlFor="partial">Partial Payment</Label>
                            </div>
                        </RadioGroup>
                        <InputError message={errors.payment_status} />
                    </div>

                    {/* Conditional Amount Paid Input */}
                    {(data.payment_status === 'partial' || data.payment_status === 'paid') && (
                        <div className="space-y-2">
                            <Label htmlFor="amount_paid">{data.payment_status === 'paid' ? 'Amount Paid' : 'Partial Amount Paid'}</Label>
                            <Input
                                id="amount_paid"
                                type="number"
                                min="0"
                                max={data.price}
                                value={data.amount_paid ?? 0}
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    setData('amount_paid', value);
                                    // Automatically update payment status if amount matches total
                                    if (value >= data.price) {
                                        setData('payment_status', 'paid');
                                    } else if (value > 0) {
                                        setData('payment_status', 'partial');
                                    } else {
                                        setData('payment_status', 'unpaid');
                                    }
                                }}
                                disabled={processing || data.payment_status === 'paid'}
                                required={data.payment_status === 'partial' || data.payment_status === 'paid'}
                            />
                            {data.payment_status === 'partial' && (
                                <div className="text-sm text-red-700 bg-red-300">Remaining: {(data.price - (data.amount_paid || 0)).toFixed(2)} Ksh</div>
                            )}
                            <InputError message={errors.amount_paid} />
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button type="submit" disabled={processing} className="w-full">
                        {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isEditing ? 'Update Sale' : 'Record Sale'}
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
