import { useState, useEffect } from 'react';
import {
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    serverTimestamp,
    where,
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const useChat = (groupId) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!groupId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const messagesRef = collection(db, 'messages');

            let q;
            try {
                q = query(
                    messagesRef,
                    where('groupId', '==', groupId),
                    orderBy('timestamp', 'asc'),
                    limit(50)
                );
            } catch (queryError) {
                console.error('Error creating query:', queryError);
                q = query(
                    messagesRef,
                    where('groupId', '==', groupId),
                    limit(50)
                );
            }

            const unsubscribe = onSnapshot(
                q,
                (snapshot) => {
                    try {
                        const newMessages = snapshot.docs.map(doc => {
                            const data = doc.data();
                            return {
                                id: doc.id,
                                ...data,
                                timestamp: data.timestamp || new Date()
                            };
                        });

                        newMessages.sort((a, b) => {
                            const aTime = a.timestamp?.toDate ? a.timestamp.toDate() : new Date(a.timestamp);
                            const bTime = b.timestamp?.toDate ? b.timestamp.toDate() : new Date(b.timestamp);
                            return aTime - bTime;
                        });

                        setMessages(newMessages);
                        setLoading(false);
                    } catch (err) {
                        console.error('Error processing messages:', err);
                        setError(err.message);
                        setLoading(false);
                    }
                },
                (err) => {
                    console.error('Firestore onSnapshot error:', err);
                    setError(err.message);
                    setLoading(false);

                    setMessages([]);
                }
            );

            return () => {
                try {
                    unsubscribe();
                } catch (err) {
                    console.error('Error unsubscribing:', err);
                }
            };
        } catch (err) {
            console.error('Error setting up listener:', err);
            setError(err.message);
            setLoading(false);
        }
    }, [groupId]);

    const sendMessage = async (messageText, user) => {
        if (!messageText.trim() || !user) {
            console.warn('Cannot send empty message or user not provided');
            return;
        }

        try {
            const messageData = {
                text: messageText.trim(),
                userId: user.uid,
                userName: user.displayName || user.email?.split('@')[0] || 'Анонимен',
                groupId: groupId,
                timestamp: serverTimestamp(),
                likes: 0,
                likedBy: []
            };

            await addDoc(collection(db, 'messages'), messageData);
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    };

    const toggleLike = async (messageId, userId) => {
        if (!messageId || !userId) {
            console.warn('Message ID or User ID not provided');
            return;
        }

        try {
            const messageRef = doc(db, 'messages', messageId);
            const message = messages.find(m => m.id === messageId);

            if (!message) {
                console.warn('Message not found in local state');
                return;
            }

            const isLiked = message.likedBy?.includes(userId);

            if (isLiked) {
                await updateDoc(messageRef, {
                    likes: Math.max(0, (message.likes || 0) - 1),
                    likedBy: arrayRemove(userId)
                });
            } else {
                await updateDoc(messageRef, {
                    likes: (message.likes || 0) + 1,
                    likedBy: arrayUnion(userId)
                });
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    return { messages, loading, error, sendMessage, toggleLike };
};