import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Leaderboard = () => {
    const [leaders, setLeaders] = useState([]);
    const [timeframe, setTimeframe] = useState('weekly');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaderboard();
    }, [timeframe]);

    const fetchLeaderboard = async () => {
        setLoading(true);
        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, orderBy('points', 'desc'), limit(10));
            const snapshot = await getDocs(q);

            const leaderboardData = snapshot.docs.map((doc, index) => ({
                id: doc.id,
                ...doc.data(),
                rank: index + 1
            }));

            setLeaders(leaderboardData);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1: return <Trophy className="text-yellow-500" size={20} />;
            case 2: return <Medal className="text-gray-400" size={20} />;
            case 3: return <Award className="text-orange-500" size={20} />;
            default: return <span className="w-5 text-center font-bold text-gray-600">{rank}</span>;
        }
    };

    if (loading) {
        return (
            <div className="bg-white border rounded-lg p-6 shadow-sm">
                <div className="animate-pulse space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-12 bg-gray-200 rounded"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">🏆 Табела на најдобри</h3>
                <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="text-sm border rounded-lg px-3 py-1"
                >
                    <option value="weekly">Оваа недела</option>
                    <option value="monthly">Овој месец</option>
                    <option value="alltime">Сите времиња</option>
                </select>
            </div>

            <div className="space-y-3">
                {leaders.map((leader) => (
                    <div key={leader.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center w-8">
                            {getRankIcon(leader.rank)}
                        </div>
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {leader.name?.charAt(0) || 'A'}
                        </div>
                        <div className="flex-1">
                            <div className="font-medium text-gray-800">
                                {leader.name || 'Анонимен корисник'}
                            </div>
                            <div className="text-sm text-gray-600">
                                Ниво {leader.level || 1} • {leader.streakDays || 0} дена активност
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-purple-600">{leader.points || 0}</div>
                            <div className="text-xs text-gray-500">поени</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                    💡 <strong>Совет:</strong> Редовните активности и помагањето на другите ќе ве качат на врвот!
                </p>
            </div>
        </div>
    );
};

export default Leaderboard;