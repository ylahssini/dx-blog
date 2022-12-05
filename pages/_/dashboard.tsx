import Head from 'next/head';
import MainLayout from '@/components/layout/main';
import DashboardView from '@/views/dashboard';

function Dashboard() {
    return (
        <>
            <Head>
                <title>Dashboard | DX-Blog</title>
            </Head>
            <DashboardView />
        </>
    );
}

Dashboard.getLayout = (page) => <MainLayout title="Dashboard">{page}</MainLayout>;

export default Dashboard;
