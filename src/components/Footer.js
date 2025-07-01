import React from 'react';
import { Heart, Phone, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
    return (
        <div className="bg-white border-t">
            <div className="p-6">
                {/* Emergency Numbers */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <Phone className="text-red-500" size={20} />
                        <h3 className="font-semibold text-red-800">Итна помош</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                            <div className="font-bold text-red-800 text-lg">123</div>
                            <div className="text-red-600">Национална кризна линија</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-red-800 text-lg">194</div>
                            <div className="text-red-600">Итна медицинска помош</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-red-800 text-lg">070-234-567</div>
                            <div className="text-red-600">Линија за млади</div>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* About */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <Heart className="text-purple-500" size={20} />
                            За Мост Кон Себе
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                            Дигитална платформа за поддршка на менталното здравје на младите во Македонија,
                            базирана на HBSC истражувања и научни докази.
                        </p>
                        <div className="text-xs text-gray-500">
                            Верзија 1.1 • Јули 2025
                        </div>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Корисни линкови</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                                    <ExternalLink size={12} />
                                    HBSC Истражување
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                                    <ExternalLink size={12} />
                                    Министерство за здравство
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                                    <ExternalLink size={12} />
                                    СОС Детска линија
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                                    <ExternalLink size={12} />
                                    WHO Младинско здравје
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Контакт</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Mail size={16} />
                                <span>info@mostkonsebe.mk</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} />
                                <span>02-3456-789</span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h5 className="font-medium text-gray-700 mb-2">Следете не</h5>
                            <div className="flex gap-3">
                                <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">📘</span>
                                <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">📷</span>
                                <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">🐦</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t pt-4">
                    <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
                        <div className="text-center md:text-left mb-2 md:mb-0">
                            <p>Изработено врз основа на HBSC податоци за подобрување на менталното здравје на младите во Македонија</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                            <a href="#" className="hover:text-gray-800">Приватност</a>
                            <a href="#" className="hover:text-gray-800">Услови</a>
                            <a href="#" className="hover:text-gray-800">Помош</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Footer;