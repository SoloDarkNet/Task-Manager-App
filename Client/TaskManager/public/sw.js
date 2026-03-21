self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};

  event.waitUntil(
    self.registration.showNotification(data.title || "Task Reminder ⏰", {
      body: data.body || "You have pending tasks!",
      icon: "/pwa-192x192.png",
    }),
  );
});
