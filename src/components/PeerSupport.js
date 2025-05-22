import React, { useState, useEffect } from 'react';
import { Users, MessageCircle, Send, ThumbsUp, Heart, UserPlus } from 'lucide-react';

const PeerSupport = ({ currentUser }) => {
    const [messages, setMessages] = useState([
        { id: 1, user: 'Ана', message: 'Денес имав тежок ден во училиште, но се чувствувам подобро откако разговарав со мама.', timestamp: '10:30', likes: 3 },
        { id: 2, user: 'Марко', message: 'Кој има совети за справување со анксиозност пред испити?', timestamp: '11:15', likes: 1 },
        { id: 3, user: 'Петра', message: 'Вчера пробав медитација за прв пат - препорачувам! 🧘‍♀️', timestamp: '14:20', likes: 5 }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('general');
    const [likedMessages, setLikedMessages] = useState(new Set());

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

    const sendMessage = () => {
        if (newMessage.trim()) {
            const message = {
                id: messages.length + 1,
                user: currentUser.name,
                message: newMessage,
                timestamp: new Date().toLocaleTimeString('mk-MK', { hour: '2-digit', minute: '2-digit' }),
                likes: 0,
                isOwn: true
            };
            setMessages(prev => [...prev, message]);
            setNewMessage('');
        }
    };

    const toggleLike = (messageId) => {
        const newLikedMessages = new Set(likedMessages);
        if (likedMessages.has(messageId)) {
            newLikedMessages.delete(messageId);
            setMessages(prev => prev.map(msg =>
                msg.id === messageId ? { ...msg, likes: msg.likes - 1 } : msg
            ));
        } else {
            newLikedMessages.add(messageId);
            setMessages(prev => prev.map(msg =>
                msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
            ));
        }
        setLikedMessages(newLikedMessages);
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
                                {supportGroups.find(g => g.id === selectedGroup)?.members} членови онлајн
                            </p>
                        </div>

                        {/* Messages */}
                        <div className="h-80 overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <div key={message.id} className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                        {message.user.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-sm text-gray-800">{message.user}</span>
                                            <span className="text-xs text-gray-500">{message.timestamp}</span>
                                            {message.isOwn && <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Вие</span>}
                                        </div>
                                        <p className="text-sm text-gray-700 mb-2">{message.message}</p>
                                        <button
                                            onClick={() => toggleLike(message.id)}
                                            className={`flex items-center gap-1 text-xs ${
                                                likedMessages.has(message.id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                                            } transition-colors`}
                                        >
                                            <Heart size={14} fill={likedMessages.has(message.id) ? 'currentColor' : 'none'} />
                                            {message.likes}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Message Input */}
                        <div className="border-t p-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Споделете ги вашите мисли..."
                                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                />
                                <button
                                    onClick={sendMessage}
                                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
                                >
                                    <Send size={16} />
                                    Испрати
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                </div>
            </div>
        </div>
    );
};
export default PeerSupport;