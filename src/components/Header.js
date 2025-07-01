import React, { useState } from 'react';
import { Award, LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Header = ({ currentUser }) => {
    const { logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="bg-white shadow-sm border-b">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src="/image.svg"
                            alt="Мост Кон Себе Logo"
                            className="w-12 h-12 object-contain"
                        />
                        <h1 className="text-2xl font-bold text-gray-800">Мост Кон Себе</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Points display */}
                        <div className="flex items-center gap-2">
                            <Award className="text-yellow-500" size={20} />
                            <span className="font-semibold text-gray-700">
                                {currentUser?.points || 0}
                            </span>
                        </div>

                        {/* User menu */}
                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2 transition-colors"
                            >
                                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                    {currentUser?.name?.charAt(0) || 'U'}
                                </div>
                                <div className="text-left hidden sm:block">
                                    <div className="font-medium text-gray-800">
                                        {currentUser?.name || 'Корисник'}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Ниво {currentUser?.level || 1}
                                    </div>
                                </div>
                            </button>

                            {/* Dropdown menu */}
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                                    <div className="px-4 py-2 border-b">
                                        <div className="font-medium text-gray-800">
                                            {currentUser?.name || 'Корисник'}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {currentUser?.email}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setShowDropdown(false)}
                                        className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                                    >
                                        <User size={16} />
                                        Мојот профил
                                    </button>

                                    <button
                                        onClick={() => setShowDropdown(false)}
                                        className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                                    >
                                        <Settings size={16} />
                                        Поставки
                                    </button>

                                    <hr className="my-1" />

                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-red-600"
                                    >
                                        <LogOut size={16} />
                                        Одјави се
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Click outside to close dropdown */}
            {showDropdown && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowDropdown(false)}
                ></div>
            )}
        </div>
    );
};

export default Header;