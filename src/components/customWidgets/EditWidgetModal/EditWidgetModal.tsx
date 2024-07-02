import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Title } from '@radix-ui/react-dialog';
import { getDashboardByIdSelector, getWidgetByIdSelector } from '../../../store/slices/dashboards/selectors';
import Checkbox from '../../Checkbox';
import Modal from '../../Modal';
import ModalFooter from '../../Modal/ModalFooter';
import Select from '../../Select';
import BarChartWizard from '../AddWidgetModal/BarChartWizard';
import LineChartWizard from '../AddWidgetModal/LineChartWizard';
import TextWizard from '../AddWidgetModal/TextWizard';

/**
 * @typedef {import('../../dashboards/types').LayoutProps} LayoutProps
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
 *   dashboardId: string,
 *   widgetId: string,
 *   onConfirmClick: (widget: IWidget, layoutProps?: LayoutProps) => void
 *   onCancelClick?: () => void,
 *   onClose?: () => void,
 * }} props
 */
export default function EditWidgetModal(props) {
  const { dashboardId, widgetId, isModalOpen, setIsModalOpen, onCancelClick, onConfirmClick, onClose } = props;

  const widgetToEdit = useSelector(getWidgetByIdSelector(widgetId));
  const widgetLayoutToEdit = useSelector(getDashboardByIdSelector(dashboardId)).data.find(
    (widget) => widget.i === widgetId,
  );

  const [typeOption, setTypeOption] = useState(typeOptions[widgetToEdit?.type] ?? typeOptions.Text);
  const widgetProps = useRef(widgetToEdit.props);
  const [isStatic, setIsStatic] = useState(widgetLayoutToEdit.static ?? false);
  const [isResizable, setIsResizable] = useState(widgetLayoutToEdit.isResizable ?? false);
  const [isDraggable, setIsDraggable] = useState(widgetLayoutToEdit.isDraggable ?? false);

  const handleConfirmClick = () => {
    /** @type {LayoutProps} */
    const layoutProps = {
      isResizable,
      isDraggable,
      static: isStatic,
    };
    onConfirmClick({ type: typeOption.value, props: widgetProps.current }, layoutProps);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={(value) => {
        setIsModalOpen(value);
        onClose?.();
      }}
    >
      <div className='flex h-full flex-col'>
        <Title className='text-xl font-medium text-black'>Edit Widget</Title>

        <div className='flex grow flex-col items-center justify-between gap-5 overflow-auto'>
          <div className='w-full'>
            <fieldset className='mb-4 flex items-center gap-5'>
              <label className='flex w-[90px] items-center justify-start gap-2 text-right text-[15px] text-purple-600'>
                <div>Type</div>

                <Select selectedOption={typeOption} setOption={setTypeOption} options={typeOptionsArr} />
              </label>
            </fieldset>

            <div className='rounded-lg border p-2'>{WIZARD_BY_TYPE[typeOption.value]({ refProps: widgetProps })}</div>
          </div>

          <hr className='w-full' />

          <div className='w-full'>
            <h2 className='mb-4 font-bold'>Layout Properties:</h2>

            <fieldset className='mb-4 flex items-center gap-5'>
              <Checkbox label='Is Static?' isChecked={isStatic} setIsChecked={setIsStatic} />
            </fieldset>

            <fieldset className='mb-4 flex items-center gap-5'>
              <Checkbox label='Is Resizable?' isChecked={isResizable} setIsChecked={setIsResizable} />
            </fieldset>

            <fieldset className='mb-4 flex items-center gap-5'>
              <Checkbox label='Is Draggable?' isChecked={isDraggable} setIsChecked={setIsDraggable} />
            </fieldset>
          </div>
          <ModalFooter onConfirmClick={handleConfirmClick} onCancelClick={onCancelClick} className='self-start' />
        </div>
      </div>
    </Modal>
  );
}
