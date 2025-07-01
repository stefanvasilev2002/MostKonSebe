import { useState, useEffect } from 'react';
import { calculateLevel, checkForNewBadges } from '../utils/gamification';

export const useGamification = (userStats) => {
    const [currentLevel, setCurrentLevel] = useState(null);
    const [newBadges, setNewBadges] = useState([]);
    const [showBadgeNotification, setShowBadgeNotification] = useState(false);

    useEffect(() => {
        if (userStats) {
            const level = calculateLevel(userStats.points);
            setCurrentLevel(level);

            const badges = checkForNewBadges(userStats);
            if (badges.length > 0) {
                setNewBadges(badges);
                setShowBadgeNotification(true);
            }
        }
    }, [userStats]);

    const dismissBadgeNotification = () => {
        setShowBadgeNotification(false);
        setNewBadges([]);
    };

    return {
        currentLevel,
        newBadges,
        showBadgeNotification,
        dismissBadgeNotification
    };
};