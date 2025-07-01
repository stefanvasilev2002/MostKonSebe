export const BADGES = {
    FIRST_CHECKIN: {
        id: 'first_checkin',
        name: 'Прв чекор',
        description: 'Направивте го првиот daily check-in',
        icon: '🎯',
        points: 10
    },
    WEEK_STREAK: {
        id: 'week_streak',
        name: 'Недела активност',
        description: '7 последователни дена активност',
        icon: '🔥',
        points: 50
    },
    MONTH_STREAK: {
        id: 'month_streak',
        name: 'Месечен маратон',
        description: '30 дена активност',
        icon: '👑',
        points: 200
    },
    PEER_SUPPORT: {
        id: 'peer_support',
        name: 'Помошна рака',
        description: 'Помогнавте на 10 врсници',
        icon: '🤝',
        points: 100
    },
    MEDITATION_MASTER: {
        id: 'meditation_master',
        name: 'Мајстор на медитација',
        description: '50 завршени вежби за дишење',
        icon: '🧘',
        points: 75
    },
    EDUCATION_ENTHUSIAST: {
        id: 'education_enthusiast',
        name: 'Жеден за знаење',
        description: 'Завршивте сите едукациски модули',
        icon: '📚',
        points: 150
    }
};

export const LEVELS = [
    { level: 1, name: 'Почетник', minPoints: 0, maxPoints: 99, color: 'gray' },
    { level: 2, name: 'Истражувач', minPoints: 100, maxPoints: 299, color: 'blue' },
    { level: 3, name: 'Напреден', minPoints: 300, maxPoints: 599, color: 'green' },
    { level: 4, name: 'Ментор', minPoints: 600, maxPoints: 999, color: 'purple' },
    { level: 5, name: 'Амбасадор', minPoints: 1000, maxPoints: 1999, color: 'orange' },
    { level: 6, name: 'Легенда', minPoints: 2000, maxPoints: Infinity, color: 'gold' }
];

export const calculateLevel = (points) => {
    return LEVELS.find(level => points >= level.minPoints && points <= level.maxPoints) || LEVELS[0];
};

export const checkForNewBadges = (userStats) => {
    const newBadges = [];

    if (userStats.checkInCount === 1 && !userStats.badges.includes('first_checkin')) {
        newBadges.push(BADGES.FIRST_CHECKIN);
    }

    if (userStats.streakDays >= 7 && !userStats.badges.includes('week_streak')) {
        newBadges.push(BADGES.WEEK_STREAK);
    }

    if (userStats.streakDays >= 30 && !userStats.badges.includes('month_streak')) {
        newBadges.push(BADGES.MONTH_STREAK);
    }

    if (userStats.breathingExercises >= 50 && !userStats.badges.includes('meditation_master')) {
        newBadges.push(BADGES.MEDITATION_MASTER);
    }

    return newBadges;
};