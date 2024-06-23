import { Close } from '@radix-ui/react-dialog';

/**
 * @param {import('react').PropsWithChildren<{
 *   cancelText?: string,
 *   confirmText?: string,
 *   onConfirmClick?: () => void, onCancelClick?: () => void
 * }>} props
 */
export default function ModalFooter(props) {
  const { cancelText = 'Cancel', confirmText = 'Ok', onConfirmClick, onCancelClick } = props;

  return (
    <div className='mt-6 flex justify-end gap-4'>
      <Close asChild>
        <button
          onClick={onCancelClick}
          type='button'
          className='inline-flex h-[35px] items-center justify-center rounded-[4px] bg-neutral-100 px-[15px] font-medium leading-none text-black/70 hover:bg-neutral-200 focus:shadow-sm focus:outline-none'
        >
          {cancelText}
        </button>
      </Close>

      <Close asChild>
        <button
          onClick={onConfirmClick}
          type='button'
          className='inline-flex h-9 items-center justify-center rounded-[4px] bg-red-400 px-[15px] font-medium leading-none text-white hover:bg-red-500 focus:shadow-sm focus:outline-none'
        >
          {confirmText}
        </button>
      </Close>
    </div>
  );
}
