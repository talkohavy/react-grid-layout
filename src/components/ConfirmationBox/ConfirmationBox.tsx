import clsx from 'clsx';
import { Action, Cancel, Content, Description, Overlay, Portal, Root, Title } from '@radix-ui/react-alert-dialog';

/**
 * @typedef {{
 *   isOpen: boolean,
 *   setIsOpen: (value: boolean) => void,
 *   title?: any,
 *   description?: any,
 *   cancelText?: any,
 *   confirmText?: any,
 *   onCancelClick?: any,
 *   onConfirmClick: any,
 *   className?: string,
 * }} ConfirmationBoxProps
 */

/**
 * @param {ConfirmationBoxProps} props
 */
export default function ConfirmationBox(props) {
  const {
    isOpen,
    setIsOpen,
    title = 'Are you sure?',
    description = 'This action cannot be undone.',
    cancelText = 'Cancel',
    confirmText = 'Yes',
    onCancelClick,
    onConfirmClick,
    className,
  } = props;

  return (
    <Root open={isOpen} onOpenChange={setIsOpen}>
      <Portal>
        <Overlay className={clsx('fixed inset-0 bg-black/10 data-[state=open]:animate-slide-up', className)} />

        <Content
          onEscapeKeyDown={onCancelClick}
          className={clsx(
            'fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-appear-quick',
            className,
          )}
        >
          <Title className='m-0 text-lg font-medium text-black'>{title}</Title>

          <Description className='mb-5 mt-4 text-[15px] leading-normal text-black'>{description}</Description>

          <div className='flex justify-end gap-[25px]'>
            <Cancel asChild>
              <button
                type='button'
                onClick={onCancelClick}
                className='inline-flex h-9 items-center justify-center rounded-[4px] bg-neutral-50 px-4 font-medium leading-none text-black outline-none hover:bg-neutral-100 focus:shadow-2xs'
              >
                {cancelText}
              </button>
            </Cancel>

            <Action asChild>
              <button
                type='button'
                onClick={onConfirmClick}
                className='inline-flex h-9 items-center justify-center rounded-md bg-red-400 px-4 font-medium leading-none text-white outline-none hover:bg-red-500 focus:shadow-2xs'
              >
                {confirmText}
              </button>
            </Action>
          </div>
        </Content>
      </Portal>
    </Root>
  );
}
