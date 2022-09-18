import Head from 'next/head';
import MainLayout from '@/components/layout/main';
import ProductsView from '@/views/products';

export default function Products() {
    return (
        <>
            <Head>
                <title>List of products | Mini-CRM</title>
            </Head>
            <ProductsView />
        </>
    );
}

Products.getLayout = (page) => <MainLayout title="List of products">{page}</MainLayout>;
