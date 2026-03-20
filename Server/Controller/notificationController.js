const webpush = require("web-push");
const Subscription = require("../Models/Subscription");
const Task = require("../Models/Task");

webpush.setVapidDetails(
  process.env.VAPID_EMAIL,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY,
);

const saveSubscription = async (req, res) => {
  try {
    const { subscription } = req.body;
    const userId = req.user.id;

    await Subscription.findOneAndUpdate(
      { userId },
      { subscription },
      { upsert: true, new: true },
    );

    res.status(200).json({ message: "Subscription saved!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const sendPendingReminder = async () => {
  try {
    const subscriptions = await Subscription.find();

    for (const sub of subscriptions) {
      const pendingCount = await Task.countDocuments({
        userId: sub.userId,
        status: { $in: ["Pending", "In Progress"] },
      });

      if (pendingCount > 0) {
        const payload = JSON.stringify({
          title: "Task Reminder ⏰",
          body: `You have ${pendingCount} incomplete task${
            pendingCount > 1 ? "s" : ""
          }! Keep going! 💪`,
          icon: "/pwa-192x192.png",
        });

        await webpush.sendNotification(sub.subscription, payload);
      }
    }
    console.log("Reminders sent!");
  } catch (err) {
    console.log("Notification error:", err);
  }
};

module.exports = { saveSubscription, sendPendingReminder };
