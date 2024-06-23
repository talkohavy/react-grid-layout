import { useEffect, useState } from 'react';
import Input from '../../Input';

/**
 * @param {{refProps: React.MutableRefObject<{}>}} props
 */
export default function TextWizard(props) {
  const { refProps } = props;

  const [textContent, setTextContent] = useState('');

  useEffect(() => {
    refProps.current = { textContent };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textContent]);

  return (
    <fieldset className='mb-4 flex items-center gap-5'>
      <label className='flex w-[90px] items-center justify-start gap-2 text-right text-[15px] text-purple-400'>
        <div>Text inside:</div>

        <Input value={textContent} setValue={setTextContent} />
      </label>
    </fieldset>
  );
}
