import { toast } from "react-hot-toast";

export const useNotification = () => {
  const notify = (message, type = "success") => {
    if (type === "success") toast.success(message);
    else toast.error(message);
  };

  return notify;
};