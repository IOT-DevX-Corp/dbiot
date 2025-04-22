import { useState, useEffect } from 'react';

export const useNotification = () => {
    const [permission, setPermission] = useState('default');

    useEffect(() => {
        if (!('Notification' in window)) {
            console.log('Notifications not supported');
            return;
        }

        setPermission(Notification.permission);
    }, []);

    const sendNotification = async (title, options = {}) => {
        if (!('Notification' in window)) return;

        try {
            if (Notification.permission !== 'granted') {
                const permission = await Notification.requestPermission();
                if (permission !== 'granted') return;
            }

            return new Notification(title, {
                ...options,
                requireInteraction: true,
                silent: false
            });
        } catch (error) {
            console.error('Error showing notification:', error);
        }
    };

    return { permission, sendNotification };
};