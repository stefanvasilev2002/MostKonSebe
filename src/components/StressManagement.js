import React, { useState, useEffect } from 'react';
import { Moon, BookOpen, Play, Pause, RotateCcw, Timer } from 'lucide-react';

const StressManagement = ({ onCompleteActivity }) => {
    const [breathingActive, setBreathingActive] = useState(false);
    const [breathingPhase, setBreathingPhase] = useState('inhale'); // inhale, hold, exhale
    const [breathingTimer, setBreathingTimer] = useState(0);
    const [pomodoroTimer, setPomodoroTimer] = useState(25 * 60); // 25 minutes
    const [pomodoroActive, setPomodoroActive] = useState(false);
    const [pomodoroMode, setPomodoroMode] = useState('work'); // work, break

    // Breathing exercise timer
    useEffect(() => {
        let interval;
        if (breathingActive) {
            interval = setInterval(() => {
                setBreathingTimer(prev => {
                    if (breathingPhase === 'inhale' && prev >= 4) {
                        setBreathingPhase('hold');
                        return 0;
                    } else if (breathingPhase === 'hold' && prev >= 7) {
                        setBreathingPhase('exhale');
                        return 0;
                    } else if (breathingPhase === 'exhale' && prev >= 8) {
                        setBreathingPhase('inhale');
                        return 0;
                    }
                    return prev + 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [breathingActive, breathingPhase]);

    // Pomodoro timer
    useEffect(() => {
        let interval;
        if (pomodoroActive && pomodoroTimer > 0) {
            interval = setInterval(() => {
                setPomodoroTimer(prev => prev - 1);
            }, 1000);
        } else if (pomodoroTimer === 0 && pomodoroActive) {
            // Timer finished
            if (pomodoroMode === 'work') {
                setPomodoroMode('break');
                setPomodoroTimer(5 * 60); // 5 minute break
                onCompleteActivity('Pomodoro сесија');
            } else {
                setPomodoroMode('work');
                setPomodoroTimer(25 * 60); // 25 minute work
            }
        }
        return () => clearInterval(interval);
    }, [pomodoroActive, pomodoroTimer, pomodoroMode, onCompleteActivity]);

    const startBreathing = () => {
        setBreathingActive(true);
        setBreathingPhase('inhale');
        setBreathingTimer(0);
    };

    const stopBreathing = () => {
        setBreathingActive(false);
        onCompleteActivity('Вежба за дишење');
    };

    const resetPomodoro = () => {
        setPomodoroActive(false);
        setPomodoroTimer(25 * 60);
        setPomodoroMode('work');
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getBreathingInstruction = () => {
        switch (breathingPhase) {
            case 'inhale':
                return `Вдишувај... ${breathingTimer}/4`;
            case 'hold':
                return `Задржи... ${breathingTimer}/7`;
            case 'exhale':
                return `Издишувај... ${breathingTimer}/8`;
            default:
                return 'Подготви се...';
        }
    };

    const stressTips = [
        {
            title: "Препознај го стресот",
            description: "Физички знаци: главоболка, напнатост во мускулите, проблеми со спиењето",
            color: "red"
        },
        {
            title: "Дишење техники",
            description: "4-7-8 техниката може да те смири за само неколку минути",
            color: "blue"
        },
        {
            title: "Физичка активност",
            description: "10 минути прошетка може значително да го намали стресот",
            color: "green"
        },
        {
            title: "Разговарај",
            description: "Споделувањето на проблемите со доверлива личност помага",
            color: "purple"
        }
    ];

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Управување со стрес</h2>

            {/* Warning about school stress */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">⚠️ Препознај ги сигналите</h3>
                <p className="text-red-700 text-sm">
                    Според HBSC податоците, притисокот во училиштето се зголемува, особено кај девојчињата.
                    Ако се чувствуваш преоптоварено, не си сам/а!
                </p>
            </div>

            {/* Interactive Breathing Exercise */}
            <div className="bg-white border rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4">🫁 Интерактивна вежба за дишење</h3>
                <div className="text-center">
                    <div className={`text-8xl mb-4 transition-all duration-1000 ${
                        breathingActive && breathingPhase === 'inhale' ? 'scale-125' :
                            breathingActive && breathingPhase === 'exhale' ? 'scale-75' : 'scale-100'
                    }`}>
                        🫁
                    </div>
                    <p className="text-xl text-blue-800 mb-4 font-medium">
                        {breathingActive ? getBreathingInstruction() : 'Вдишај за 4, задржи за 7, издишај за 8'}
                    </p>
                    <div className="flex gap-4 justify-center">
                        {!breathingActive ? (
                            <button
                                onClick={startBreathing}
                                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                            >
                                <Play size={20} />
                                Започни вежба
                            </button>
                        ) : (
                            <button
                                onClick={stopBreathing}
                                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                            >
                                <Pause size={20} />
                                Заврши вежба
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Pomodoro Timer */}
            <div className="bg-white border rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4">🍅 Pomodoro техника</h3>
                <div className="text-center">
                    <div className="text-6xl mb-4">
                        {formatTime(pomodoroTimer)}
                    </div>
                    <p className="text-lg mb-4 capitalize">
                        {pomodoroMode === 'work' ? '💼 Време за работа' : '☕ Време за пауза'}
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => setPomodoroActive(!pomodoroActive)}
                            className={`px-6 py-2 rounded-lg text-white flex items-center gap-2 ${
                                pomodoroActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                            }`}
                        >
                            {pomodoroActive ? <Pause size={20} /> : <Play size={20} />}
                            {pomodoroActive ? 'Пауза' : 'Почни'}
                        </button>
                        <button
                            onClick={resetPomodoro}
                            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2"
                        >
                            <RotateCcw size={20} />
                            Ресетирај
                        </button>
                    </div>
                </div>
            </div>

            {/* Stress Management Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stressTips.map((tip, index) => (
                    <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
                        <h4 className={`font-semibold mb-2 text-${tip.color}-800`}>{tip.title}</h4>
                        <p className={`text-sm text-${tip.color}-700`}>{tip.description}</p>
                    </div>
                ))}
            </div>

            {/* Relaxation Techniques */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <Moon className="text-blue-500" size={24} />
                        <h3 className="font-semibold">Техники за релаксација</h3>
                    </div>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span className="text-sm">4-7-8 техника на дишење</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span className="text-sm">Прогресивна мускулна релаксација</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span className="text-sm">Медитација со водич</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span className="text-sm">Визуелизација</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white border rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <BookOpen className="text-green-500" size={24} />
                        <h3 className="font-semibold">Управување со време</h3>
                    </div>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span className="text-sm">Pomodoro техника (25 мин работа, 5 мин пауза)</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span className="text-sm">Приоритизирање на задачи</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span className="text-sm">Планирање на редовни паузи</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span className="text-sm">Избегнување на мултитаскинг</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Quick Stress Relief */}
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-3">⚡ Брза помош при стрес</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl mb-2">🌬️</div>
                        <p className="text-sm font-medium">Длабоко дишење</p>
                        <p className="text-xs text-gray-600">5 длабоки вдишки</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-3xl mb-2">🚶</div>
                        <p className="text-sm font-medium">Кратка прошетка</p>
                        <p className="text-xs text-gray-600">10 минути надвор</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-3xl mb-2">🎵</div>
                        <p className="text-sm font-medium">Слушање музика</p>
                        <p className="text-xs text-gray-600">Омилена песна</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StressManagement;