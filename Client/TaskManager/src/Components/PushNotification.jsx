import { useState } from "react";
import api from "../Services/app";
import { toast } from "react-toastify";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}

const PushNotification = () => {
  const [notification, setNotification] = useState(false);

  const enableReminder = async () => {
    console.log("Button Clicked");

    try {
      if (!("Notification" in window)) {
        toast.error("Your browser notifications not support!");
        return;
      }

      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        toast.error("Notification permission denied!");
        return;
      }

      if (!("serviceWorker" in navigator)) {
        toast.error("Service Worker not supported!");
        return;
      }

      const registration = await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          import.meta.env.VITE_VAPID_PUBLIC_KEY,
        ),
      });

      console.log("Subscription:", subscription);

      await api.post("/notification/subscribe", { subscription });

      // Toggle fix
      const newState = !notification;
      setNotification(newState);

      newState
        ? toast.success("Reminder Enabled! 🔔")
        : toast.error("Reminder Disabled! 🔕");
    } catch (err) {
      console.log("Error:", err);
      toast.error("Failed to enable reminder!");
    }
  };

  return (
    <button
      onClick={enableReminder}
      onTouchStart={enableReminder}
      style={{
        background: notification
          ? "linear-gradient(135deg, #eb3349, #f45c43)" // Disabled — red
          : "linear-gradient(135deg, #667eea, #764ba2)", // Enabled — purple
        color: "white",
        border: "none",
        borderRadius: "50px",
        padding: "8px 16px",
        fontSize: "12px",
        fontWeight: "600",
        cursor: "pointer",
        boxShadow: notification
          ? "0 4px 15px rgba(235,51,73,0.4)"
          : "0 4px 15px rgba(102,126,234,0.4)",
        marginBottom: "16px",
        transition: "all 0.3s ease",
      }}
    >
      {notification ? "🔕 Disable Reminder" : "🔔 Enable Reminder"}
    </button>
  );
};

export default PushNotification;
