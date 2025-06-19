import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type StockFormData = {
    product_id: string;
    quantity_received: number;
    date: string;
    source?: string;
};

export default function StockForm({
    products,
    initialData,
}: {
    products: { id: number; name: string }[];
    initialData?: StockFormData & { id?: number };
}) {
    const isEditing = Boolean(initialData?.id);

    const { data, setData, post, put, processing, errors, reset } = useForm<StockFormData>({
        product_id: initialData?.product_id ?? '',
        quantity_received: initialData?.quantity_received ?? 0,
        date: initialData?.date ?? new Date().toISOString().split('T')[0],
        source: initialData?.source ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const action = isEditing
            ? put(route('stocks.update', initialData?.id))
            : post(route('stocks.store'), {
                  onSuccess: () => reset(),
              });
    };

    return (
        <AuthLayout
            title={isEditing ? 'Edit Stock' : 'Add Stock'}
            description={isEditing ? 'Update existing stock record' : 'Record received stock below.'}
        >
            <Head title={isEditing ? 'Edit Stock' : 'Add Stock'} />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="product_id">Product</Label>
                        <select
                            id="product_id"
                            required
                            value={data.product_id}
                            onChange={(e) => setData('product_id', e.target.value)}
                            disabled={processing}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                            <option value="">-- Select Product --</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id.toString()}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.product_id} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="quantity_received">Quantity (Litres)</Label>
                        <Input
                            id="quantity_received"
                            type="number"
                            required
                            min={1}
                            value={data.quantity_received}
                            onChange={(e) => setData('quantity_received', parseFloat(e.target.value))}
                            disabled={processing}
                            placeholder="e.g. 50"
                        />
                        <InputError message={errors.quantity_received} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            required
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.date} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="source">Source (Optional)</Label>
                        <Input
                            id="source"
                            type="text"
                            value={data.source}
                            onChange={(e) => setData('source', e.target.value)}
                            disabled={processing}
                            placeholder="e.g. Farm A"
                        />
                        <InputError message={errors.source} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" disabled={processing}>
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        {isEditing ? 'Update Stock' : 'Save Stock'}
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
