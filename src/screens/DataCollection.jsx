import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';

const goals = ['Muscle Gain', 'Fat Loss', 'Strength', 'Endurance', 'Recomposition'];
const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];
const splits = ['Push-Pull-Legs', 'Bro Split', 'Upper-Lower', 'Full Body', 'AI Recommended'];

export function DataCollection({ onComplete }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '', age: '', gender: '', height: '', weight: '',
        goal: '', experience: '', frequency: '3', split: '',
        equipment: 'Full Gym', injuries: ''
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (step < 4) setStep(prev => prev + 1);
        else onComplete(formData);
    };

    const prevStep = () => {
        if (step > 1) setStep(prev => prev - 1);
    };

    const renderStepIndicators = () => (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem', justifyContent: 'center' }}>
            {[1, 2, 3, 4].map(s => (
                <div key={s} style={{
                    flex: 1, height: '4px', borderRadius: '2px',
                    background: s <= step ? 'var(--gradient-primary)' : 'var(--glass-border)',
                    transition: 'var(--transition-normal)'
                }} />
            ))}
        </div>
    );

    return (
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--color-bg)' }}>
            {renderStepIndicators()}

            <div style={{ flex: 1, animation: 'fadeIn var(--transition-fast)' }}>
                {step === 1 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <h2 className="text-gradient">Let's get to know you</h2>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>Basic details to personalize your experience.</p>
                        <Input label="Name" placeholder="Your name" value={formData.name} onChange={e => handleChange('name', e.target.value)} />
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Input label="Age" type="number" placeholder="25" value={formData.age} onChange={e => handleChange('age', e.target.value)} />
                            <div style={{ width: '100%' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--color-text)', display: 'block', marginBottom: '0.5rem' }}>Gender</label>
                                <select
                                    style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', background: 'var(--color-surface)', color: 'var(--color-text)', outline: 'none' }}
                                    value={formData.gender} onChange={e => handleChange('gender', e.target.value)}
                                >
                                    <option value="">Select...</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Input label="Height (cm)" type="number" placeholder="175" value={formData.height} onChange={e => handleChange('height', e.target.value)} />
                            <Input label="Weight (kg)" type="number" placeholder="70" value={formData.weight} onChange={e => handleChange('weight', e.target.value)} />
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <h2 className="text-gradient">Fitness Profile</h2>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>What are we training for?</p>

                        <div>
                            <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--color-text)', display: 'block', marginBottom: '0.5rem' }}>Primary Goal</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {goals.map(g => (
                                    <button key={g} onClick={() => handleChange('goal', g)}
                                        style={{
                                            padding: '8px 16px', borderRadius: 'var(--radius-full)',
                                            background: formData.goal === g ? 'var(--color-accent-blue)' : 'var(--color-surface)',
                                            color: formData.goal === g ? 'white' : 'var(--color-text)',
                                            border: `1px solid ${formData.goal === g ? 'transparent' : 'var(--glass-border)'}`,
                                            cursor: 'pointer', transition: 'all var(--transition-fast)'
                                        }}
                                    >{g}</button>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--color-text)', display: 'block', marginBottom: '0.5rem' }}>Experience Level</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {experienceLevels.map(e => (
                                    <button key={e} onClick={() => handleChange('experience', e)}
                                        style={{
                                            padding: '8px 16px', borderRadius: 'var(--radius-full)',
                                            background: formData.experience === e ? 'var(--color-accent-purple)' : 'var(--color-surface)',
                                            color: formData.experience === e ? 'white' : 'var(--color-text)',
                                            border: `1px solid ${formData.experience === e ? 'transparent' : 'var(--glass-border)'}`,
                                            cursor: 'pointer', transition: 'all var(--transition-fast)'
                                        }}
                                    >{e}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <h2 className="text-gradient">Workout Preferences</h2>

                        <div>
                            <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--color-text)', display: 'block', marginBottom: '0.5rem' }}>Days per week: {formData.frequency}</label>
                            <input type="range" min="1" max="7" value={formData.frequency} onChange={e => handleChange('frequency', e.target.value)} style={{ width: '100%' }} />
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--color-text)', display: 'block', marginBottom: '0.5rem' }}>Preferred Split</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {splits.map(s => (
                                    <button key={s} onClick={() => handleChange('split', s)}
                                        style={{
                                            padding: '8px 16px', borderRadius: 'var(--radius-full)',
                                            background: formData.split === s ? 'var(--gradient-secondary)' : 'var(--color-surface)',
                                            color: formData.split === s ? 'white' : 'var(--color-text)',
                                            border: `1px solid ${formData.split === s ? 'transparent' : 'var(--glass-border)'}`,
                                            cursor: 'pointer', transition: 'all var(--transition-fast)'
                                        }}
                                    >{s}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <h2 className="text-gradient">Final Details</h2>

                        <div>
                            <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--color-text)', display: 'block', marginBottom: '0.5rem' }}>Available Equipment</label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {['Full Gym', 'Dumbbells Only', 'Bodyweight'].map(eq => (
                                    <button key={eq} onClick={() => handleChange('equipment', eq)}
                                        style={{
                                            flex: 1, padding: '12px', borderRadius: 'var(--radius-md)',
                                            background: formData.equipment === eq ? 'var(--color-accent-blue)' : 'var(--color-surface)',
                                            color: formData.equipment === eq ? 'white' : 'var(--color-text)',
                                            border: `1px solid ${formData.equipment === eq ? 'transparent' : 'var(--glass-border)'}`,
                                            cursor: 'pointer', transition: 'all var(--transition-fast)'
                                        }}
                                    >{eq}</button>
                                ))}
                            </div>
                        </div>

                        <Input
                            label="Injuries or Limitations (Optional)"
                            placeholder="e.g., Bad lower back, shoulder pain..."
                            value={formData.injuries}
                            onChange={e => handleChange('injuries', e.target.value)}
                        />

                        <Card style={{ marginTop: '1rem', background: 'var(--color-surface)', borderColor: 'var(--color-accent-purple)' }}>
                            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>All set! Our AI will now generate your custom plan.</p>
                        </Card>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                {step > 1 && (
                    <Button variant="outline" onClick={prevStep} style={{ flex: 1 }}>Back</Button>
                )}
                <Button variant="primary" onClick={nextStep} style={{ flex: 2 }}>
                    {step === 4 ? "Generate Plan" : "Continue"}
                </Button>
            </div>
        </div>
    );
}
