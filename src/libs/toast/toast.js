import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = (message, type) => {
  switch (type) {
    case "SUCCESS" :
      toast.success(message)
      break;
    case "ERROR":
      toast.error(message);
      break;
    case "INFO":
      toast.info(message);
      break;
    default:
      toast(message);
      break;
  }
}

export default showToast