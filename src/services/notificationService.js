import { getDatabase, ref, set } from 'firebase/database';
import { sendEmail } from './emailService';
import { subscribeUserToPush, sendPushNotification } from './pushNotificationService';

export const setupNotifications = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.log('Push notifications not supported');
        return false;
    }

    try {
        const subscription = await subscribeUserToPush();
        return !!subscription;
    } catch (error) {
        console.error('Failed to setup push notifications:', error);
        return false;
    }
};

export const sendNotification = async (notification) => {
    const db = getDatabase();
    const notificationRef = ref(db, `notifications/${Date.now()}`);

    try {
        // Store in Firebase
        await set(notificationRef, {
            ...notification,
            timestamp: Date.now(),
            read: false
        });

        // Get push subscription
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();

        if (subscription) {
            // Send push notification
            await sendPushNotification(subscription, {
                title: notification.title,
                body: notification.message,
                icon: '/favicon.ico',
                data: notification
            });
        }

        // Show local notification as fallback
        if (Notification.permission === 'granted') {
            new Notification(notification.title, {
                body: notification.message,
                icon: '/favicon.ico'
            });
        }

        // Send email for medication notifications
        if (notification.type === 'medication') {
            await sendEmail(notification.medicationData);
        }

        return true;
    } catch (error) {
        console.error('Notification error:', error);
        return false;
    }
};