import { useMemo } from 'react';
import KebabIcon from '../../../utils/svgs/KebabIcon';
import DropdownMenu from '../../DropdownMenu';

// import { useRef, useState } from 'react';
// import clsx from 'clsx';
// import ContextMenu, { MenuItemProps } from '@src/components/ContextMenu';
// import { renamePin } from '@src/store/slices/pins/reducer';
// import { unpinResponseFlow } from '@src/tasks/chatManager/unpinResponseFlow';
// import RenamePinModal from './RenamePinModal';

/**
 * @typedef {{
 *   widgetId: string,
 *   testId?: string,
 *   testItemIndex?: string
 * }} TopBarProps
 */

/**
 * @param {TopBarProps} props
 */
export default function TopBar(props) {
  console.log('props is:', props);
  // const { widgetId, title, testId = '', testItemIndex = 0 } = props;

  // const kebabMenuRef = useRef(null);

  // const [isRenamePinModalOpen, setIsRenamePinModalOpen] = useState(false);
  // const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const menuItems = useMemo(
    () => [
      {
        text: 'Rename Pin',
        icon: KebabIcon,
        onClick: () => {
          console.log('Rename Pin');
          // setIsContextMenuOpen(false);
          // setIsRenamePinModalOpen(true);
        },
      },
      {
        text: 'Delete Pin',
        icon: KebabIcon,
        onClick: () => {
          console.log('Delete Pin');
          // setIsContextMenuOpen(false);
          // unpinResponseFlow({ pinId: widgetId });
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
    <div className='absolute right-0 top-0 flex w-full items-center justify-end p-1'>
      <DropdownMenu menuItems={menuItems} className='do-not-drag-me'>
        <button
          type='button'
          className='z-10 inline-flex size-5 items-center justify-center rounded-full bg-white p-0.5 shadow-2xs outline-none focus:shadow-2xs focus:shadow-black'
          aria-label='Customize options'
        >
          <KebabIcon className='pointer-events-none' />
        </button>
      </DropdownMenu>

      {/* <IconButton
        reference={optionsAnchorEl}
        icon={Icons.DotsVertical}
        variant='icon-10'
        onClick={() => setIsContextMenuOpen(true)}
        className={classNames(styles.widgetKebabMenuButton, 'do-not-drag-me')}
        dataTestId={`${testId}WidgetKebabMenuButton${testItemIndex}`}
      /> */}

      {/* <ContextMenu
        anchorElement={optionsAnchorEl}
        isOpen={isContextMenuOpen}
        onClose={() => setIsContextMenuOpen(false)}
        menuItems={menuItems}
        className='do-not-drag-me'
      /> */}

      {/* <RenamePinModal
        isOpen={isRenamePinModalOpen}
        previousPinTitle={title}
        onConfirm={onConfirmRenamePin}
        onCancel={() => setIsRenamePinModalOpen(false)}
      /> */}
    </div>
  );
}
