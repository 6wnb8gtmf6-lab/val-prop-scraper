'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardHeader() {
    const pathname = usePathname();

    const getPageName = (path: string) => {
        if (path === '/dashboard') return 'Dashboard';
        if (path === '/dashboard/discovery') return 'Discovery';
        if (path === '/dashboard/users') return 'User Management';
        if (path === '/dashboard/settings') return 'Settings';
        if (path === '/dashboard/new') return 'New Target';
        if (path.startsWith('/dashboard/users/')) return 'User Details';
        if (path.startsWith('/dashboard/scan/')) return 'Scan Results';
        // For /dashboard/[id], we might need to fetch the name server-side or just show 'Target Details'
        // Since this is a client component, we'll settle for 'Target Details' for dynamic IDs if not matched above
        return 'Target Details';
    };

    const currentPage = getPageName(pathname);

    return (
        <header className="h-16 flex items-center justify-between px-8 border-b border-gray-200 bg-white">
            <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium text-gray-900">Value Proposition Evaluator</span>
                <span className="mx-2">/</span>
                <span>{currentPage}</span>
            </div>
            {/* Docs and API Reference links removed */}
        </header>
    );
}
