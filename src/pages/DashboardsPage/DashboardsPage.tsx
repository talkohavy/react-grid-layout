import DashboardsList from './DashboardsList';
import { dashboards } from './mockDatabase';

export default function DashboardsPage() {
  return (
    <div className='flex size-full flex-col items-center justify-start gap-4 p-4'>
      <div className='text-4xl font-bold'>Dashboards List</div>

      <div className='flex size-full justify-between gap-4'>
        <DashboardsList data={dashboards} />
      </div>
    </div>
  );
}
