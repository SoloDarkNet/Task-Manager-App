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
  const [notification, setNotification] = useState(() => {
    return localStorage.getItem("reminderEnabled") === "true";
  });
  const [loading, setLoading] = useState(false);

  const enableReminder = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;
    setLoading(true);

    try {
      if (!("Notification" in window)) {
        toast.error("Browser not supported!");
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        toast.error("Permission denied!");
        return;
      }

      if (!("serviceWorker" in navigator)) {
        toast.error("Service Worker not supported!");
        return;
      }

      const registration = await navigator.serviceWorker.ready;

      const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
      if (!vapidKey) {
        toast.error("Config error!");
        return;
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });

      await api.post("/notification/subscribe", { subscription });

      const newState = !notification;
      setNotification(newState);
      localStorage.setItem("reminderEnabled", JSON.stringify(newState));

      newState
        ? toast.success("Reminder Enabled! 🔔")
        : toast.error("Reminder Disabled! 🔕");
    } catch (err) {
      console.log("Error:", err);
      toast.error("Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={enableReminder}
      disabled={loading}
      style={{
        background: loading
          ? "linear-gradient(135deg, #999, #777)"
          : notification
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
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
      }}
    >
      {loading
        ? "⏳ Loading..."
        : notification
          ? "🔕 Disable Reminder"
          : "🔔 Enable Reminder"}
    </button>
  );
};

export default PushNotification;
