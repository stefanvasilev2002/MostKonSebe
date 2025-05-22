export const saveUserData = (userData) => {
    try {
        localStorage.setItem('mladina-user-data', JSON.stringify(userData));
    } catch (error) {
        console.error('Error saving user data:', error);
    }
};

export const loadUserData = () => {
    try {
        const saved = localStorage.getItem('mladina-user-data');
        return saved ? JSON.parse(saved) : null;
    } catch (error) {
        console.error('Error loading user data:', error);
        return null;
    }
};

export const clearUserData = () => {
    try {
        localStorage.removeItem('mladina-user-data');
    } catch (error) {
        console.error('Error clearing user data:', error);
    }
};