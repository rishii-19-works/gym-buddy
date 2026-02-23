import React, { useState, useEffect } from 'react';
import { Onboarding } from './screens/Onboarding';
import { DataCollection } from './screens/DataCollection';
import { Dashboard } from './screens/Dashboard';
import { WorkoutActive } from './screens/WorkoutActive';
import { WorkoutFinished } from './screens/WorkoutFinished';
import { generateWorkoutPlan } from './services/aiGenerator';
import { Moon, Sun, Dumbbell } from 'lucide-react';

function App() {
    const [screen, setScreen] = useState('onboarding'); // onboarding, data, dashboard, workout, finished
    const [theme, setTheme] = useState('dark');
    const [plan, setPlan] = useState(null);
    const [activeWorkout, setActiveWorkout] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

    const handleOnboardingComplete = () => setScreen('data');

    const handleDataComplete = async (userData) => {
        setIsGenerating(true);
        setScreen('generating');
        const newPlan = await generateWorkoutPlan(userData);
        setPlan(newPlan);
        setIsGenerating(false);
        setScreen('dashboard');
    };

    const handleStartWorkout = (workout) => {
        setActiveWorkout(workout);
        setScreen('workout');
    };

    const handleFinishWorkout = () => {
        setScreen('finished');
    };

    const handleReturnToDashboard = () => {
        setActiveWorkout(null);
        setScreen('dashboard');
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
            {/* Absolute theme toggle */}
            <button
                onClick={toggleTheme}
                style={{
                    position: 'absolute', top: '1rem', left: '1rem', zIndex: 50,
                    background: 'var(--glass-bg)', backdropFilter: 'blur(10px)',
                    border: '1px solid var(--glass-border)', padding: '0.5rem',
                    borderRadius: 'var(--radius-full)', color: 'var(--color-text)',
                    cursor: 'pointer', boxShadow: 'var(--shadow-sm)'
                }}
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Main Content Router */}
            {screen === 'onboarding' && <Onboarding onComplete={handleOnboardingComplete} />}

            {screen === 'data' && <DataCollection onComplete={handleDataComplete} />}

            {screen === 'generating' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '2rem' }}>
                    <div style={{ animation: 'bounce 2s infinite' }}>
                        <Dumbbell size={64} className="text-gradient" />
                    </div>
                    <h2 className="text-gradient">AI is building your perfect plan...</h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>Analyzing goals, experience, and equipment.</p>
                </div>
            )}

            {screen === 'dashboard' && <Dashboard plan={plan} onStartWorkout={handleStartWorkout} />}

            {screen === 'workout' && <WorkoutActive workout={activeWorkout} onFinish={handleFinishWorkout} />}

            {screen === 'finished' && <WorkoutFinished onReturn={handleReturnToDashboard} />}

        </div>
    );
}

export default App;
