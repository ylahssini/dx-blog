import Head from 'next/head';
import MainLayout from '@/components/layout/main';
import BlogPostForm from '@/views/blogposts/form';

export default function EditPost() {
    return (
        <>
            <Head>
                <title>Edit a blog post | DX-Blog</title>
            </Head>
            <BlogPostForm mode="edit" />
        </>
    );
}

EditPost.getLayout = (page) => <MainLayout title="Edit a blog post">{page}</MainLayout>;
