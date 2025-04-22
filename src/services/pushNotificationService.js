import webpush from 'web-push';

// Generate VAPID keys using web-push generate-vapid-keys
const VAPID_PUBLIC_KEY = 'BNn3QNCy76FlCNKpZEQjq2PrIvlkZLJ-pdnq5z0lOGwYespf-RzY-_Y5M5c4QNtCgmxECSSCESRS47ehTI8PnLA';
const VAPID_PRIVATE_KEY = 'myoWr2W0i_vldm9flQOF_SYxQpzmw4HZNKfqxk8RUuI'; // Replace with your private key

webpush.setVapidDetails(
    'mailto:blubrdpirts@gmail.com',
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
);

export async function subscribeUserToPush() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        throw new Error('Push notifications not supported');
    }

    try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('Service Worker registered');

        let subscription = await registration.pushManager.getSubscription();
        if (!subscription) {
            subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: VAPID_PUBLIC_KEY
            });
        }

        console.log('Push Notification Subscription:', subscription);
        return subscription;
    } catch (err) {
        console.error('Error subscribing to push notifications:', err);
        throw err;
    }
}

export async function sendPushNotification(subscription, data) {
    try {
        const payload = JSON.stringify({
            title: data.title || 'DoseBuddy Alert',
            body: data.message || '',
            icon: '/favicon.ico',
            ...data
        });

        await webpush.sendNotification(subscription, payload);
        return true;
    } catch (err) {
        console.error('Error sending push notification:', err);
        throw err;
    }
}