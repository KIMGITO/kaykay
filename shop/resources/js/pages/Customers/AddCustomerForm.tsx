import { Head, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { FormEventHandler } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthLayout from '@/layouts/auth-layout';
import { toast } from 'sonner';

type CustomerFormData = {
    name: string;
    note?: string;
    bill_duration: string;
    phone?: string;
    location?: string;
};

export default function CustomerForm({ initialData }: { initialData?: CustomerFormData & { id?: number } }) {
    const isEditing = Boolean(initialData?.id);

    const { data, setData, post, put, processing, errors, reset } = useForm<CustomerFormData>({
        name: initialData?.name ?? '',
        phone: initialData?.phone ?? '',
        location: initialData?.location ?? '',
        bill_duration: initialData?.bill_duration ?? 'Daily',
        note: initialData?.note ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('customers.update', initialData?.id));
        } else {
            post(route('customers.store'), {
                onSuccess: () => {
                    reset();
                    toast.success(isEditing ? 'Customer updated successfully' : 'Customer created successfully');
                },
                onError: () => {
                    toast.error('There was an error processing your request');
                },
            });
        }
    };

    return (
        <AuthLayout
            title={isEditing ? 'Edit Customer' : 'Add Customer'}
            description={isEditing ? 'Update existing customer record' : 'Create a new customer below.'}
        >
            <Head title={isEditing ? 'Edit Customer' : 'Add Customer'} />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Customer Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="e.g. John Doe or ABC Company"
                        />
                        {errors.name && <p className="text-sm font-medium text-destructive">{errors.name}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number (Optional)</Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={data.phone ?? ''}
                            onChange={(e) => setData('phone', e.target.value)}
                            disabled={processing}
                            placeholder="e.g. +1234567890"
                        />
                        {errors.phone && <p className="text-sm font-medium text-destructive">{errors.phone}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="location">Location (Optional)</Label>
                        <Input
                            id="location"
                            type="text"
                            value={data.location ?? ''}
                            onChange={(e) => setData('location', e.target.value)}
                            disabled={processing}
                            placeholder="e.g. City, Country"
                        />
                        {errors.location && <p className="text-sm font-medium text-destructive">{errors.location}</p>}
                    </div>
                    <div>
                        <Label className='mb-2' htmlFor="bill_duration">Bill Duration.</Label>
                        <Select onValueChange={(value) => setData('bill_duration', value)}>
                            <SelectTrigger>
                                <SelectValue>{data.bill_duration || 'Bill Duration.'}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Daily">
                                    {' Daily'}
                                </SelectItem>
                                <SelectItem value="Weekly"> {'Weekly'}</SelectItem>
                                <SelectItem value="Monthly"> {'Monthly'}</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.bill_duration && <p className='text-sm font-medium text-destructive'>{ errors.bill_duration}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="note">Notes</Label>
                        <textarea
                            id="note"
                            value={data.note ?? ''}
                            onChange={(e) => setData('note', e.target.value)}
                            disabled={processing}
                            placeholder="Additional notes about the customer"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        {errors.note && <p className="text-sm font-medium text-destructive">{errors.note}</p>}
                    </div>

                    <Button type="submit" className="mt-2 w-full" disabled={processing}>
                        {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isEditing ? 'Update Customer' : 'Create Customer'}
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
