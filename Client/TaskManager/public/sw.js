self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};

  event.waitUntil(
    self.registration.showNotification(data.title || "Task Reminder", {
      body: data.body || "You have pending tasks!",
      icon: "/pwa-192x192.png",
      badge: "/pwa-192x192.png",
    }),
  );
});
