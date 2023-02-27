import { useEffect, useState } from 'react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { getCategories } from '@/apis/category';
import { selectProps } from '..';

const Category = ({ register, blogpost, control }) => {
    const [categories, setCategories] = useState(null);

    async function handleLoad(value) {
        const result = await getCategories({ filters: JSON.stringify({ name: value }) });
        return result.data.list.items.map((item) => ({ value: item._id, label: item.name }));
    }

    useEffect(() => {
        async function loadCategory(id) {
            const result = await getCategories({ filters: JSON.stringify({ id }) });
            setCategories(result.data.list.items.map((item) => ({ value: item._id, label: item.name }))) ;
        }
    
        if (!categories && blogpost?.category_id) {
            loadCategory(blogpost.category_id);
        }
    }, [blogpost, categories]);

    return (
        <FormControl>
            <FormLabel htmlFor="post_category">Category</FormLabel>
            <Controller
                render={({ field: f }: any) => (
                    <AsyncSelect
                        cacheOptions
                        loadOptions={handleLoad}
                        defaultOptions={categories || []}
                        id="category"
                        {...selectProps}
                        className=""
                        {...f}
                        value={(categories || []).find(c => c.value === f.value)}
                    />
                )}
                control={control}
                {...register}
            />
        </FormControl>
    );
};

export default Category;
