import React, { useState } from 'react';
import { Phone, MapPin, Clock, ExternalLink, Download, Star } from 'lucide-react';

const Resources = () => {
    const [selectedCategory, setSelectedCategory] = useState('crisis');

    const crisisLines = [
        {
            name: 'Национална линија за кризи',
            phone: '198',
            description: '24/7 психолошка поддршка и кризна интервенција',
            availability: '24/7',
            free: true,
            color: 'red'
        },
        {
            name: 'Линија за млади "Младиска"',
            phone: '070-234-567',
            description: 'Специјализирана поддршка за млади 11-18 години',
            availability: 'Пон-Пет, 09:00-21:00',
            free: true,
            color: 'blue'
        },
        {
            name: 'Семејно советување',
            phone: '02-3245-678',
            description: 'Поддршка за семејни проблеми и конфликти',
            availability: 'Пон-Пет, 08:00-16:00',
            free: false,
            color: 'green'
        }
    ];

    const mentalHealthCenters = [
        {
            name: 'Центар за ментално здравје - Скопје',
            address: 'ул. 11 Октомври бр. 53, Скопје',
            phone: '02-3147-147',
            services: ['Психолошко советување', 'Психијатриска помош', 'Групна терапија'],
            ageGroup: '12-18 години'
        },
        {
            name: 'Младински центар "Подршка"',
            address: 'ул. Македонија бр. 25, Скопје',
            phone: '070-555-123',
            services: ['Peer советување', 'Работилници', 'Индивидуални разговори'],
            ageGroup: '13-19 години'
        }
    ];

    const parentResources = [
        {
            title: 'Како да препознаете знаци на проблем',
            description: 'Практичен водич за родители за препознавање на ментални здравствени проблеми',
            type: 'PDF водич',
            downloadable: true
        },
        {
            title: 'Комуникација со тинејџери',
            description: 'Техники за подобрување на комуникацијата со адолесценти',
            type: 'Видео серија',
            downloadable: false
        },
        {
            title: 'Создавање поддржувачка средина',
            description: 'Како да создадете поддржувачка средина дома и во училиште',
            type: 'Интерактивен курс',
            downloadable: false
        }
    ];

    const apps = [
        {
            name: 'Calm',
            description: 'Медитација и релаксација',
            rating: 4.8,
            free: false,
            features: ['Guided meditation', 'Sleep stories', 'Breathing exercises']
        },
        {
            name: 'Headspace',
            description: 'Медитација за почетници',
            rating: 4.7,
            free: false,
            features: ['Beginner courses', 'Sleep sounds', 'Focus music']
        },
        {
            name: 'Youper',
            description: 'AI помошник за ментално здравје',
            rating: 4.5,
            free: true,
            features: ['Mood tracking', 'Personalized tips', 'Progress insights']
        }
    ];

    const categories = [
        { id: 'crisis', label: 'Кризна помош', icon: '🚨' },
        { id: 'centers', label: 'Центри за помош', icon: '🏥' },
        { id: 'parents', label: 'За родители', icon: '👨‍👩‍👧‍👦' },
        { id: 'apps', label: 'Апликации', icon: '📱' }
    ];

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ресурси и помош</h2>

            {/* Category Navigation */}
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                selectedCategory === category.id
                                    ? 'bg-purple-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <span>{category.icon}</span>
                            <span className="font-medium">{category.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Crisis Lines */}
            {selectedCategory === 'crisis' && (
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800">🚨 Бесплатни линии за помош во Македонија</h3>
                    {crisisLines.map((line, index) => (
                        <div key={index} className={`bg-white border rounded-lg p-4 shadow-sm border-l-4 border-${line.color}-500`}>
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <h4 className={`font-medium text-${line.color}-800 text-lg`}>{line.name}</h4>
                                    <p className="text-sm text-gray-600 mb-2">{line.description}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <Clock size={16} />
                                            <span>{line.availability}</span>
                                        </div>
                                        {line.free && (
                                            <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
                        БЕСПЛАТНО
                      </span>
                                        )}
                                    </div>
                                </div>
                                <div className={`text-2xl font-bold text-${line.color}-800`}>
                                    {line.phone}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="font-semibold text-red-800 mb-2">⚠️ Важно да знаете</h4>
                        <ul className="text-sm text-red-700 space-y-1">
                            <li>• Сите повици се доверливи и анонимни</li>
                            <li>• Не се плашете да побарате помош</li>
                            <li>• Ако првиот разговор не помогна, пробајте повторно</li>
                            <li>• Во итни случаи, повикајте 194 (Итна помош)</li>
                        </ul>
                    </div>
                </div>
            )}

            {/* Mental Health Centers */}
            {selectedCategory === 'centers' && (
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800">🏥 Центри за ментalno здравје</h3>
                    {mentalHealthCenters.map((center, index) => (
                        <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
                            <h4 className="font-medium text-gray-800 text-lg mb-2">{center.name}</h4>
                            <div className="space-y-2 mb-4">
                                <div className="flex items-start gap-2">
                                    <MapPin className="text-gray-500 mt-1" size={16} />
                                    <span className="text-sm text-gray-600">{center.address}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="text-gray-500" size={16} />
                                    <span className="text-sm text-gray-600">{center.phone}</span>
                                </div>
                                <div className="text-sm text-blue-600 font-medium">
                                    Возрасна група: {center.ageGroup}
                                </div>
                            </div>
                            <div>
                                <h5 className="font-medium text-gray-700 mb-2">Услуги:</h5>
                                <div className="flex flex-wrap gap-2">
                                    {center.services.map((service, i) => (
                                        <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {service}
                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Parent Resources */}
            {selectedCategory === 'parents' && (
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800">👨‍👩‍👧‍👦 Ресурси за родители и наставници</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {parentResources.map((resource, index) => (
                            <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
                                <h4 className="font-medium text-gray-800 mb-2">{resource.title}</h4>
                                <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                                <div className="flex items-center justify-between">
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                    {resource.type}
                  </span>
                                    {resource.downloadable ? (
                                        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm">
                                            <Download size={16} />
                                            Преземи
                                        </button>
                                    ) : (
                                        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm">
                                            <ExternalLink size={16} />
                                            Отвори
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-800 mb-2">💡 Совети за родители</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                            <li>• Слушајте без осудување</li>
                            <li>• Бидете достапни за разговор</li>
                            <li>• Забележувајте промени во однесувањето</li>
                            <li>• Не се плашете да побарате професионална помош</li>
                            <li>• Покажете дека ги сакате безусловно</li>
                        </ul>
                    </div>
                </div>
            )}

            {/* Apps and Tools */}
            {selectedCategory === 'apps' && (
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800">📱 Корисни апликации и алатки</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {apps.map((app, index) => (
                            <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-gray-800">{app.name}</h4>
                                    <div className="flex items-center gap-1">
                                        <Star className="text-yellow-500" size={16} fill="currentColor" />
                                        <span className="text-sm text-gray-600">{app.rating}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">{app.description}</p>
                                <div className="space-y-2 mb-4">
                                    {app.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                            <span className="text-xs text-gray-600">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between">
                                    {app.free ? (
                                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
                      БЕСПЛАТНО
                    </span>
                                    ) : (
                                        <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs">
                      ПЛАТЕНО
                    </span>
                                    )}
                                    <button className="bg-blue-500 text-white px-4 py-1 rounded text-sm hover:bg-blue-600">
                                        Преземи
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">📲 Други корисни алатки</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="text-2xl mb-2">🧘‍♀️</div>
                                <p className="text-sm font-medium text-blue-800">Медитација</p>
                                <p className="text-xs text-blue-600">YouTube канали, Spotify плејлисти</p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl mb-2">📊</div>
                                <p className="text-sm font-medium text-blue-800">Следење на расположение</p>
                                <p className="text-xs text-blue-600">Дневници, mood tracker apps</p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl mb-2">💪</div>
                                <p className="text-sm font-medium text-blue-800">Физичка активност</p>
                                <p className="text-xs text-blue-600">Fitness apps, јога видеа</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Resources;