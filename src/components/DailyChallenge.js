import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Star } from 'lucide-react';

const DailyChallenge = ({ onCompleteChallenge }) => {
    const [todayChallenge, setTodayChallenge] = useState(null);
    const [completed, setCompleted] = useState(false);

    const challenges = [
        {
            id: 'gratitude',
            title: 'Три работи за кои сум благодарен/а',
            description: 'Запишете три работи за кои се чувствувате благодарни денес',
            points: 15,
            icon: '🙏',
            type: 'reflection'
        },
        {
            id: 'kindness',
            title: 'Направи нешто добро',
            description: 'Направете мал добар дел за некого денес',
            points: 20,
            icon: '💝',
            type: 'action'
        },
        {
            id: 'movement',
            title: '10 минути движење',
            description: 'Направете физичка активност 10 минути',
            points: 25,
            icon: '🏃',
            type: 'physical'
        },
        {
            id: 'digital_detox',
            title: 'Дигитален детокс',
            description: '30 минути без социјални мрежи',
            points: 30,
            icon: '📵',
            type: 'mindfulness'
        },
        {
            id: 'creativity',
            title: 'Креативно време',
            description: 'Посветете време на креативна активност',
            points: 20,
            icon: '🎨',
            type: 'creative'
        }
    ];

    useEffect(() => {
        const today = new Date().getDay();
        const challenge = challenges[today % challenges.length];
        setTodayChallenge(challenge);

        const completedToday = localStorage.getItem(`challenge_${challenge.id}_${new Date().toDateString()}`);
        setCompleted(!!completedToday);
    }, []);

    const handleCompleteChallenge = () => {
        if (!todayChallenge || completed) return;

        setCompleted(true);
        localStorage.setItem(`challenge_${todayChallenge.id}_${new Date().toDateString()}`, 'true');
        onCompleteChallenge(todayChallenge);
    };

    if (!todayChallenge) return null;

    return (
        <div className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
                <Star className="text-yellow-500" size={24} />
                <h3 className="font-semibold text-gray-800">Дневен предизвик</h3>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <span className="text-3xl">{todayChallenge.icon}</span>
                    <div className="flex-1">
                        <h4 className="font-medium text-gray-800 mb-1">
                            {todayChallenge.title}
                        </h4>
                        <p className="text-sm text-gray-700 mb-3">
                            {todayChallenge.description}
                        </p>
                        <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-purple-600">
                +{todayChallenge.points} поени
              </span>
                            {completed ? (
                                <div className="flex items-center gap-1 text-green-600">
                                    <CheckCircle size={16} />
                                    <span className="text-sm font-medium">Завршено!</span>
                                </div>
                            ) : (
                                <button
                                    onClick={handleCompleteChallenge}
                                    className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-600 transition-colors"
                                >
                                    Заврши предизвик
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyChallenge;