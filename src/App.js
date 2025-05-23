import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import StressManagement from './components/StressManagement';
import PeerSupport from './components/PeerSupport';
import Education from './components/Education';
import Resources from './components/Resources';
import Footer from './components/Footer';
import { loadUserData, saveUserData } from './utils/storage';

const MostKonSebeApp = () => {
  const [currentUser, setCurrentUser] = useState({
    name: 'Марија',
    age: 14,
    mood: 'neutral',
    streakDays: 7,
    points: 350,
    lastCheckIn: null,
    completedActivities: []
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [dailyCheckIn, setDailyCheckIn] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'achievement', message: 'Честитки! Завршивте 7 последователни дена со активност!' },
    { id: 2, type: 'tip', message: 'Денешен совет: Пробајте 5-минутно длабоко дишење' }
  ]);

  useEffect(() => {
    const savedData = loadUserData();
    if (savedData) {
      setCurrentUser(prev => ({ ...prev, ...savedData }));
    }
  }, []);

  useEffect(() => {
    saveUserData(currentUser);
  }, [currentUser]);

  const handleDailyCheckIn = (mood) => {
    const today = new Date().toDateString();
    const isNewDay = currentUser.lastCheckIn !== today;

    setDailyCheckIn(mood);
    setCurrentUser(prev => ({
      ...prev,
      mood: mood,
      lastCheckIn: today,
      streakDays: isNewDay ? prev.streakDays + 1 : prev.streakDays,
      points: isNewDay ? prev.points + 10 : prev.points
    }));

    if (isNewDay) {
      addNotification('success', 'Одлично! Добивте 10 поени за денешниот check-in!');
    }
  };

  const addNotification = (type, message) => {
    const newNotification = {
      id: Date.now(),
      type,
      message,
      timestamp: new Date()
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
  };

  const completeActivity = (activityName) => {
    const today = new Date().toDateString();
    const activityKey = `${activityName}-${today}`;

    if (!currentUser.completedActivities.includes(activityKey)) {
      setCurrentUser(prev => ({
        ...prev,
        completedActivities: [...prev.completedActivities, activityKey],
        points: prev.points + 5
      }));
      addNotification('success', `Одлично! Завршивте: ${activityName} (+5 поени)`);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
            <Dashboard
                currentUser={currentUser}
                dailyCheckIn={dailyCheckIn}
                onDailyCheckIn={handleDailyCheckIn}
                notifications={notifications}
                onCompleteActivity={completeActivity}
            />
        );
      case 'stress':
        return <StressManagement onCompleteActivity={completeActivity} />;
      case 'peers':
        return <PeerSupport currentUser={currentUser} />;
      case 'education':
        return <Education />;
      case 'resources':
        return <Resources />;
      default:
        return <Dashboard />;
    }
  };

  return (
      <div className="max-w-4xl mx-auto bg-gray-50 min-h-screen">
        <Header currentUser={currentUser} />
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="bg-gray-50">
          {renderActiveTab()}
        </div>
        <Footer />
      </div>
  );
};

export default MostKonSebeApp;