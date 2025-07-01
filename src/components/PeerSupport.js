import React, { useState, useRef, useEffect } from 'react';
import { Users, MessageCircle, Send, Heart, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useChat } from '../hooks/useChat';

const PeerSupport = () => {
    const { user } = useAuth();
    const [selectedGroup, setSelectedGroup] = useState('general');
    const [newMessage, setNewMessage] = useState('');
    const [sendingMessage, setSendingMessage] = useState(false);
    const messagesEndRef = useRef(null);

    const { messages, loading, error, sendMessage, toggleLike } = useChat(selectedGroup);

    const supportGroups = [
        { id: 'general', name: 'Општо разговарање', members: 67, color: 'blue' },
        { id: 'school-stress', name: 'Стрес од училиште', members: 24, color: 'red' },
        { id: 'social-anxiety', name: 'Социјална анксиозност', members: 18, color: 'purple' },
        { id: 'healthy-habits', name: 'Здрави навики', members: 31, color: 'green' },
        { id: 'family-issues', name: 'Семејни проблеми', members: 15, color: 'orange' }
    ];

    const dailyQuestions = [
        "Што те прави среќен/а денес?",
        "Како се справуваш со стресот?",
        "Кој е твој омилен начин за релаксација?",
        "Што би им порачал/а на другите млади?",
        "Како се чувствуваш по завршување на училиште?"
    ];

    const [todaysQuestion] = useState(dailyQuestions[new Date().getDay() % dailyQuestions.length]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || sendingMessage) return;

        setSendingMessage(true);
        try {
            await sendMessage(newMessage, user);
            setNewMessage('');
        } catch (error) {
            console.error('Failed to send message:', error);
            alert('Неуспешно испраќање на порака. Пробајте повторно.');
        } finally {
            setSendingMessage(false);
        }
    };

    const handleLike = async (messageId) => {
        await toggleLike(messageId, user.uid);
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return '';

        try {
            const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
            return date.toLocaleTimeString('mk-MK', {
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (err) {
            return '';
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Врска со врсници</h2>

            {/* Importance of social support */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">💝 Важност на социјалната поддршка</h3>
                <p className="text-yellow-700 text-sm">
                    HBSC истражувањето покажува дека социјалната поддршка е клучна за менталното здравје на младите.
                    Споделувањето на искуства со врсници може значително да помогне.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Support Groups */}
                <div className="lg:col-span-1">
                    <div className="bg-white border rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Users className="text-purple-500" size={24} />
                            <h3 className="font-semibold">Групи за поддршка</h3>
                        </div>
                        <div className="space-y-3">
                            {supportGroups.map((group) => (
                                <button
                                    key={group.id}
                                    onClick={() => setSelectedGroup(group.id)}
                                    className={`w-full p-3 rounded-lg border text-left transition-colors ${
                                        selectedGroup === group.id
                                            ? `bg-${group.color}-50 border-${group.color}-200`
                                            : 'hover:bg-gray-50'
                                    }`}
                                >
                                    <h4 className="font-medium text-sm">{group.name}</h4>
                                    <p className="text-xs text-gray-600 flex items-center gap-1">
                                        <UserPlus size={12} />
                                        {group.members} активни членови
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Daily Question */}
                    <div className="bg-white border rounded-lg p-4 shadow-sm mt-4">
                        <h3 className="font-semibold text-gray-800 mb-3">🤔 Прашање за денес</h3>
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-blue-800 font-medium">{todaysQuestion}</p>
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="lg:col-span-2">
                    <div className="bg-white border rounded-lg shadow-sm">
                        {/* Chat Header */}
                        <div className="border-b p-4">
                            <h3 className="font-semibold text-gray-800">
                                {supportGroups.find(g => g.id === selectedGroup)?.name || 'Општо разговарање'}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {loading ? 'Се вчитува...' :
                                    error ? 'Грешка при вчитување' :
                                        `${messages.length} пораки`}
                            </p>
                        </div>

                        {/* Messages */}
                        <div className="h-80 overflow-y-auto p-4 space-y-4">
                            {error ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center text-red-500">
                                        <AlertCircle size={48} className="mx-auto mb-2 opacity-50" />
                                        <p>Грешка при вчитување на пораките</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Проверете ја интернет врската и пробајте повторно
                                        </p>
                                        <button
                                            onClick={() => window.location.reload()}
                                            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                                        >
                                            Освежи страница
                                        </button>
                                    </div>
                                </div>
                            ) : loading ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    <div className="text-center">
                                        <MessageCircle size={48} className="mx-auto mb-2 opacity-50" />
                                        <p>Нема пораки во оваа група.</p>
                                        <p className="text-sm">Бидете првиот кој ќе започне разговор!</p>
                                    </div>
                                </div>
                            ) : (
                                messages.map((message) => (
                                    <div key={message.id} className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                            {message.userName?.charAt(0) || 'A'}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-sm text-gray-800">
                                                    {message.userName || 'Анонимен'}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {formatTimestamp(message.timestamp)}
                                                </span>
                                                {message.userId === user?.uid && (
                                                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                                                        Вие
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-700 mb-2">{message.text}</p>
                                            <button
                                                onClick={() => handleLike(message.id)}
                                                className={`flex items-center gap-1 text-xs transition-colors ${
                                                    message.likedBy?.includes(user?.uid)
                                                        ? 'text-red-500'
                                                        : 'text-gray-500 hover:text-red-500'
                                                }`}
                                            >
                                                <Heart
                                                    size={14}
                                                    fill={message.likedBy?.includes(user?.uid) ? 'currentColor' : 'none'}
                                                />
                                                {message.likes || 0}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="border-t p-4">
                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Споделете ги вашите мисли..."
                                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                                    disabled={loading || sendingMessage || error}
                                />
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim() || loading || sendingMessage || error}
                                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={16} />
                                    {sendingMessage ? 'Испраќа...' : 'Испрати'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Instructions */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-800 mb-2">⚠️ Проблем со поврзувањето</h3>
                    <p className="text-red-700 text-sm mb-2">
                        Има проблем со поврзувањето на chat системот. Ова може да се случи ако:
                    </p>
                    <ul className="text-red-700 text-sm space-y-1 ml-4">
                        <li>• Firebase правилата не се правилно поставени</li>
                        <li>• Нема интернет врска</li>
                        <li>• Firestore базата е недостапна</li>
                    </ul>
                </div>
            )}

            {/* Anonymous Support */}
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                    <MessageCircle className="text-green-500" size={24} />
                    <h3 className="font-semibold">Анонимна поддршка</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-600 mb-4">
                            Безбедно место за споделување на твоите чувства и мисли без откривање на идентитетот.
                        </p>
                        <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                            Започни анонимен разговор
                        </button>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">Зошто анонимно?</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                            <li>• Потпална приватност</li>
                            <li>• Без страв од осудување</li>
                            <li>• Слободно изразување</li>
                            <li>• Професионална поддршка</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Real-time Status */}
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-3">📊 Статистики во живо</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{messages.length}</div>
                        <div className="text-sm text-blue-800">Пораки денес</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                            {supportGroups.find(g => g.id === selectedGroup)?.members || 0}
                        </div>
                        <div className="text-sm text-green-800">Активни членови</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                            {messages.reduce((sum, msg) => sum + (msg.likes || 0), 0)}
                        </div>
                        <div className="text-sm text-purple-800">Вкупно ❤️</div>
                    </div>
                </div>
            </div>

            {/* Motivational Messages */}
            <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-3">💪 Мотивирачки пораки од врсници</h3>
                <div className="space-y-3">
                    <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-3 rounded-lg">
                        <p className="text-gray-800 text-sm italic">
                            "Секој ден е нова можност да бидеш подобра верзија од себе си. Не се предавај!" - Ана, 15 години
                        </p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-3 rounded-lg">
                        <p className="text-gray-800 text-sm italic">
                            "Разговарањето со пријатели ми помага повеќе од било што друго. Не бидете сами!" - Марко, 14 години
                        </p>
                    </div>
                    <div className="bg-gradient-to-r from-green-100 to-teal-100 p-3 rounded-lg">
                        <p className="text-gray-800 text-sm italic">
                            "Сподели го тоа што те мачи - ќе се изненадиш колку луѓе разбираат." - Петра, 16 години
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PeerSupport;