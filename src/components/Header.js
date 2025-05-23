import React from 'react';
import { Award } from 'lucide-react';
import logoSvg from './image.svg';

const Header = ({ currentUser }) => {
    return (
        <div className="bg-white shadow-sm border-b">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src={logoSvg}
                            alt="Мост Кон Себе Logo"
                            className="w-12 h-12 object-contain"
                        />
                        <h1 className="text-2xl font-bold text-gray-800">Мост Кон Себе</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Award className="text-yellow-500" size={20} />
                            <span className="font-semibold text-gray-700">{currentUser.points}</span>
                        </div>
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {currentUser.name.charAt(0)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;