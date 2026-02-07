import React, { useMemo } from 'react';
import { Snowflake } from 'lucide-react';

interface ChristmasThemeWrapperProps {
    children: React.ReactNode;
}

const ChristmasThemeWrapper: React.FC<ChristmasThemeWrapperProps> = ({ children }) => {
    // Generate static random values for snowflakes to avoid re-renders causing jumps
    const snowflakes = useMemo(() => {
        return Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`, // Spread out start times
            animationDuration: `${Math.random() * 5 + 10}s`, // Slow drift (10-15s)
            opacity: Math.random() * 0.4 + 0.1, // 0.1 to 0.5
            size: Math.random() * 6 + 4, // 4-10px
        }));
    }, []);

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-b from-white via-sky-50 to-slate-100 overflow-x-hidden transition-colors duration-500">
            {/* Snow Container */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
                {snowflakes.map((flake) => (
                    <div
                        key={flake.id}
                        className="absolute -top-4 rounded-full bg-white shadow-sm" // Start slightly above
                        style={{
                            left: flake.left,
                            width: `${flake.size}px`,
                            height: `${flake.size}px`,
                            opacity: flake.opacity,
                            animation: `snowfall ${flake.animationDuration} linear infinite`,
                            animationDelay: `-${Math.random() * 10}s`, // Negative delay to start mid-animation immediately
                            filter: `blur(${flake.size > 7 ? '1px' : '0px'})`, // Blur larger flakes for depth
                        }}
                    />
                ))}

                {/* Subtle Decorations */}
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] rotate-12 transform scale-150 origin-top-right">
                    <Snowflake size={400} className="text-blue-900" />
                </div>
                <div className="absolute bottom-0 left-0 p-10 opacity-[0.03] -rotate-12 transform scale-125 origin-bottom-left">
                    <Snowflake size={300} className="text-blue-900" />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default ChristmasThemeWrapper;
