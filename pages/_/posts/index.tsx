import Head from 'next/head';
import MainLayout from '@/components/layout/main';
import BlogPostsView from '@/views/blogposts/list';

export default function Posts() {
    return (
        <>
            <Head>
                <title>Blog posts | DX-Blog</title>
            </Head>
            <BlogPostsView />
        </>
    );
}

Posts.getLayout = (page) => <MainLayout title="Posts">{page}</MainLayout>;
