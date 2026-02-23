import React from 'react';
import { Button } from '../components/Button';
import { Trophy } from 'lucide-react';

export function WorkoutFinished({ onReturn }) {
    return (
        <div style={{
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'var(--color-bg)',
            animation: 'fadeIn var(--transition-normal)'
        }}>
            <div style={{ animation: 'bounce 2s infinite', marginBottom: '2rem' }}>
                <Trophy size={80} color="var(--color-accent-orange)" />
            </div>
            <h1 className="text-gradient" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>
                Workout Completed!
            </h1>
            <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', fontSize: '1.2rem', maxWidth: '300px', marginBottom: '2rem' }}>
                Amazing job crushing your sets. You're one step closer to your fitness goals!
            </p>

            <div style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem 2rem',
                marginBottom: '3rem',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Burned</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>420</span>
                    <span style={{ color: 'var(--color-text-muted)', fontWeight: 'bold' }}>kcal</span>
                </div>
            </div>

            <Button variant="primary" onClick={onReturn} style={{ width: '100%', maxWidth: '300px' }}>
                Return to Dashboard
            </Button>
        </div>
    );
}
