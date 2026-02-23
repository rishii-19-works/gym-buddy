import React from 'react';

export function Card({ children, className = '', ...props }) {
    return (
        <div
            className={`card ${className}`}
            style={{
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--glass-border)',
                ...props.style
            }}
            {...props}
        >
            {children}
        </div>
    );
}
