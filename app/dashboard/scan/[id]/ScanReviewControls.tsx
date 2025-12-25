'use client';

import { promoteScanToMaster, rejectScan } from '@/app/lib/scan-actions';
import { useState } from 'react';

export default function ScanReviewControls({
    scanId,
    currentStatus,
    hasStructuredData
}: {
    scanId: string;
    currentStatus: string;
    hasStructuredData: boolean;
}) {
    const [isLoading, setIsLoading] = useState(false);

    const handlePromote = async () => {
        if (!confirm('Are you sure you want to promote this scan to Master Data? This will overwrite the current Master Data.')) return;
        setIsLoading(true);
        try {
            await promoteScanToMaster(scanId);
        } catch (e) {
            alert('Failed to promote scan');
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReject = async () => {
        if (!confirm('Are you sure you want to reject this scan?')) return;
        setIsLoading(true);
        try {
            await rejectScan(scanId);
        } catch (e) {
            alert('Failed to reject scan');
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    if (currentStatus === 'APPROVED') {
        return (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6 flex items-center gap-3">
                <span className="text-green-700 font-medium">✓ This scan is the current Master Data</span>
            </div>
        );
    }

    if (currentStatus === 'REJECTED') {
        return (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 flex items-center justify-between">
                <span className="text-red-700 font-medium">✕ This scan has been rejected</span>
                <button
                    onClick={handlePromote}
                    disabled={isLoading || !hasStructuredData}
                    className="text-sm text-red-600 hover:text-red-800 underline"
                >
                    Restore and Accept as Master
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6 flex items-center justify-between">
            <div>
                <h3 className="text-sm font-medium text-gray-900">Review Scan</h3>
                <p className="text-sm text-gray-500">Accept this data as the new source of truth or reject it.</p>
            </div>
            <div className="flex gap-3">
                <button
                    onClick={handleReject}
                    disabled={isLoading}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Reject
                </button>
                <button
                    onClick={handlePromote}
                    disabled={isLoading || !hasStructuredData}
                    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Accept All as Master Data
                </button>
            </div>
        </div>
    );
}
