import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AlertMessage = (message) => {
  toast.info(message);
};

export const ErrorMessage = (message) => {
  toast.error(message);
};
