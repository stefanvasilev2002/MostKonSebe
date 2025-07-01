import React from 'react';
import { Award, TrendingUp, Calendar } from 'lucide-react';
import { BADGES, LEVELS } from '../utils/gamification';

const UserProfile = ({ user, userStats }) => {
    const currentLevel = LEVELS.find(level =>
        userStats.points >= level.minPoints && userStats.points <= level.maxPoints
    ) || LEVELS[0];

    const nextLevel = LEVELS.find(level => level.level === currentLevel.level + 1);
    const progressToNext = nextLevel ?
        ((userStats.points - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100 : 100;

    const earnedBadges = userStats.badges?.map(badgeId =>
        Object.values(BADGES).find(badge => badge.id === badgeId)
    ).filter(Boolean) || [];

    return (
        <div className="bg-white border rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {user.name?.charAt(0) || user.email?.charAt(0)}
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{user.name || user.email}</h2>
                    <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${currentLevel.color}-100 text-${currentLevel.color}-800`}>
              {currentLevel.name}
            </span>
                        <span className="text-sm text-gray-600">Ниво {currentLevel.level}</span>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Прогрес до следно ниво</span>
                    <span>{userStats.points} / {nextLevel?.minPoints || '∞'} поени</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className={`bg-${currentLevel.color}-500 h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${Math.min(progressToNext, 100)}%` }}
                    ></div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{userStats.streakDays}</div>
                    <div className="text-sm text-gray-600">Дена активност</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{userStats.points}</div>
                    <div className="text-sm text-gray-600">Вкупно поени</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{earnedBadges.length}</div>
                    <div className="text-sm text-gray-600">Значки</div>
                </div>
            </div>

            {/* Badges */}
            <div>
                <h3 className="font-semibold text-gray-800 mb-3">Освоени значки</h3>
                {earnedBadges.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {earnedBadges.map((badge, index) => (
                            <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                                <div className="text-2xl mb-1">{badge.icon}</div>
                                <div className="text-xs font-medium text-gray-800">{badge.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-600">Започнете со активности за да освоите значки!</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;