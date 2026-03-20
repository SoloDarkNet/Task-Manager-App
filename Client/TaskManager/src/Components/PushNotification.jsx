import api from "../Services/app";
import { toast } from "react-toastify";

// ✅ VAPID key convert function (IMPORTANT)
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}

const PushNotification = () => {
  const enableReminder = async () => {
    console.log("Button Clicked");

    try {
      //  Check browser support
      if (!("Notification" in window)) {
        toast.error("Your browser notifications not support!");
        return;
      }

      // Ask permission
      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        toast.error("Notification permission denied!");
        return;
      }

      //  Check service worker
      if (!("serviceWorker" in navigator)) {
        toast.error("Service Worker not supported!");
        return;
      }

      //  Wait for service worker ready
      const registration = await navigator.serviceWorker.ready;

      //  Subscribe to push
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BIaZi4ymX0W16d09UgF9-VZ2IW56Nm9gSAcn8MHdxe2ALAIn3yqNVm3KQy_sSWIAweUTLFjIhRfomayDGXaQq5I",
        ),
      });

      console.log("Subscription:", subscription);

      //  Send to backend
      await api.post("/notification/subscribe", { subscription });

      toast.success("Reminder enabled! 🔔");
    } catch (err) {
      console.log("Error:", err);
      toast.error("Failed to enable reminder!");
    }
  };

  return (
    <button
      onClick={enableReminder}
      style={{
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        color: "white",
        border: "none",
        borderRadius: "50px",
        padding: "8px 16px",
        fontSize: "12px",
        fontWeight: "600",
        cursor: "pointer",
        boxShadow: "0 4px 15px rgba(102,126,234,0.4)",
        marginBottom: "16px",
      }}
    >
      🔔 Enable Reminder
    </button>
  );
};

export default PushNotification;
