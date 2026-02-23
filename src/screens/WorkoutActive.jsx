import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { CheckCircle, Clock } from 'lucide-react';

export function WorkoutActive({ workout, onFinish }) {
    const [completedSets, setCompletedSets] = useState({});
    const [restTimer, setRestTimer] = useState(0);

    useEffect(() => {
        let interval;
        if (restTimer > 0) {
            interval = setInterval(() => {
                setRestTimer(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [restTimer]);

    const toggleSet = (exIndex, setIndex, restTime) => {
        const key = `${exIndex}-${setIndex}`;
        const newCompleted = { ...completedSets, [key]: !completedSets[key] };
        setCompletedSets(newCompleted);

        // If marked as complete, start rest timer
        if (newCompleted[key]) {
            setRestTimer(restTime);
        }
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const allCompleted = () => {
        let totalSets = 0;
        workout.exercises.forEach(ex => totalSets += ex.sets);
        return Object.keys(completedSets).filter(k => completedSets[k]).length === totalSets;
    };

    return (
        <div style={{ padding: '1rem', paddingBottom: '6rem', minHeight: '100vh', background: 'var(--color-bg)' }}>
            {/* Sticky Top Header */}
            <div style={{
                position: 'sticky', top: 0,
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(10px)',
                padding: '1rem',
                margin: '-1rem -1rem 1rem -1rem',
                zIndex: 10,
                borderBottom: '1px solid var(--glass-border)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
                <div>
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>{workout.type} Day</h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>{workout.target}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {restTimer > 0 && !allCompleted() && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent-orange)', fontWeight: 'bold' }}>
                            <Clock size={16} /> <span>{formatTime(restTimer)}</span>
                        </div>
                    )}
                    <button
                        onClick={onFinish}
                        style={{
                            padding: '6px 12px',
                            borderRadius: 'var(--radius-full)',
                            background: allCompleted() ? 'var(--gradient-primary)' : 'transparent',
                            color: allCompleted() ? 'white' : 'var(--color-accent-orange)',
                            border: allCompleted() ? 'none' : '1px solid var(--color-accent-orange)',
                            fontWeight: 'bold', cursor: 'pointer',
                            boxShadow: allCompleted() ? 'var(--shadow-sm)' : 'none',
                            fontSize: '0.875rem'
                        }}
                    >
                        {allCompleted() ? 'Finished' : 'End Early'}
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {workout.exercises.map((ex, exIndex) => (
                    <Card key={exIndex} style={{ padding: '1rem', animation: `fadeIn 0.3s ease-out ${exIndex * 0.1}s forwards`, opacity: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                            <h3 style={{ fontSize: '1rem', margin: 0 }}>{ex.name}</h3>
                            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>{ex.sets}x{ex.reps}</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {Array.from({ length: ex.sets }).map((_, setIndex) => {
                                const key = `${exIndex}-${setIndex}`;
                                const isCompleted = completedSets[key];

                                return (
                                    <div key={setIndex} style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        padding: '0.5rem 0.75rem',
                                        background: isCompleted ? 'rgba(59, 130, 246, 0.1)' : 'var(--color-surface)',
                                        border: `1px solid ${isCompleted ? 'var(--color-accent-blue)' : 'var(--glass-border)'}`,
                                        borderRadius: 'var(--radius-md)',
                                        transition: 'all var(--transition-fast)'
                                    }}>
                                        <span style={{ fontWeight: 'bold', color: isCompleted ? 'var(--color-accent-blue)' : 'var(--color-text)' }}>
                                            Set {setIndex + 1}
                                        </span>
                                        <button
                                            onClick={() => toggleSet(exIndex, setIndex, ex.rest)}
                                            style={{
                                                background: 'transparent', border: 'none', cursor: 'pointer',
                                                color: isCompleted ? 'var(--color-accent-blue)' : 'var(--color-text-muted)'
                                            }}
                                        >
                                            <CheckCircle size={24} fill={isCompleted ? 'var(--color-accent-blue)' : 'none'} color={isCompleted ? 'white' : 'currentColor'} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                ))}
            </div>

            {allCompleted() && (
                <Card style={{ margin: '3rem 0', background: 'var(--gradient-primary)', color: 'white', border: 'none', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>All Sets Completed! 🎉</h2>
                    <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>Incredible effort today.</p>
                    <Button variant="secondary" onClick={onFinish} style={{ padding: '20px 32px', fontSize: '1.25rem' }}>
                        Complete Workout
                    </Button>
                </Card>
            )}
        </div>
    );
}
