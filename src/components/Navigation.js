import React from 'react';
import { Star, Shield, Users, BookOpen, Heart } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'dashboard', label: 'Почетна', icon: <Star size={20} /> },
        { id: 'stress', label: 'Стрес', icon: <Shield size={20} /> },
        { id: 'peers', label: 'Врски', icon: <Users size={20} /> },
        { id: 'education', label: 'Едукација', icon: <BookOpen size={20} /> },
        { id: 'resources', label: 'Помош', icon: <Heart size={20} /> }
    ];

    return (
        <div className="bg-white border-b">
            <div className="px-6">
                <div className="flex space-x-8 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors ${
                                activeTab === tab.id
                                    ? 'border-purple-500 text-purple-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            {tab.icon}
                            <span className="font-medium">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Navigation;