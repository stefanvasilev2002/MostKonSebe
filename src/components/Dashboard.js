import React, { useState, useEffect } from 'react';
import { Heart, Zap, TrendingUp, Calendar, Bell } from 'lucide-react';

const Dashboard = ({ currentUser, dailyCheckIn, onDailyCheckIn, notifications, onCompleteActivity }) => {
    const [selectedMood, setSelectedMood] = useState(dailyCheckIn);
    const [currentQuote, setCurrentQuote] = useState('');

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

    const handleMoodSelection = (mood) => {
        setSelectedMood(mood);
        onDailyCheckIn(mood);
    };

    const moodEmojis = [
        { emoji: '😊', label: 'Среќен/а', value: 'happy' },
        { emoji: '😐', label: 'Неутрален/а', value: 'neutral' },
        { emoji: '😢', label: 'Тажен/а', value: 'sad' },
        { emoji: '😴', label: 'Уморен/а', value: 'tired' },
        { emoji: '😡', label: 'Лут/а', value: 'angry' }
    ];

    const todayActivities = [
        { name: 'Медитација', completed: false, points: 5 },
        { name: 'Физичка активност', completed: false, points: 10 },
        { name: 'Читање', completed: false, points: 5 },
        { name: 'Дружење со пријатели', completed: false, points: 8 }
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Добредојде назад, {currentUser.name}! 👋</h2>
                <p className="text-purple-100 mb-4">Како се чувствуваш денес?</p>
                <div className="flex gap-4">
                    <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold">{currentUser.streakDays}</div>
                        <div className="text-sm">Дена подред</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold">{currentUser.points}</div>
                        <div className="text-sm">Поени</div>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            {notifications.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Bell className="text-blue-500" size={20} />
                        <h3 className="font-semibold text-blue-800">Известувања</h3>
                    </div>
                    {notifications.slice(0, 2).map((notification) => (
                        <div key={notification.id} className="text-sm text-blue-700 mb-1">
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
                    </div>
                    <p className="text-gray-600 text-sm mb-3">Како се чувствуваш денес?</p>
                    <div className="grid grid-cols-5 gap-2">
                        {moodEmojis.map((mood, index) => (
                            <button
                                key={index}
                                className={`text-2xl p-2 rounded-lg transition-all ${
                                    selectedMood === mood.value
                                        ? 'bg-purple-100 border-2 border-purple-300'
                                        : 'hover:bg-gray-100'
                                }`}
                                onClick={() => handleMoodSelection(mood.value)}
                                title={mood.label}
                            >
                                {mood.emoji}
                            </button>
                        ))}
                    </div>
                    {selectedMood && (
                        <div className="mt-3 p-2 bg-green-50 rounded text-sm text-green-700">
                            Благодариме за споделувањето! 💚
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
                        {todayActivities.map((activity, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">{activity.name}</span>
                                <button
                                    onClick={() => onCompleteActivity(activity.name)}
                                    className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-1 rounded-full transition-colors"
                                >
                                    +{activity.points} поени
                                </button>
                            </div>
                        ))}
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
        </div>
    );
};

export default Dashboard;