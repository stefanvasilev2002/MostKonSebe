import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import AuthModal from './components/Auth/AuthModal';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import StressManagement from './components/StressManagement';
import PeerSupport from './components/PeerSupport';
import Education from './components/Education';
import Resources from './components/Resources';
import Footer from './components/Footer';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from './firebase/config';

const MostKonSebeApp = () => {
  const { user, userProfile, loading, refreshUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user && userProfile) {
      const welcomeShown = sessionStorage.getItem('welcomeShown');
      if (!welcomeShown) {
        setNotifications([
          { id: 1, type: 'achievement', message: `Добредојде назад, ${userProfile.name || 'Корисник'}!` },
          { id: 2, type: 'tip', message: 'Денешен совет: Пробајте 5-минутно длабоко дишење' }
        ]);
        sessionStorage.setItem('welcomeShown', 'true');
      }
    }
  }, [user, userProfile]);

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Се вчитува...</p>
          </div>
        </div>
    );
  }

  if (!user) {
    return (
        <>
          <LandingPage onOpenAuth={() => setShowAuthModal(true)} />
          <AuthModal
              isOpen={showAuthModal}
              onClose={() => setShowAuthModal(false)}
          />
        </>
    );
  }

  const updateUserData = async (updates) => {
    if (!user) return;

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, updates);

      if (refreshUserProfile) {
        await refreshUserProfile();
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      addNotification('error', 'Грешка при зачувување на податоците');
    }
  };

  const handleDailyCheckIn = async (mood) => {
    const today = new Date().toDateString();
    const isNewDay = userProfile?.lastCheckIn !== today;

    const updates = {
      mood: mood,
      lastCheckIn: today
    };

    if (isNewDay) {
      updates.streakDays = increment(1);
      updates.points = increment(10);

      addNotification('success', 'Одлично! Добивте 10 поени за денешниот check-in!');
    } else {
      addNotification('info', 'Веќе направивте check-in денес!');
    }

    await updateUserData(updates);
  };

  const handleCompleteActivity = async (activityName) => {
    const today = new Date().toDateString();
    const activityKey = `${activityName}-${today}`;

    if (userProfile?.completedActivities?.includes(activityKey)) {
      addNotification('info', 'Оваа активност е веќе завршена денес!');
      return;
    }

    const updates = {
      completedActivities: [...(userProfile?.completedActivities || []), activityKey],
      points: increment(5)
    };

    await updateUserData(updates);
    addNotification('success', `Одлично! Завршивте: ${activityName} (+5 поени)`);
  };

  const addNotification = (type, message) => {
    const newNotification = {
      id: Date.now(),
      type,
      message,
      timestamp: new Date()
    };

    setNotifications(prev => {
      const updated = [newNotification, ...prev.slice(0, 4)];

      setTimeout(() => {
        setNotifications(current => current.filter(n => n.id !== newNotification.id));
      }, 5000);

      return updated;
    });
  };

  const removeNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const renderActiveTab = () => {
    const commonProps = {
      userProfile,
      onCompleteActivity: handleCompleteActivity
    };

    switch (activeTab) {
      case 'dashboard':
        return (
            <Dashboard
                {...commonProps}
                onDailyCheckIn={handleDailyCheckIn}
                notifications={notifications}
            />
        );
      case 'stress':
        return <StressManagement {...commonProps} />;
      case 'peers':
        return <PeerSupport {...commonProps} />;
      case 'education':
        return <Education {...commonProps} />;
      case 'resources':
        return <Resources {...commonProps} />;
      default:
        return <Dashboard {...commonProps} />;
    }
  };

  return (
      <div className="max-w-4xl mx-auto bg-gray-50 min-h-screen">
        <Header currentUser={userProfile} />
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Notifications Display */}
        {notifications.length > 0 && (
            <div className="fixed top-4 right-4 z-50 space-y-2">
              {notifications.slice(0, 3).map((notification) => (
                  <div
                      key={notification.id}
                      className={`max-w-sm p-4 rounded-lg shadow-lg border-l-4 bg-white transform transition-all duration-300 animate-slide-in ${
                          notification.type === 'success' ? 'border-green-500' :
                              notification.type === 'info' ? 'border-blue-500' :
                                  notification.type === 'error' ? 'border-red-500' :
                                      'border-yellow-500'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-800">{notification.message}</p>
                      <button
                          onClick={() => removeNotification(notification.id)}
                          className="text-gray-400 hover:text-gray-600 ml-2 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
              ))}
            </div>
        )}

        <div className="bg-gray-50">
          {renderActiveTab()}
        </div>
        <Footer />

        {/* CSS за анимации */}
        <style>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
      </div>
  );
};

export default MostKonSebeApp;