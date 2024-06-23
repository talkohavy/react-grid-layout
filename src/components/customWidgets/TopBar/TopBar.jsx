import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeWidgetFromDashboardFlow } from '../../../store/slices/dashboards';
import KebabIcon from '../../../utils/svgs/KebabIcon';
import ConfirmationBox from '../../ConfirmationBox';
import DropdownMenu from '../../DropdownMenu';

/**
 * @typedef {{
 *   dashboardId: string,
 *   widgetId: string,
 *   testId?: string,
 *   testItemIndex?: string
 * }} TopBarProps
 */

/**
 * @param {TopBarProps} props
 */
export default function TopBar(props) {
  const { dashboardId, widgetId } = props;

  const dispatch = useDispatch();

  const [isDeleteWidgetModalOpen, setIsDeleteWidgetModalOpen] = useState(false);

  const menuItems = useMemo(
    () => [
      {
        text: 'Edit Widget',
        icon: KebabIcon,
        onClick: () => {
          console.log('Edit Widget');
          // setIsContextMenuOpen(false);
          // setIsRenamePinModalOpen(true);
        },
      },
      {
        text: 'Remove Widget',
        icon: KebabIcon,
        onClick: () => {
          setIsDeleteWidgetModalOpen(true);
        },
      },
    ],
    [],
  );

  // const onConfirmRenamePin = (value: string) => {
  //   dispatch(renamePin({ pinId: widgetId, title: value }));
  //   setIsRenamePinModalOpen(false);
  // };

  return (
    <div className='pointer-events-none absolute right-0 top-0 flex w-full items-center justify-end p-1'>
      <DropdownMenu menuItems={menuItems} className='do-not-drag-me'>
        <button
          type='button'
          className='pointer-events-auto z-10 inline-flex size-5 items-center justify-center rounded-full bg-white p-0.5 shadow-2xs outline-none focus:shadow-2xs focus:shadow-black'
          aria-label='Customize options'
        >
          <KebabIcon className='pointer-events-none' />
        </button>
      </DropdownMenu>

      <ConfirmationBox
        isOpen={isDeleteWidgetModalOpen}
        setIsOpen={setIsDeleteWidgetModalOpen}
        onConfirmClick={() => {
          dispatch(removeWidgetFromDashboardFlow({ dashboardId, widgetId }));
        }}
        className='do-not-drag-me'
      />
    </div>
  );
}
