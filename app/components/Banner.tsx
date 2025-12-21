"use client";

import { useState, useEffect } from 'react';

export default function Banner() {
    const [isVisible, setIsVisible] = useState(false); // Default to false to prevent hydration mismatch/flash

    useEffect(() => {
        // Check local storage on mount
        const dismissed = localStorage.getItem('prototype-banner-dismissed');
        if (dismissed !== 'true') {
            setIsVisible(true);
        }
    }, []);

    if (!isVisible) return null;

    const dismiss = () => {
        setIsVisible(false);
        localStorage.setItem('prototype-banner-dismissed', 'true');
    };

    return (
        <div className="bg-yellow-100 text-yellow-800 text-center py-2 px-4 shadow-sm border-b border-yellow-200 relative" role="alert">
            <p className="text-sm font-medium">Prototype in development</p>
            <button
                onClick={dismiss}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-yellow-200 rounded-full text-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                aria-label="Dismiss"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}
