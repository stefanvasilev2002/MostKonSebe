import React, { useState, useRef, useEffect } from 'react';
import { Send, Heart } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { useAuth } from '../hooks/useAuth';

const RealTimeChat = ({ groupId }) => {
    const { user } = useAuth();
    const [newMessage, setNewMessage] = useState('');
    const { messages, loading, sendMessage } = useChat(groupId, user);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        await sendMessage(newMessage);
        setNewMessage('');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white border rounded-lg shadow-sm">
            <div className="border-b p-4">
                <h3 className="font-semibold text-gray-800">Live Chat</h3>
                <p className="text-sm text-gray-600">{messages.length} пораки</p>
            </div>

            <div className="h-80 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {message.userName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm text-gray-800">
                  {message.userName}
                </span>
                                <span className="text-xs text-gray-500">
                  {message.timestamp?.toDate().toLocaleTimeString('mk-MK', {
                      hour: '2-digit',
                      minute: '2-digit'
                  })}
                </span>
                                {message.userId === user?.uid && (
                                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    Вие
                  </span>
                                )}
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{message.text}</p>
                            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors">
                                <Heart size={14} />
                                {message.likes || 0}
                            </button>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="border-t p-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Напишете порака..."
                        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={16} />
                        Испрати
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RealTimeChat;