import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Play, Trophy, Activity, Calendar } from 'lucide-react';

export function Dashboard({ plan, onStartWorkout }) {
    if (!plan) return null;

    const todayIndex = new Date().getDay(); // 0 is Sunday
    // Map JS days (0-6) into our plan string days
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayName = dayNames[todayIndex];

    const todayWorkout = plan.schedule.find(p => p.day === todayName) || plan.schedule[0];

    return (
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'var(--color-bg)', minHeight: '100vh', animation: 'fadeIn var(--transition-normal)' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 className="text-gradient" style={{ fontSize: '2rem' }}>Welcome Back!</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>Ready to crush it today?</p>
                </div>
                <div style={{ padding: '12px', background: 'var(--color-surface)', borderRadius: 'var(--radius-full)', boxShadow: 'var(--shadow-sm)' }}>
                    <Trophy color="var(--color-accent-orange)" size={24} />
                </div>
            </div>

            <Card style={{ background: 'var(--gradient-primary)', color: 'white', border: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Today's Plan</h2>
                        <p style={{ opacity: 0.9 }}>{todayWorkout.day} - {todayWorkout.type}</p>
                    </div>
                    <Calendar color="white" size={24} />
                </div>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                    <p style={{ fontWeight: 'bold' }}>Target: {todayWorkout.target}</p>
                    <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>{todayWorkout.exercises.length} Exercises to complete</p>
                </div>
                {todayWorkout.type !== 'Rest' && (
                    <Button
                        variant="secondary"
                        onClick={() => onStartWorkout(todayWorkout)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'white', color: 'var(--color-accent-blue)' }}
                    >
                        <Play size={20} fill="currentColor" /> Start Workout
                    </Button>
                )}
            </Card>

            <div>
                <h3 style={{ marginBottom: '1rem' }}>Weekly Overview</h3>
                <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', WebkitOverflowScrolling: 'touch' }}>
                    {plan.schedule.map(day => (
                        <Card key={day.day} style={{ minWidth: '140px', flex: '0 0 auto', padding: '1rem', border: day.day === todayName ? '2px solid var(--color-accent-blue)' : '1px solid var(--glass-border)' }}>
                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{day.day}</p>
                            <h4 style={{ margin: '0.5rem 0', color: day.type === 'Rest' ? 'var(--color-accent-blue)' : 'var(--color-text)' }}>{day.type}</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{day.target}</p>
                        </Card>
                    ))}
                </div>
            </div>

            <Card>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ padding: '8px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: 'var(--radius-md)' }}>
                        <Activity color="var(--color-accent-purple)" />
                    </div>
                    <h3 style={{ margin: 0 }}>Progress</h3>
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Streak: 5 Days 🔥</p>
                <div style={{ width: '100%', height: '8px', background: 'var(--glass-border)', borderRadius: '4px', marginTop: '0.5rem', overflow: 'hidden' }}>
                    <div style={{ width: '60%', height: '100%', background: 'var(--gradient-secondary)' }} />
                </div>
            </Card>

        </div>
    );
}
