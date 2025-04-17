import { getDatabase, ref, set } from 'firebase/database';

export const setupNotifications = () => {
    if (!('Notification' in window)) {
        console.log('This browser does not support notifications');
        return;
    }

    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
};

export const sendNotification = async (title, options = {}) => {
    if (Notification.permission === 'granted') {
        const notification = new Notification(title, options);
        
        // Store notification in Firebase
        try {
            const db = getDatabase();
            const notificationRef = ref(db, 'notifications/' + Date.now());
            await set(notificationRef, {
                title,
                message: options.body,
                timestamp: Date.now(),
                read: false
            });
        } catch (error) {
            console.error('Error storing notification:', error);
        }

        return notification;
    }
};