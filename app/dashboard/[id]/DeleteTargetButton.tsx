'use client';

import { deleteTarget } from '@/app/lib/actions';
import { useState } from 'react';

export default function DeleteTargetButton({ targetId }: { targetId: string }) {
    const [isPending, setIsPending] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this target? This cannot be undone and all scan history will be lost.")) {
            return;
        }

        setIsPending(true);
        await deleteTarget(targetId);
        // Action redirects, so no need to clean up state
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
        >
            {isPending ? 'Deleting...' : 'Delete Target'}
        </button>
    );
}
