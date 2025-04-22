export const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/service-worker.js');
            return registration;
        } catch (error) {
            console.error('Service worker registration failed:', error);
            throw error;
        }
    }
    throw new Error('Service workers not supported');
};

export const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
        throw new Error('Notifications not supported');
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
};

export async function subscribeToPushNotifications(registration) {
  try {
    let subscription = await registration.pushManager.getSubscription();
    
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY' // Replace with your VAPID public key
      });
    }
    
    console.log('Push subscription:', subscription);
    return subscription;
  } catch (error) {
    console.error('Push subscription failed:', error);
    throw error;
  }
}

export const formatTime = (hour, minute) => {
    return `${hour}:${minute.toString().padStart(2, '0')}`;
};