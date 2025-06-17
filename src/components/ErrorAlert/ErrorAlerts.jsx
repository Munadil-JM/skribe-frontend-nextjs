import { useEffect, useState } from "react";
import { useNotification } from "./ErrorContextNotification";

const ErrorAlerts = () => {
  const { notification } = useNotification();
  const [fadeOut, setFadeOut] = useState(false);
  // Trigger fade-out after a certain duration (e.g., 3 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 3000); // Adjust the time for when it should fade out

    return () => clearTimeout(timer);
  }, []);

  if (!notification) return null;

  return (
    <div
      className={`${
        notification.type === "warning" && "bg-orange-400 text-white"
      }
      ${notification.type === "success" && "bg-green-500 text-white"}
      ${notification.type === "error" && "bg-red-500 text-white"}
      fixed left-1/2 bottom-4 z-[999] w-fit -translate-x-1/2 -translate-y-1/2 rounded-full p-2 px-4 text-sm flex items-center gap-x-1
      ${!fadeOut ? "animate-fade-in-slide-up" : "animate-fade-out"}`}
    >
      {notification.type === "error" && (
        <span className="material-icons-outlined">highlight_off</span>
      )}
      {notification.type === "warning" && (
        <span className="material-icons-outlined">error_outline</span>
      )}
      {notification.type === "success" && (
        <span className="material-icons-outlined">check_circle</span>
      )}
      {notification.message}
    </div>
  );
};

export default ErrorAlerts;
