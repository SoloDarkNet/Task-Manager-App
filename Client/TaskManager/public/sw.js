self.addEventListener("install", (event) => {
  console.log("SW Installed!");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("SW Activated!");
  event.waitUntil(clients.claim());
});

self.addEventListener("push", (event) => {
  console.log("Push received!");
  const data = event.data?.json() || {};

  event.waitUntil(
    self.registration.showNotification(data.title || "Task Reminder ⏰", {
      body: data.body || "You have pending tasks!",
      icon: "/pwa-192x192.png",
      badge: "/pwa-192x192.png",
    }),
  );
});
