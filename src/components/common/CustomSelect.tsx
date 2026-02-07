import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[] | string[]; // Can accept object array or simple string array
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    icon?: React.ElementType; // Optional leading icon
}

const CustomSelect: React.FC<CustomSelectProps> = ({
    label,
    value,
    onChange,
    options,
    placeholder = "Select an option",
    className = "",
    disabled = false,
    icon: Icon
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Normalize options to Option[] format
    const normalizedOptions: Option[] = options.map(opt =>
        typeof opt === 'string' ? { value: opt, label: opt } : opt
    );

    const selectedOption = normalizedOptions.find(opt => opt.value === value);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {label && <label className="block text-sm text-gray-500 mb-1 font-medium">{label}</label>}

            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`
                    w-full flex items-center justify-between px-4 py-3 bg-white 
                    border rounded-xl transition-all duration-200 text-left
                    ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-50' : 'cursor-pointer'}
                    ${isOpen
                        ? 'border-blue-500 ring-4 ring-blue-500/10 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }
                `}
            >
                <div className="flex items-center gap-3 truncate">
                    {Icon && <Icon className={`h-5 w-5 ${isOpen ? 'text-blue-500' : 'text-gray-400'}`} />}
                    <span className={`block truncate ${!selectedOption?.label ? 'text-gray-400' : 'text-gray-700 font-medium'}`}>
                        {selectedOption?.label || placeholder}
                    </span>
                </div>
                <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-500' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-60 overflow-auto animate-in fade-in slide-in-from-top-2 duration-200">
                    <ul className="p-1.5">
                        {normalizedOptions.map((opt) => (
                            <li key={opt.value}>
                                <button
                                    type="button"
                                    onClick={() => handleSelect(opt.value)}
                                    className={`
                                        w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                                        ${value === opt.value
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }
                                    `}
                                >
                                    <span>{opt.label}</span>
                                    {value === opt.value && <Check className="h-4 w-4 text-blue-600" />}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
