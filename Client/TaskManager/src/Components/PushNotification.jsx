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
  const [loading, setLoading] = useState(false);

  const enableReminder = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return; // Double trigger Blocked
    setLoading(true);

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

      const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
      if (!vapidKey) {
        toast.error("VAPID key missing!");
        return;
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });

      console.log("Subscription:", subscription);

      await api.post("/notification/subscribe", { subscription });

      const newState = !notification;
      setNotification(newState);

      newState
        ? toast.error("Reminder Disabled! 🔕")
        : toast.success("Reminder Enabled! 🔔");
    } catch (err) {
      console.log("Error:", err);
      toast.error("Failed to enable reminder!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onTouchEnd={(e) => {
        e.preventDefault();
        enableReminder(e);
      }}
      onClick={enableReminder}
      style={{
        background: notification
          ? "linear-gradient(135deg, #eb3349, #f45c43)"
          : "linear-gradient(135deg, #667eea, #764ba2)",
        color: "white",
        border: "none",
        borderRadius: "50px",
        padding: "8px 16px",
        fontSize: "12px",
        fontWeight: "600",
        cursor: loading ? "not-allowed" : "pointer",
        boxShadow: notification
          ? "0 4px 15px rgba(235,51,73,0.4)"
          : "0 4px 15px rgba(102,126,234,0.4)",
        marginBottom: "16px",
        transition: "all 0.3s ease",
        opacity: loading ? 0.7 : 1,
      }}
    >
      {loading
        ? "Loading..."
        : notification
          ? "🔕 Disable Reminder"
          : "🔔 Enable Reminder"}
    </button>
  );
};

export default PushNotification;
