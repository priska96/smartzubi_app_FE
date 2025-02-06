import { Checkbox, FormControl, FormHelperText } from '@mui/material';
import { useEffect, useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { StripeProduct } from '@/app/api/models';
import {
    FREE_MEMBERSHIP,
    getAllStripeProducts,
    STANDARD_MONTHLY,
} from '@/app/api';

export function ProductDisplay({
    registerForm,
    errors,
}: {
    registerForm: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
}) {
    const [products, setProducts] = useState<StripeProduct[]>([]);
    useEffect(() => {
        getAllStripeProducts({
            lookup_key: [STANDARD_MONTHLY, FREE_MEMBERSHIP],
        })
            .then((data) => setProducts(data))
            .catch((error) => {
                console.error('Failed to fetch products', error);
            });
    }, []);

    return (
        <FormControl
            required
            error={!!errors.free_membership || !!errors.standard_monthly}
            component="fieldset"
            className="flex !flex-row gap-4 flex-wrap"
            variant="standard"
        >
            {products.length > 0 &&
                products.map((product) => (
                    <div
                        key={product.product_id}
                        className="flex flex-1 flex-col justify-center gap-4 border border border-zinc-400 p-4 rounded-md"
                    >
                        <div className="text-center description">
                            <h3>{product.product_name}</h3>
                            {product.type === 'one_time' ? (
                                <h5>{product.unit_amount / 100} EUR</h5>
                            ) : (
                                <h5>
                                    {product.unit_amount / 100} EUR /{' '}
                                    {product.recurring.interval}
                                </h5>
                            )}
                        </div>
                        <Checkbox {...registerForm(product.lookup_key)} />
                    </div>
                ))}

            {(!!errors.free_membership || !!errors.standard_monthly) && (
                <FormHelperText className="w-full">
                    You can only pick one
                </FormHelperText>
            )}
        </FormControl>
    );
}
