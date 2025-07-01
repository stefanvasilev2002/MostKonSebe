import React, { useState, useEffect } from 'react';
import { Heart, Zap, TrendingUp, Calendar, Bell, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Dashboard = ({ userProfile, onDailyCheckIn, notifications = [], onCompleteActivity }) => {
    const { user } = useAuth();
    const [selectedMood, setSelectedMood] = useState(null);
    const [currentQuote, setCurrentQuote] = useState('');

    const currentUser = userProfile || {
        name: user?.displayName || user?.email?.split('@')[0] || 'Корисник',
        age: 14,
        mood: 'neutral',
        streakDays: 0,
        points: 0,
        lastCheckIn: null,
        completedActivities: []
    };

    const motivationalQuotes = [
        "Секој ден е нова можност да бидеш подобра верзија од себе си.",
        "Твоето ментално здравје е приоритет. Твоето среќа е важна.",
        "Малите чекори секој ден водат до големи промени.",
        "Не си сам/а во овој пат. Секогаш има некој кој сака да помогне.",
        "Твоите чувства се валидни и важни."
    ];

    useEffect(() => {
        const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        setCurrentQuote(randomQuote);
    }, []);

    useEffect(() => {
        const today = new Date().toDateString();
        if (currentUser.lastCheckIn === today) {
            setSelectedMood(currentUser.mood);
        } else {
            setSelectedMood(null);
        }
    }, [currentUser.lastCheckIn, currentUser.mood]);

    const handleMoodSelection = (mood) => {
        const today = new Date().toDateString();

        if (currentUser.lastCheckIn === today) {
            return;
        }

        setSelectedMood(mood);
        if (onDailyCheckIn) {
            onDailyCheckIn(mood);
        }
    };

    const moodEmojis = [
        { emoji: '😊', label: 'Среќен/а', value: 'happy' },
        { emoji: '😐', label: 'Неутрален/а', value: 'neutral' },
        { emoji: '😢', label: 'Тажен/а', value: 'sad' },
        { emoji: '😴', label: 'Уморен/а', value: 'tired' },
        { emoji: '😡', label: 'Лут/а', value: 'angry' }
    ];

    const todayActivities = [
        { name: 'Медитација', points: 5, icon: '🧘' },
        { name: 'Физичка активност', points: 10, icon: '🏃' },
        { name: 'Читање', points: 5, icon: '📖' },
        { name: 'Дружење со пријатели', points: 8, icon: '👥' }
    ];

    const isActivityCompleted = (activityName) => {
        const today = new Date().toDateString();
        const activityKey = `${activityName}-${today}`;
        return currentUser.completedActivities?.includes(activityKey) || false;
    };

    const handleCompleteActivity = (activityName) => {
        if (isActivityCompleted(activityName)) {
            return;
        }

        if (onCompleteActivity) {
            onCompleteActivity(activityName);
        }
    };

    const isCheckInDone = () => {
        const today = new Date().toDateString();
        return currentUser.lastCheckIn === today;
    };

    return (
        <div className="p-6 space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">
                    Добредојде назад, {currentUser.name}! 👋
                </h2>
                <p className="text-purple-100 mb-4">Како се чувствуваш денес?</p>
                <div className="flex gap-4">
                    <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold">{currentUser.streakDays || 0}</div>
                        <div className="text-sm">дена редовна активност</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold">{currentUser.points || 0}</div>
                        <div className="text-sm">Поени</div>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            {notifications && notifications.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Bell className="text-blue-500" size={20} />
                        <h3 className="font-semibold text-blue-800">Известувања</h3>
                    </div>
                    {notifications.slice(0, 2).map((notification, index) => (
                        <div key={notification.id || index} className="text-sm text-blue-700 mb-1">
                            • {notification.message}
                        </div>
                    ))}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Daily Check-in */}
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <Heart className="text-red-500" size={24} />
                        <h3 className="font-semibold text-gray-800">Дневен Check-in</h3>
                        {isCheckInDone() && <CheckCircle className="text-green-500" size={20} />}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                        {isCheckInDone() ? 'Денешниот check-in е завршен!' : 'Како се чувствуваш денес?'}
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                        {moodEmojis.map((mood, index) => (
                            <button
                                key={index}
                                className={`text-2xl p-2 rounded-lg transition-all ${
                                    selectedMood === mood.value
                                        ? 'bg-purple-100 border-2 border-purple-300'
                                        : isCheckInDone()
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'hover:bg-gray-100 cursor-pointer'
                                }`}
                                onClick={() => handleMoodSelection(mood.value)}
                                title={mood.label}
                                disabled={isCheckInDone()}
                            >
                                {mood.emoji}
                            </button>
                        ))}
                    </div>
                    {selectedMood && (
                        <div className="mt-3 p-2 bg-green-50 rounded text-sm text-green-700">
                            {isCheckInDone() ? 'Благодариме за денешниот check-in! 💚' : 'Благодариме за споделувањето! 💚'}
                        </div>
                    )}
                </div>

                {/* Today's Activities */}
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <Zap className="text-yellow-500" size={24} />
                        <h3 className="font-semibold text-gray-800">Денешни активности</h3>
                    </div>
                    <div className="space-y-3">
                        {todayActivities.map((activity, index) => {
                            const completed = isActivityCompleted(activity.name);
                            return (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{activity.icon}</span>
                                        <span className={`text-sm ${completed ? 'text-gray-500 line-through' : 'text-gray-600'}`}>
                                            {activity.name}
                                        </span>
                                        {completed && <CheckCircle className="text-green-500" size={16} />}
                                    </div>
                                    <button
                                        onClick={() => handleCompleteActivity(activity.name)}
                                        disabled={completed}
                                        className={`text-xs px-3 py-1 rounded-full transition-colors ${
                                            completed
                                                ? 'bg-green-100 text-green-600 cursor-not-allowed'
                                                : 'bg-blue-100 hover:bg-blue-200 text-blue-600 cursor-pointer'
                                        }`}
                                    >
                                        {completed ? '✓ Завршено' : `+${activity.points} поени`}
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* Progress indicator */}
                    <div className="mt-4 pt-3 border-t">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>Дневен прогрес</span>
                            <span>{todayActivities.filter(activity => isActivityCompleted(activity.name)).length}/{todayActivities.length}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                                style={{
                                    width: `${(todayActivities.filter(activity => isActivityCompleted(activity.name)).length / todayActivities.length) * 100}%`
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* HBSC Facts */}
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-3">HBSC Факти за Македонија</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                        <strong>Дали знаевте?</strong> Според HBSC истражувањето, 68% од младите во Европа се чувствуваат поддржани од семејството.
                        Нашата цел е да ги подобриме овие бројки преку поддршка и едукација.
                    </p>
                </div>
            </div>

            {/* Daily Motivation */}
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-3">Мотивација за денес</h3>
                <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-lg">
                    <p className="text-gray-800 font-medium text-center">
                        "{currentQuote}" 💪
                    </p>
                </div>
            </div>

            {/* User Stats Display */}
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-3">Мој прогрес</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">{currentUser.level || 1}</div>
                        <div className="text-sm text-purple-800">Ниво</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <div className="text-xl font-bold text-yellow-600">{currentUser.points || 0}</div>
                        <div className="text-sm text-yellow-800">Поени</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">{currentUser.streakDays || 0}</div>
                        <div className="text-sm text-green-800">Активни дена</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">{currentUser.badges?.length || 0}</div>
                        <div className="text-sm text-blue-800">Значки</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;