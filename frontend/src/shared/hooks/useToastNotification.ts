import axios from 'axios';
import { toast } from 'react-toastify';

export const useToastNotification = () => {
  const showError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.detail;
      toast.error(message);
    } else if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('Произошла неизвестная ошибка');
    }
  };

  const showSuccess = (message: string) => {
    if (message) {
      toast.success(message);
    }
  };
  return { showError, showSuccess };
};
