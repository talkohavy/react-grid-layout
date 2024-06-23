import { useRef, useState } from 'react';
import { Title } from '@radix-ui/react-dialog';
import Modal from '../../Modal';
import ModalFooter from '../../Modal/ModalFooter';
import Select from '../../Select';
import BarChartWizard from './BarChartWizard';
import LineChartWizard from './LineChartWizard';
import TextWizard from './TextWizard';

/**
 * @typedef {import('../../dashboards/types').IWidget} IWidget
 */

const typeOptions = {
  BarChart: { value: 'BarChart', label: 'Bar Chart' },
  LineChart: { value: 'LineChart', label: 'Line Chart' },
  Text: { value: 'Text', label: 'Text' },
};

const typeOptionsArr = Object.values(typeOptions);

const WIZARD_BY_TYPE = {
  [typeOptions.BarChart.value]: (props) => <BarChartWizard {...props} />,
  [typeOptions.LineChart.value]: (props) => <LineChartWizard {...props} />,
  [typeOptions.Text.value]: (props) => <TextWizard {...props} />,
};

/**
 * @param {{
 *   isModalOpen: boolean,
 *   setIsModalOpen: (value: boolean) => void,
 *   onConfirmClick: (widget: IWidget) => void
 *   onCancelClick?: () => void,
 * }} props
 */
export default function WidgetWizard(props) {
  const { isModalOpen, setIsModalOpen, onCancelClick, onConfirmClick } = props;

  const [type, setType] = useState(typeOptions.BarChart);
  const widgetProps = useRef({});

  const handleConfirmClick = () => onConfirmClick({ type: type.value, props: widgetProps.current });

  return (
    <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <Title className='mb-3 text-xl font-medium text-black'>Add New Widget</Title>

      <fieldset className='mb-4 flex items-center gap-5'>
        <label className='flex w-[90px] items-center justify-start gap-2 text-right text-[15px] text-purple-600'>
          <div>Type</div>

          <Select selectedOption={type} setOption={setType} options={typeOptionsArr} />
        </label>
      </fieldset>

      <div className='rounded-lg border p-2'>{WIZARD_BY_TYPE[type.value]({ refProps: widgetProps })}</div>

      <ModalFooter onConfirmClick={handleConfirmClick} onCancelClick={onCancelClick} />
    </Modal>
  );
}
