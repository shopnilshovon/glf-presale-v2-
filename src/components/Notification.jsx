import { toast } from "react-hot-toast";

export const useNotification = () => {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  return { notifySuccess, notifyError };
};