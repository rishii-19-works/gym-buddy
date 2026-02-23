import React, { useState } from 'react';
import { Button } from '../components/Button';

const slides = [
    {
        title: "Welcome to Gym Buddy",
        description: "Your AI-powered personal trainer. Let's build your perfect workout plan.",
        icon: "🏋️‍♂️"
    },
    {
        title: "Personalized For You",
        description: "Tell us about your goals, experience, and schedule. We handle the rest.",
        icon: "🎯"
    },
    {
        title: "Track & Progress",
        description: "Log your sets, reps, and watch your strength skyrocket with progressive overload.",
        icon: "📈"
    }
];

export function Onboarding({ onComplete }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    const skip = () => {
        onComplete();
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            padding: '2rem',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
            background: 'var(--color-bg)'
        }}>
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2rem',
                animation: 'fadeIn var(--transition-normal)'
            }}>
                <div style={{
                    fontSize: '5rem',
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 10px 15px rgba(59, 130, 246, 0.3))',
                    transform: 'scale(1.2)'
                }}>
                    {slides[currentSlide].icon}
                </div>
                <div>
                    <h1 className="text-gradient" style={{ marginBottom: '1rem', fontSize: '2rem' }}>
                        {slides[currentSlide].title}
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '300px' }}>
                        {slides[currentSlide].description}
                    </p>
                </div>
            </div>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            style={{
                                width: index === currentSlide ? '24px' : '8px',
                                height: '8px',
                                borderRadius: '4px',
                                background: index === currentSlide ? 'var(--color-accent-blue)' : 'var(--glass-border)',
                                transition: 'all var(--transition-normal)'
                            }}
                        />
                    ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Button variant="primary" onClick={nextSlide}>
                        {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
                    </Button>
                    {currentSlide < slides.length - 1 && (
                        <Button variant="outline" onClick={skip}>
                            Skip Tutorial
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
