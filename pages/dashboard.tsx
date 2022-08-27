import MainLayout from '@/components/layout/main';
import DashboardView from '@/views/dashboard';

function Dashboard() {
    return <DashboardView />;
}

Dashboard.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Dashboard;
