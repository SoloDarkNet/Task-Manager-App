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

  const getSubscription = async () => {
    const registration = await navigator.serviceWorker.ready;
    const existingSubscription =
      await registration.pushManager.getSubscription();

    if (existingSubscription) {
      return existingSubscription;
    }

    const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
    if (!vapidKey) {
      throw new Error("Missing VAPID public key");
    }

    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidKey),
    });
  };

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

      if (!("serviceWorker" in navigator)) {
        toast.error("Service Worker not supported!");
        return;
      }

      if (notification) {
        const registration = await navigator.serviceWorker.ready;
        const existingSubscription =
          await registration.pushManager.getSubscription();

        if (existingSubscription) {
          await existingSubscription.unsubscribe();
        }

        await api.delete("/notification/subscribe");
        setNotification(false);
        localStorage.setItem("reminderEnabled", "false");
        toast.success("Reminder Disabled!");
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        toast.error("Permission denied!");
        return;
      }

      const subscription = await getSubscription();

      await api.post("/notification/subscribe", { subscription });
      await api.post("/notification/test");

      setNotification(true);
      localStorage.setItem("reminderEnabled", "true");
      toast.success("Reminder Enabled! Test notification sent.");
    } catch (err) {
      console.log("Error:", err);
      toast.error(err?.response?.data?.message || "Failed!");
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

        transition: "all 0.3s ease",
        opacity: loading ? 0.7 : 1,
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
      }}
    >
      {loading
        ? "Loading..."
        : notification
          ? "Disable Reminder"
          : "Enable Reminder"}
    </button>
  );
};

export default PushNotification;
