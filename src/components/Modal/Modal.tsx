import { Close, Content, Overlay, Portal, Root } from '@radix-ui/react-dialog';
import XIcon from '../../utils/svgs/XIcon';

/**
 * @typedef {{
 *   isOpen: boolean,
 *   setIsOpen: (value: boolean) => void,
 *   isModal?: boolean,
 *   confirmText?: string,
 *   cancelText?: string,
 *   onConfirmClick?: () => void,
 *   onCancelClick?: () => void,
 * }} ModalProps
 */

/**
 * @param {import('react').PropsWithChildren<ModalProps>} props
 */
export default function Modal(props) {
  const { isOpen, setIsOpen, isModal = true, children } = props;

  return (
    <Root open={isOpen} onOpenChange={setIsOpen} modal={isModal}>
      <Portal>
        <Overlay className='fixed inset-0 bg-black/10 data-[state=open]:animate-slide-up' />

        <Content className='fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-appear-quick'>
          <Close asChild>
            <button
              type='button'
              className='absolute right-2.5 top-2.5 inline-flex size-6 appearance-none items-center justify-center rounded-full p-1 text-black hover:bg-red-100 hover:text-red-500 focus:shadow-2xs focus:outline-none'
              aria-label='Close'
            >
              <XIcon />
            </button>
          </Close>

          {children}
        </Content>
      </Portal>
    </Root>
  );
}
