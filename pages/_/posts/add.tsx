import Head from 'next/head';
import MainLayout from '@/components/layout/main';
import BlogPostForm from '@/views/blogposts/form';

export default function AddPost() {
    return (
        <>
            <Head>
                <title>Add a blog post | DX-Blog</title>
            </Head>
            <BlogPostForm mode="add" />
        </>
    );
}

AddPost.getLayout = (page) => <MainLayout title="Add a blog post">{page}</MainLayout>;
