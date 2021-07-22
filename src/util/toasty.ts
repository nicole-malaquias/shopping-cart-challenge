import { toast } from "react-toastify";

export const options = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
};

export const configConfetti = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

export const toastError = (message: string) => {
  toast.error(message);
};

export const toastSuccess = (message: string) => {
  toast.success(message);
};
export const toastErrorLogin = () => {
  toast.dark("Couldn't login, try again");
};
