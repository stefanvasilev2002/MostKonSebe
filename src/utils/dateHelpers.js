export const isToday = (date) => {
    const today = new Date();
    const checkDate = new Date(date);
    return (
        checkDate.getDate() === today.getDate() &&
        checkDate.getMonth() === today.getMonth() &&
        checkDate.getFullYear() === today.getFullYear()
    );
};

export const formatDate = (date, locale = 'mk-MK') => {
    return new Date(date).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'утро';
    if (hour < 18) return 'попладне';
    return 'вечер';
};