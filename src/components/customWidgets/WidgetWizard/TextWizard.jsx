import { useEffect, useState } from 'react';
import Input from '../../Input';
import NumberInput from '../../NumberInput';
import Select from '../../Select';

const fontWeightOptions = {
  light: { value: 'light', label: 'light' },
  normal: { value: 'normal', label: 'normal' },
  semiBold: { value: 'semiBold', label: 'semi-bold' },
  bold: { value: 'bold', label: 'bold' },
};

const fontWeightOptionsArr = Object.values(fontWeightOptions);

/**
 * @param {{refProps: React.MutableRefObject<{}>}} props
 */
export default function TextWizard(props) {
  const { refProps } = props;

  const [textContent, setTextContent] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState(fontWeightOptions.normal);

  useEffect(() => {
    refProps.current = { textContent, fontSize };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textContent, fontSize]);

  return (
    <div>
      <fieldset className='mb-4 flex items-center gap-5'>
        <label className='flex w-full flex-col items-start justify-start gap-2 text-right text-[15px] text-purple-600'>
          <div>Text inside:</div>

          <Input value={textContent} setValue={setTextContent} />
        </label>
      </fieldset>

      <fieldset className='mb-4 flex items-center gap-5'>
        <label className='flex w-full flex-col items-start justify-start gap-2 text-right text-[15px] text-purple-600'>
          <div>Font Size:</div>

          <NumberInput value={fontSize} setValue={setFontSize} />
        </label>
      </fieldset>

      <fieldset className='mb-4 flex items-center gap-5'>
        <label className='flex w-full flex-col items-start justify-start gap-2 text-right text-[15px] text-purple-600'>
          <div>Font Weight:</div>

          <Select selectedOption={fontWeight} setOption={setFontWeight} options={fontWeightOptionsArr} />
        </label>
      </fieldset>
    </div>
  );
}
