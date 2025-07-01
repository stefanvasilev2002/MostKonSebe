import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import RealTimeChat from './RealTimeChat';

const ChatGroups = () => {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('general');

    useEffect(() => {
        const groupsRef = collection(db, 'chatGroups');
        const q = query(groupsRef);

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const groupsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setGroups(groupsData);
        });

        return () => unsubscribe();
    }, []);

    const defaultGroups = [
        { id: 'general', name: 'Општо разговарање', members: 0, color: 'blue' },
        { id: 'school-stress', name: 'Стрес од училиште', members: 0, color: 'red' },
        { id: 'social-anxiety', name: 'Социјална анксиозност', members: 0, color: 'purple' },
        { id: 'healthy-habits', name: 'Здрави навики', members: 0, color: 'green' }
    ];

    const allGroups = groups.length > 0 ? groups : defaultGroups;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold mb-4">Групи за разговор</h3>
                    <div className="space-y-3">
                        {allGroups.map((group) => (
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
                                <p className="text-xs text-gray-600">
                                    {group.members || 0} активни членови
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2">
                <RealTimeChat groupId={selectedGroup} />
            </div>
        </div>
    );
};

export default ChatGroups;