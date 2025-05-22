export const requestNotificationPermission = async () => {
    if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }
    return false;
};

export const sendNotification = (title, body, icon = '/favicon.ico') => {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
            body,
            icon,
            tag: 'mladina-notification'
        });
    }
};