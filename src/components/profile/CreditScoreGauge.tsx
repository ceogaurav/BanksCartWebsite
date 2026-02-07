import React from 'react';

interface CreditScoreGaugeProps {
    score: number;
}

const CreditScoreGauge: React.FC<CreditScoreGaugeProps> = ({ score }) => {
    // 1. Constants
    const minScore = 300;
    const maxScore = 900;
    const radius = 85;
    const center = 100;

    // 2. Normalization
    const normalizedScore = Math.min(Math.max(score, minScore), maxScore);
    const percent = (normalizedScore - minScore) / (maxScore - minScore); // 0.0 to 1.0

    // 3. Determine Color & Label
    let label = "Needs Attention";
    let color = "#ef4444"; // Red
    if (score >= 650) { label = "Fair"; color = "#f97316"; } // Orange
    if (score >= 700) { label = "Good"; color = "#eab308"; } // Yellow
    if (score >= 750) { label = "Excellent"; color = "#22c55e"; } // Green

    // 4. Angle Calculations
    const angleDeg = (percent * 180) - 180;
    const angleRad = (angleDeg * Math.PI) / 180;

    // Calculate Ring Position
    const tipX = center + radius * Math.cos(angleRad);
    const tipY = center + radius * Math.sin(angleRad);

    return (
        <div className="flex flex-col items-center justify-center relative w-full max-w-[300px] mx-auto">
            <div className="relative w-full aspect-[2/1.2] flex items-end justify-center overflow-visible">
                <svg viewBox="0 0 200 110" className="w-full h-full overflow-visible">

                    {/* --- DEFINITIONS: GRADIENTS FOR 3D EFFECT --- */}
                    <defs>
                        <linearGradient id="gradRed" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="100%" stopColor="#fca5a5" />
                        </linearGradient>
                        <linearGradient id="gradOrange" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#fdba74" />
                        </linearGradient>
                        <linearGradient id="gradYellow" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#eab308" />
                            <stop offset="100%" stopColor="#fde047" />
                        </linearGradient>
                        <linearGradient id="gradGreen" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#22c55e" />
                            <stop offset="100%" stopColor="#86efac" />
                        </linearGradient>
                        {/* Soft Shadow Filter for the Needle */}
                        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.3" />
                        </filter>
                    </defs>

                    {/* --- TRACK SEGMENTS (Flat "Butt" Ends for clean look) --- */}
                    {/* We use specific Arc Commands to create gaps */}

                    {/* Red Segment */}
                    <path d="M 15 100 A 85 85 0 0 1 38.3 43.6"
                        fill="none" stroke="url(#gradRed)" strokeWidth="14" strokeLinecap="butt" />

                    {/* Orange Segment */}
                    <path d="M 42.5 39.5 A 85 85 0 0 1 97 15"
                        fill="none" stroke="url(#gradOrange)" strokeWidth="14" strokeLinecap="butt" />

                    {/* Yellow Segment */}
                    <path d="M 103 15 A 85 85 0 0 1 157.5 39.5"
                        fill="none" stroke="url(#gradYellow)" strokeWidth="14" strokeLinecap="butt" />

                    {/* Green Segment */}
                    <path d="M 161.7 43.6 A 85 85 0 0 1 185 100"
                        fill="none" stroke="url(#gradGreen)" strokeWidth="14" strokeLinecap="butt" />

                    {/* --- NEEDLE --- */}
                    <g transform={`translate(100, 100) rotate(${angleDeg})`} filter="url(#shadow)">
                        {/* Sharper Triangle Pointer */}
                        <path d="M -8 -4 L 80 0 L -8 4 Z" fill="#1e293b" />
                        {/* Pivot Circle */}
                        <circle cx="0" cy="0" r="7" fill="#1e293b" />
                    </g>

                    {/* --- FLOATING RING --- */}
                    {/* White fill, Gold stroke, sitting on the track */}
                    <circle
                        cx={tipX}
                        cy={tipY}
                        r="7"
                        fill="white"
                        stroke="#eab308"
                        strokeWidth="3"
                        className="drop-shadow-lg"
                    />

                    {/* --- TEXT --- */}
                    <text x="100" y="75" textAnchor="middle"
                        className="text-4xl font-bold fill-slate-800"
                        style={{ fontSize: '38px', fontWeight: '800', fontFamily: 'sans-serif' }}
                    >
                        {score}
                    </text>

                    <text x="100" y="98" textAnchor="middle"
                        className="text-sm font-bold uppercase tracking-wider"
                        fill={color}
                        style={{ fontSize: '15px', fontWeight: '700' }}
                    >
                        {label}
                    </text>

                </svg>
            </div>
        </div>
    );
};

export default CreditScoreGauge;