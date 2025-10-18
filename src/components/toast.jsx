import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

/**
 * Displays a toast notification.
 * @param {object} options - The options for the toast.
 * @param {string} options.text - The message to display.
 * @param {string} [options.type='success'] - The type of toast ('success', 'error').
 * @param {number} [options.duration=3000] - How long the toast should be displayed.
 * @param {string} [options.destination] - URL to open on click.
 * @param {boolean} [options.newWindow=true] - Open destination in a new window.
 * @param {boolean} [options.close=true] - Show a close icon.
 * @param {string} [options.gravity='top'] - 'top' or 'bottom'.
 * @param {string} [options.position='right'] - 'left', 'center', or 'right'.
 * @param {boolean} [options.stopOnFocus=true] - Prevents dismissing of toast on hover.
 * @param {function} [options.onClick=()=>{}] - Callback after click.
 */
export const showToast = ({
  text,
  type = "success",
  duration = 3000,
  ...rest
}) => {
  const background =
    type === "success"
      ? "#A8FBD3"
      : "#CD2C58";

  Toastify({
    text,
    duration,
    ...rest,
    style: {
      background,
      color: "#000",
    },
  }).showToast();
};
