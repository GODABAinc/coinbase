import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

/**
 * Reusable Card component with hover effects and optional scroll animation.
 */
const Card = ({
    children,
    className = '',
    hover = true,
    animate = true,
    padding = 'p-6',
    onClick,
}) => {
    const [ref, isVisible] = useScrollAnimation();

    return (
        <div
            ref={animate ? ref : null}
            onClick={onClick}
            className={`
        bg-white rounded-2xl border border-cb-gray-100
        ${hover ? 'hover:shadow-lg hover:border-cb-gray-300 hover:-translate-y-1 cursor-pointer' : ''}
        transition-all duration-300 ease-out
        ${padding}
        ${animate ? (isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8') : ''}
        ${className}
      `}
            style={animate ? { transition: 'opacity 0.6s ease-out, transform 0.6s ease-out, box-shadow 0.3s ease, border-color 0.3s ease' } : {}}
        >
            {children}
        </div>
    );
};

export default Card;
