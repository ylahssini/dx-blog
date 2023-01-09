import Head from 'next/head';
import MainLayout from '@/components/layout/main';
import PostsView from '@/views/categories';

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | DX-Blog</title>
            </Head>
            <PostsView />
        </>
    );
}

Posts.getLayout = (page) => <MainLayout title="Posts">{page}</MainLayout>;
