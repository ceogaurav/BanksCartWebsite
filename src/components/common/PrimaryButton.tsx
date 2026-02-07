import React from 'react';
import { Loader2 } from 'lucide-react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    isLoading?: boolean;
    variant?: 'default' | 'outline' | 'ghost' | 'card-action';
    className?: string; // Allow overriding/adding classes
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    children,
    isLoading,
    variant = 'default',
    className = '',
    disabled,
    ...props
}) => {

    const baseStyles = "inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed";

    const variants = {
        default: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg active:scale-95 rounded-xl text-sm font-semibold px-8 py-3 focus:ring-blue-500",
        outline: "border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 shadow-sm hover:shadow active:scale-95 rounded-xl text-sm font-medium px-6 py-2.5 focus:ring-gray-200",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900 rounded-lg text-sm font-medium px-4 py-2",
        'card-action': "bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold px-6 py-2 shadow hover:shadow-md active:scale-95"
    };

    return (
        <button
            {...props}
            disabled={disabled || isLoading}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
};

export default PrimaryButton;
