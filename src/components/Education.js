import React, { useState } from 'react';
import { Brain, AlertTriangle, CheckCircle, BookOpen, Target } from 'lucide-react';

const Education = () => {
    const [completedModules, setCompletedModules] = useState(new Set());
    const [selectedModule, setSelectedModule] = useState(null);

    const hbscFindings = [
        {
            stat: '68%',
            description: 'од младите чувствуваат семејна поддршка',
            trend: 'down',
            explanation: 'Ова е значително намалување од 2018 година'
        },
        {
            stat: '↑',
            description: 'Притисок во училиште се зголемува',
            trend: 'up',
            explanation: 'Особено кај девојчињата, зголемувањето е драматично'
        },
        {
            stat: '32%',
            description: 'пријавуваат чести тажни чувства',
            trend: 'up',
            explanation: 'Ова влијае на секојдневното функционирање'
        },
        {
            stat: '25%',
            description: 'имаат проблеми со спиење',
            trend: 'up',
            explanation: 'Недостатокот на сон влијае на менталното здравје'
        }
    ];

    const educationModules = [
        {
            id: 'mental-health-basics',
            title: 'Основи на менталното здравје',
            duration: '10 мин',
            level: 'Почетно',
            content: {
                sections: [
                    {
                        title: 'Што е ментално здравје?',
                        content: 'Менталното здравје вклучува емоционално, психолошко и социјално благосостојство. Тоа влијае на тоа како мислиме, чувствуваме и постапуваме.'
                    },
                    {
                        title: 'Зошто е важно?',
                        content: 'Доброто ментално здравје ни помага да се справиме со стресот, да се поврзуваме со другите и да донесуваме здрави одлуки.'
                    }
                ]
            }
        },
        {
            id: 'stress-recognition',
            title: 'Препознавање на стресот',
            duration: '8 мин',
            level: 'Почетно',
            content: {
                sections: [
                    {
                        title: 'Физички знаци',
                        content: 'Главоболка, напнатост во мускулите, проблеми со желудникот, промени во апетитот'
                    },
                    {
                        title: 'Емоционални знаци',
                        content: 'Лутина, раздразливост, анксиозност, депресија, чувство на преоптовареност'
                    }
                ]
            }
        },
        {
            id: 'coping-strategies',
            title: 'Стратегии за справување',
            duration: '15 мин',
            level: 'Средно',
            content: {
                sections: [
                    {
                        title: 'Здрави механизми',
                        content: 'Физичка активност, медитација, разговор со доверлива личност, креативни активности'
                    },
                    {
                        title: 'Што да избегнувате',
                        content: 'Изолација, злоупотреба на супстанции, негирање на проблемот'
                    }
                ]
            }
        }
    ];

    const completeModule = (moduleId) => {
        setCompletedModules(prev => new Set([...prev, moduleId]));
    };

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Едукација за ментално здравје</h2>

            {/* HBSC Statistics */}
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4">📊 HBSC Наоди за Македонија</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {hbscFindings.map((finding, index) => (
                        <div key={index} className={`p-4 rounded-lg text-center ${
                            finding.trend === 'up' ? 'bg-red-50 border border-red-200' :
                                finding.trend === 'down' ? 'bg-orange-50 border border-orange-200' :
                                    'bg-blue-50 border border-blue-200'
                        }`}>
                            <div className={`text-3xl font-bold mb-2 ${
                                finding.trend === 'up' ? 'text-red-600' :
                                    finding.trend === 'down' ? 'text-orange-600' :
                                        'text-blue-600'
                            }`}>
                                {finding.stat}
                            </div>
                            <div className={`text-sm mb-2 ${
                                finding.trend === 'up' ? 'text-red-800' :
                                    finding.trend === 'down' ? 'text-orange-800' :
                                        'text-blue-800'
                            }`}>
                                {finding.description}
                            </div>
                            <div className="text-xs text-gray-600">
                                {finding.explanation}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Education Modules */}
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4">📚 Едукациски модули</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {educationModules.map((module) => (
                        <div key={module.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                                <h4 className="font-medium text-gray-800">{module.title}</h4>
                                {completedModules.has(module.id) && (
                                    <CheckCircle className="text-green-500" size={20} />
                                )}
                            </div>
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Target size={16} />
                                    <span>{module.level}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <BookOpen size={16} />
                                    <span>{module.duration}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedModule(module)}
                                className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
                            >
                                {completedModules.has(module.id) ? 'Прегледај повторно' : 'Започни модул'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Module Content Modal */}
            {selectedModule && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">{selectedModule.title}</h3>
                            <button
                                onClick={() => setSelectedModule(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="space-y-4">
                            {selectedModule.content.sections.map((section, index) => (
                                <div key={index}>
                                    <h4 className="font-semibold text-gray-800 mb-2">{section.title}</h4>
                                    <p className="text-gray-700 text-sm">{section.content}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex gap-4">
                            <button
                                onClick={() => {
                                    completeModule(selectedModule.id);
                                    setSelectedModule(null);
                                }}
                                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                            >
                                Заврши модул
                            </button>
                            <button
                                onClick={() => setSelectedModule(null)}
                                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                            >
                                Затвори
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Warning Signs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Brain className="text-blue-500" size={24} />
                        Што е ментално здравје?
                    </h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div>
                                <p className="font-medium">Емоционално благосостојство</p>
                                <p className="text-gray-600">Како се чувствувате и управувате со емоциите</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div>
                                <p className="font-medium">Социјални односи</p>
                                <p className="text-gray-600">Како се поврзувате со другите луѓе</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div>
                                <p className="font-medium">Справување со предизвици</p>
                                <p className="text-gray-600">Како се справувате со стресот и проблемите</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <AlertTriangle className="text-red-500" size={24} />
                        Сигнали за помош
                    </h3>
                    <div className="space-y-2">
                        <div className="bg-red-50 p-3 rounded-lg">
                            <p className="text-sm text-red-800">🚨 Ако се чувствувате безнадежно или имате мисли за самоповредување</p>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg">
                            <p className="text-sm text-orange-800">⚠️ Ако не можете да се справите со секојдневните активности</p>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-lg">
                            <p className="text-sm text-yellow-800">💛 Ако чувствувате константна тага или анксиозност</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
                            🆘 Потребна ми е помош СЕГА
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Education;