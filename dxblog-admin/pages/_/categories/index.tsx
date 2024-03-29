import Head from 'next/head';
import MainLayout from '@/components/layout/main';
import CategoriesView from '@/views/categories';

export default function Categories() {
    return (
        <>
            <Head>
                <title>Categories | DX-Blog</title>
            </Head>
            <CategoriesView />
        </>
    );
}

Categories.getLayout = (page) => <MainLayout title="Categories">{page}</MainLayout>;
