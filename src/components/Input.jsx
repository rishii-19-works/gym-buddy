import React, { useState } from 'react';

export function Input({ label, type = 'text', onChange, value, ...props }) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
            {label && (
                <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--color-text)' }}>
                    {label}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${isFocused ? 'var(--color-accent-blue)' : 'var(--glass-border)'}`,
                    background: 'var(--color-surface)',
                    color: 'var(--color-text)',
                    outline: 'none',
                    boxShadow: isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.2)' : 'inset 0 2px 4px rgba(0,0,0,0.05)',
                    transition: 'all var(--transition-fast)',
                    width: '100%',
                    ...props.style
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            />
        </div>
    );
}
