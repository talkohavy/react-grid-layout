import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Title } from '@radix-ui/react-dialog';
import { getWidgetByIdSelector } from '../../../store/slices/dashboards/selectors';
import Modal from '../../Modal';
import ModalFooter from '../../Modal/ModalFooter';
import Select from '../../Select';
import BarChartWizard from '../AddWidgetModal/BarChartWizard';
import LineChartWizard from '../AddWidgetModal/LineChartWizard';
import TextWizard from '../AddWidgetModal/TextWizard';

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
 *   widgetId: string,
 *   onConfirmClick: (widget: any) => void
 *   onCancelClick?: () => void,
 *   onClose?: () => void,
 * }} props
 */
export default function EditWidgetModal(props) {
  const { widgetId, isModalOpen, setIsModalOpen, onCancelClick, onConfirmClick, onClose } = props;

  const widgetToEdit = useSelector(getWidgetByIdSelector(widgetId));

  const [typeOption, setTypeOption] = useState(typeOptions[widgetToEdit?.type] ?? typeOptions.Text);
  const widgetProps = useRef(widgetToEdit.props);

  const handleConfirmClick = () => onConfirmClick({ type: typeOption.value, props: widgetProps.current });

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={(value) => {
        setIsModalOpen(value);
        onClose?.();
      }}
    >
      <Title className='mb-3 text-xl font-medium text-black'>Edit Widget</Title>

      <fieldset className='mb-4 flex items-center gap-5'>
        <label className='flex w-[90px] items-center justify-start gap-2 text-right text-[15px] text-purple-600'>
          <div>Type</div>

          <Select selectedOption={typeOption} setOption={setTypeOption} options={typeOptionsArr} />
        </label>
      </fieldset>

      <div className='rounded-lg border p-2'>{WIZARD_BY_TYPE[typeOption.value]({ refProps: widgetProps })}</div>

      <ModalFooter onConfirmClick={handleConfirmClick} onCancelClick={onCancelClick} />
    </Modal>
  );
}
