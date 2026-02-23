import React, { useState } from 'react';

export function Button({ variant = 'primary', children, className = '', onClick, type = 'button', ...props }) {
    const [isHovered, setIsHovered] = useState(false);

    const getBackground = () => {
        switch (variant) {
            case 'primary': return 'var(--gradient-primary)';
            case 'secondary': return 'var(--gradient-secondary)';
            case 'outline': return 'transparent';
            default: return 'var(--color-surface)';
        }
    };

    const getBorder = () => {
        if (variant === 'outline') return '2px solid var(--color-accent-blue)';
        return 'none';
    };

    const getColor = () => {
        if (variant === 'outline') return 'var(--color-text)';
        return 'white';
    };

    return (
        <button
            type={type}
            className={`btn ${className}`}
            style={{
                padding: '16px 24px',
                borderRadius: 'var(--radius-full)',
                background: getBackground(),
                border: getBorder(),
                color: getColor(),
                fontWeight: 'bold',
                fontSize: '1.1rem',
                cursor: 'pointer',
                boxShadow: variant !== 'outline' ? 'var(--shadow-md)' : 'none',
                transition: 'all var(--transition-fast)',
                width: '100%',
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                ...props.style
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={(e) => {
                setIsHovered(false);
                e.currentTarget.style.transform = 'translateY(0)';
            }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={e => e.currentTarget.style.transform = isHovered ? 'translateY(-2px)' : 'scale(1)'}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}
