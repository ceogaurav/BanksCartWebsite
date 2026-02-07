import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';

interface CustomDatePickerProps {
    value: string;
    onChange: (date: string) => void;
    label: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ value, onChange, label, placeholder = 'Select Date', required = false, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date()); // For navigation
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize from value prop
    useEffect(() => {
        if (value) {
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
                setSelectedDate(date);
                setCurrentMonth(date);
            }
        }
    }, [value]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const daysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const firstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const handleDateClick = (day: number) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        // Adjust for timezone offset to ensure string format is correct local YYYY-MM-DD
        // Actually, simpler to just construct the string manually to avoid timezone shifting issues
        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        const dateString = `${year}-${month}-${d}`;

        onChange(dateString);
        setIsOpen(false);
    };

    const handleClear = () => {
        onChange('');
        setSelectedDate(null);
        setIsOpen(false);
    };

    const handleToday = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const d = String(today.getDate()).padStart(2, '0');
        onChange(`${year}-${month}-${d}`);
        setCurrentMonth(today);
        setIsOpen(false);
    };

    const formatDateDisplay = (dateStr: string) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        // Format: MM/DD/YYYY to match standard US or DD/MM/YYYY based on locale?
        // Let's stick to a readable format
        return d.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    };

    const renderCalendarDays = () => {
        const days = [];
        const totalDays = daysInMonth(currentMonth);
        const startDay = firstDayOfMonth(currentMonth);

        // Empty cells for days before start of month
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
        }

        // Day cells
        for (let i = 1; i <= totalDays; i++) {
            const isSelected = selectedDate &&
                selectedDate.getDate() === i &&
                selectedDate.getMonth() === currentMonth.getMonth() &&
                selectedDate.getFullYear() === currentMonth.getFullYear();

            const isToday = new Date().getDate() === i &&
                new Date().getMonth() === currentMonth.getMonth() &&
                new Date().getFullYear() === currentMonth.getFullYear();

            days.push(
                <button
                    key={i}
                    onClick={(e) => { e.preventDefault(); handleDateClick(i); }}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all duration-200
                        ${isSelected ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-200' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}
                        ${!isSelected && isToday ? 'border border-blue-600 font-semibold text-blue-600' : ''}
                    `}
                >
                    {i}
                </button>
            );
        }
        return days;
    };

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div ref={containerRef} className="relative w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                {label}
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    readOnly
                    value={formatDateDisplay(value)}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`block w-full pl-10 pr-3 py-3.5 border ${error ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 sm:text-sm font-medium cursor-pointer caret-transparent`}
                    placeholder={placeholder}
                />
            </div>
            {error && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{error}</p>}

            {isOpen && (
                <div className="absolute z-50 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-4 w-[280px] animate-in fade-in zoom-in-95 duration-200 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-bold text-gray-800 text-sm">
                            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </span>
                        <div className="flex gap-1">
                            {/* Using Up/Down for prev/next to match the description "Up arrow / Down arrow" slightly, 
                                but standard is Left/Right or Up/Down for years. Let's use simple Left/Right for months as standard usability is better. 
                                Actually, screenshot showed Up/Down arrows in top right. I will assume they meant Next/Prev month.
                            */}
                            <button onClick={(e) => { e.preventDefault(); handlePrevMonth(); }} className="p-1 hover:bg-gray-100 rounded-full text-gray-600">
                                <ChevronUp className="w-5 h-5" /> {/* Mimicking the "Up" arrow in screenshot for "Previous" potentially or standard nav? Usually Up/Down is for Year or Next/Prev. Let's start with arrows looking like Up/Down as requested but functional as Prev/Next */}
                            </button>
                            <button onClick={(e) => { e.preventDefault(); handleNextMonth(); }} className="p-1 hover:bg-gray-100 rounded-full text-gray-600">
                                <ChevronDown className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Weekday Headers */}
                    <div className="grid grid-cols-7 mb-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                            <div key={day} className="w-8 text-center text-xs font-medium text-gray-500">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Day Grid */}
                    <div className="grid grid-cols-7 gap-y-1 justify-items-center">
                        {renderCalendarDays()}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                        <button
                            onClick={(e) => { e.preventDefault(); handleClear(); }}
                            className="text-xs font-semibold text-blue-500 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                        >
                            Clear
                        </button>
                        <button
                            onClick={(e) => { e.preventDefault(); handleToday(); }}
                            className="text-xs font-semibold text-blue-500 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                        >
                            Today
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDatePicker;
