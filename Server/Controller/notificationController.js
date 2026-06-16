const webpush = require("web-push");
const Subscription = require("../Models/Subscription");
const Task = require("../Models/Task");

webpush.setVapidDetails(
  process.env.VAPID_EMAIL,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY,
);

const buildPayload = (title, body) =>
  JSON.stringify({
    title,
    body,
    icon: "/pwa-192x192.png",
  });

const sendPushToSubscription = async (subscriptionRecord, payload) => {
  try {
    await webpush.sendNotification(subscriptionRecord.subscription, payload);
    return true;
  } catch (error) {
    if (error.statusCode === 404 || error.statusCode === 410) {
      await Subscription.findByIdAndDelete(subscriptionRecord._id);
      return false;
    }

    throw error;
  }
};

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

const removeSubscription = async (req, res) => {
  try {
    await Subscription.findOneAndDelete({ userId: req.user.id });
    res.status(200).json({ message: "Subscription removed!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const sendTestNotification = async (req, res) => {
  try {
    const subscriptionRecord = await Subscription.findOne({ userId: req.user.id });

    if (!subscriptionRecord) {
      return res.status(404).json({
        message: "No active reminder subscription found.",
      });
    }

    const delivered = await sendPushToSubscription(
      subscriptionRecord,
      buildPayload("Test Reminder", "Push notifications are working."),
    );

    if (!delivered) {
      return res.status(410).json({
        message: "Subscription expired. Please enable reminders again.",
      });
    }

    res.status(200).json({ message: "Test notification sent!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const sendPendingReminder = async () => {
  try {
    const subscriptions = await Subscription.find();
    let deliveredCount = 0;

    for (const sub of subscriptions) {
      const pendingCount = await Task.countDocuments({
        user: sub.userId,
        status: { $in: ["Pending", "In Progress"] },
      });

      if (pendingCount === 0) {
        continue;
      }

      const delivered = await sendPushToSubscription(
        sub,
        buildPayload(
          "Task Reminder",
          `You have ${pendingCount} incomplete task${
            pendingCount > 1 ? "s" : ""
          }! Keep going!`,
        ),
      );

      if (delivered) {
        deliveredCount += 1;
      }
    }

    console.log(
      `Reminders sent! subscriptions=${subscriptions.length}, delivered=${deliveredCount}`,
    );
  } catch (err) {
    console.log("Notification error:", err);
  }
};

module.exports = {
  saveSubscription,
  removeSubscription,
  sendTestNotification,
  sendPendingReminder,
};
