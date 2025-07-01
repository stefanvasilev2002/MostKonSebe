import React from 'react';
import { X, Star } from 'lucide-react';

const BadgeNotification = ({ badges, onDismiss }) => {
    if (!badges || badges.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-50 bg-white border border-yellow-300 rounded-lg shadow-lg p-4 max-w-sm">
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Star className="text-yellow-500" size={20} />
                    <h3 className="font-semibold text-gray-800">Нова значка!</h3>
                </div>
                <button onClick={onDismiss} className="text-gray-400 hover:text-gray-600">
                    <X size={16} />
                </button>
            </div>

            {badges.map((badge, index) => (
                <div key={index} className="mb-3 last:mb-0">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{badge.icon}</span>
                        <div>
                            <h4 className="font-medium text-gray-800">{badge.name}</h4>
                            <p className="text-sm text-gray-600">{badge.description}</p>
                            <p className="text-xs text-yellow-600">+{badge.points} поени</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BadgeNotification;