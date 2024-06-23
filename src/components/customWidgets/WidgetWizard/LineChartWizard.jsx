import { useEffect, useState } from 'react';
import Input from '../../Input';

/**
 * @param {{refProps: React.MutableRefObject<{}>}} props
 */
export default function LineChartWizard(props) {
  const { refProps } = props;

  const [name, setName] = useState('');

  useEffect(() => {
    refProps.current = { name };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <fieldset className='mb-4 flex items-center gap-5'>
      <label className='flex w-[90px] items-center justify-start gap-2 text-right text-[15px] text-purple-400'>
        <div>LineChart name</div>

        <Input value={name} setValue={setName} />
      </label>
    </fieldset>
  );
}
