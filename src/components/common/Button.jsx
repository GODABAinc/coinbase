import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable Button component matching Coinbase design.
 * Variants: primary (blue), secondary (outline), text, dark
 */
const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    href,
    to,
    onClick,
    className = '',
    fullWidth = false,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 cursor-pointer select-none';

    const variants = {
        primary: 'bg-cb-blue text-white hover:bg-cb-blue-hover active:scale-[0.98] shadow-sm hover:shadow-md',
        secondary: 'bg-transparent text-cb-blue border-2 border-cb-blue hover:bg-cb-blue-light active:scale-[0.98]',
        dark: 'bg-cb-dark text-white hover:bg-cb-gray-900 active:scale-[0.98]',
        outline: 'bg-transparent text-cb-dark border-2 border-cb-gray-100 hover:border-cb-gray-300 active:scale-[0.98]',
        text: 'bg-transparent text-cb-blue hover:text-cb-blue-hover underline-offset-2 hover:underline',
        white: 'bg-white text-cb-dark hover:bg-cb-gray-50 active:scale-[0.98] shadow-sm',
    };

    const sizes = {
        sm: 'text-sm px-4 py-2',
        md: 'text-sm px-6 py-2.5',
        lg: 'text-base px-8 py-3',
        xl: 'text-lg px-10 py-4',
    };

    const classes = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${fullWidth ? 'w-full' : ''} ${className}`;

    // Render as Link if `to` prop is provided
    if (to) {
        return (
            <Link to={to} className={classes} {...props}>
                {children}
            </Link>
        );
    }

    // Render as anchor if `href` prop is provided
    if (href) {
        return (
            <a href={href} className={classes} {...props}>
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={classes} {...props}>
            {children}
        </button>
    );
};

export default Button;
