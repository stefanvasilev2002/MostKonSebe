import React, { useState, useEffect } from 'react';
import { Heart, Users, BookOpen, Shield, Star, ArrowRight, Play, CheckCircle } from 'lucide-react';

const LandingPage = ({ onOpenAuth }) => {
    const [currentStatIndex, setCurrentStatIndex] = useState(0);
    const [isVisible, setIsVisible] = useState({});

    const hbscStats = [
        { number: '68%', text: 'од младите чувствуваат семејна поддршка', trend: 'down' },
        { number: '32%', text: 'пријавуваат чести тажни чувства', trend: 'up' },
        { number: '25%', text: 'имаат проблеми со спиење', trend: 'up' },
        { number: '↑', text: 'Притисок во училиште се зголемува', trend: 'up' }
    ];

    const features = [
        {
            icon: <Heart className="text-pink-500" size={32} />,
            title: 'Дневно следење на расположение',
            description: 'Следете го вашето ментално здравје со едноставни дневни check-in-ови и добивајте персонализирани совети.'
        },
        {
            icon: <Users className="text-blue-500" size={32} />,
            title: 'Врска со врсници',
            description: 'Поврзете се со други млади, споделете искуства и најдете поддршка во безбедна средина.'
        },
        {
            icon: <BookOpen className="text-green-500" size={32} />,
            title: 'Едукациски содржини',
            description: 'Научете повеќе за менталното здравје преку интерактивни модули базирани на HBSC истражувања.'
        },
        {
            icon: <Shield className="text-purple-500" size={32} />,
            title: 'Техники за справување',
            description: 'Откријте ефективни техники за управување со стрес, анксиозност и секојдневни предизвици.'
        }
    ];

    const testimonials = [
        {
            text: "Оваа платформа ми помогна да се чувствувам помалку сам. Знаевањето дека други млади поминуваат низ слични предизвици ме прави да се чувствувам разбран.",
            author: "Ана, 15 години",
            location: "Скопје"
        },
        {
            text: "Техниките за дишење и медитација што ги научив овде стварно ми помагаат кога се чувствувам преоптоварен со училишните обврски.",
            author: "Марко, 16 години",
            location: "Битола"
        },
        {
            text: "Сакам што можам да ги следам моите емоции и да видам како се подобрувам со времето. Тоа ме мотивира да продолжам да работам на себе си.",
            author: "Петра, 14 години",
            location: "Охрид"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStatIndex((prev) => (prev + 1) % hbscStats.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('[data-animate]').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative max-w-6xl mx-auto px-6 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-white space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                                    Мост кон <span className="text-yellow-300">себе</span>
                                </h1>
                                <p className="text-xl lg:text-2xl text-blue-100 font-medium">
                                    Платформа за поддршка на менталното здравје на младите во Македонија
                                </p>
                            </div>

                            <p className="text-lg text-blue-50 leading-relaxed">
                                Базирана на HBSC истражувања и научни докази, нашата платформа ви помага да се поврзете со врсници,
                                да научите техники за справување и да го подобрите вашето ментално благосостојба.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={onOpenAuth}
                                    className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                                >
                                    Започни сега
                                    <ArrowRight size={20} />
                                </button>
                                <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                                    <Play size={20} />
                                    Видео презентација
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
                                <img
                                    src="/image.svg"
                                    alt="Мост Кон Себе Logo"
                                    className="w-full max-w-sm mx-auto mb-6"
                                />
                                <div className="text-center text-white">
                                    <h3 className="text-2xl font-bold mb-4">HBSC Истражување - Македонија</h3>
                                    <div className="bg-white bg-opacity-20 rounded-lg p-6 transition-all duration-500">
                                        <div className={`text-4xl font-bold mb-2 ${
                                            hbscStats[currentStatIndex].trend === 'up' ? 'text-red-300' : 'text-orange-300'
                                        }`}>
                                            {hbscStats[currentStatIndex].number}
                                        </div>
                                        <p className="text-sm">{hbscStats[currentStatIndex].text}</p>
                                    </div>
                                    <div className="flex justify-center gap-2 mt-4">
                                        {hbscStats.map((_, index) => (
                                            <div
                                                key={index}
                                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                    index === currentStatIndex ? 'bg-yellow-300' : 'bg-white bg-opacity-30'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div
                        id="features"
                        data-animate
                        className={`text-center mb-16 transition-all duration-1000 ${
                            isVisible.features ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                        }`}
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            Како ви помагаме?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Нашата платформа нуди комплетна поддршка прилагодена на потребите на младите во Македонија
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 ${
                                    isVisible.features ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                                }`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* HBSC Data Insights */}
            <div className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div
                        id="data"
                        data-animate
                        className={`text-center mb-16 transition-all duration-1000 ${
                            isVisible.data ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                        }`}
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            Базирано на научни докази
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            HBSC (Health Behaviour in School-aged Children) е најголемото европско истражување
                            за здравјето на младите, во кое учествува и Македонија
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {hbscStats.map((stat, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 ${
                                    isVisible.data ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                                }`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className={`text-3xl font-bold mb-2 ${
                                    stat.trend === 'up' ? 'text-red-500' : 'text-orange-500'
                                }`}>
                                    {stat.number}
                                </div>
                                <p className="text-sm text-gray-700">{stat.text}</p>
                                <div className={`mt-3 inline-flex items-center text-xs px-2 py-1 rounded-full ${
                                    stat.trend === 'up' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                                }`}>
                                    {stat.trend === 'up' ? '↑ Се зголемува' : '↓ Се намалува'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div
                        id="testimonials"
                        data-animate
                        className={`text-center mb-16 transition-all duration-1000 ${
                            isVisible.testimonials ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                        }`}
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            Што кажуваат младите?
                        </h2>
                        <p className="text-xl text-gray-600">
                            Реални искуства од млади кои ја користат нашата платформа
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className={`bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-500 ${
                                    isVisible.testimonials ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                                }`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                <div className="mb-6">
                                    <div className="flex text-yellow-400 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={20} fill="currentColor" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
                                </div>
                                <div className="border-t pt-4">
                                    <p className="font-semibold text-gray-800">{testimonial.author}</p>
                                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="py-20 bg-gradient-to-br from-purple-600 to-blue-600">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-white space-y-8">
                            <h2 className="text-4xl font-bold">
                                Зошто да ја изберете нашата платформа?
                            </h2>
                            <div className="space-y-6">
                                {[
                                    'Безбедна и доверлива средина за споделување',
                                    'Персонализирани препораки базирани на вашите потреби',
                                    'Поддршка 24/7 од стручни лица',
                                    'Интерактивни алатки за подобрување на менталното здравје',
                                    'Врска со заедница од врсници'
                                ].map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <CheckCircle className="text-green-400 flex-shrink-0" size={24} />
                                        <span className="text-lg">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
                            <div className="text-center text-white space-y-6">
                                <h3 className="text-2xl font-bold">Започнете денес</h3>
                                <p className="text-blue-100">
                                    Приклучете се на илјадници млади кои веќе ја користат нашата платформа
                                    за подобрување на нивното ментално здравје и благосостојба.
                                </p>
                                <button
                                    onClick={onOpenAuth}
                                    className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    Регистрирај се бесплатно
                                </button>
                                <p className="text-xs text-blue-200">
                                    100% бесплатно • Без скриени трошоци • Откажете кога сакате
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer CTA */}
            <div className="py-16 bg-gray-900 text-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-4">
                        Готови сте да ја започнете вашата патека кон подобро ментално здравје?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Приклучете се на нас денес и откриј го вашиот потенцијал за среќа и благосостојба.
                    </p>
                    <button
                        onClick={onOpenAuth}
                        className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
                    >
                        Започни сега
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;