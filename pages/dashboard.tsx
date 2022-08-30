import Head from 'next/head';
import MainLayout from '@/components/layout/main';
import DashboardView from '@/views/dashboard';

function Dashboard() {
    return (
        <>
            <Head>
                <title>Dashboard | Mini-CRM</title>
            </Head>
            <DashboardView />
        </>
    );
}

Dashboard.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Dashboard;
