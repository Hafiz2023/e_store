import { Bounce, toast, ToastOptions } from "react-toastify";

/**
 * Show a toast notification with custom type and message.
 * @param type - One of 'info' | 'success' | 'warning' | 'error'
 * @param message - The message to display in the toast
 */
export const showToast = (
  type: "info" | "success" | "warning" | "error" | "default",
  message: string
) => {
  const options: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

  switch (type) {
    case "info":
      toast.info(message, options);
      break;
    case "success":
      toast.success(message, options);
      break;
    case "warning":
      toast.warning(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    default:
      toast(message, options);
      break;
  }
};
