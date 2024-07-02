import { useNavigate } from 'react-router-dom';

/**
 * @param {{
 *   data: Array<any>,
 * }} props
 */
export default function DashboardsList(props) {
  const { data } = props;
  const navigate = useNavigate();

  return (
    <div className='size-full rounded-md border'>
      {data.map(({ id, title }) => (
        <div
          key={id}
          onClick={() => navigate(`/dashboards/${id}`)}
          className='cursor-pointer border-b-1 p-4 hover:!bg-red-50 active:!bg-neutral-200 [&:nth-child(odd)]:bg-neutral-50'
        >
          {title}
        </div>
      ))}
    </div>
  );
}
