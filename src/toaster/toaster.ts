import { Slide, toast } from 'react-toastify';

/**
 * @type {import('react-toastify').ToastContainerProps}
 */
export const DEFAULT_TOAST_CONTAINER_OPTIONS = {
  position: 'top-center',
  autoClose: 2000,
  transition: Slide,
  hideProgressBar: false,
  newestOnTop: false,
  rtl: false,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: false,
  // theme: 'light', // <--- we're always using light! the play on dark mode is by using css on that light mode (with html[data-theme=dark]).
};

/**
 * @param {import('react-toastify').ToastContent<any>} message
 * @param {import('react-toastify').ToastOptions<any>} options
 */
function toastSuccess(message, options = {}) {
  toast.success(message, options);
}

/**
 * @param {import('react-toastify').ToastContent<any>} message
 * @param {import('react-toastify').ToastOptions<any>} options
 */
function toastError(message, options = {}) {
  toast.error(message, options);
}

/**
 * @param {import('react-toastify').ToastContent<any>} message
 * @param {import('react-toastify').ToastOptions<any>} options
 */
function toastInfo(message, options = {}) {
  toast.info(message, options);
}

/**
 * @param {import('react-toastify').ToastContent<any>} message
 * @param {import('react-toastify').ToastOptions<any>} options
 */
function toastWarn(message, options = {}) {
  toast.warn(message, options);
}

export { toastError, toastInfo, toastSuccess, toastWarn };
