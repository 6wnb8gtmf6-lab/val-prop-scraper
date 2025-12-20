'use client';

import { updateTargetConfig } from '@/app/lib/actions';
import { useState } from 'react';

interface Props {
    targetId: string;
    initialSchedule: string;
    initialPrompt?: string | null;
    initialCustomFields?: string[];
}

export default function TargetConfigurationForm({ targetId, initialSchedule, initialPrompt, initialCustomFields }: Props) {
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!window.confirm("Are you sure you want to update the configuration?")) {
            return;
        }

        setIsPending(true);
        const formData = new FormData(event.currentTarget);
        await updateTargetConfig(targetId, formData);
        setIsPending(false);
    };

    return (
        <form onSubmit={handleSubmit} className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 self-center">Schedule</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <select
                            name="schedule"
                            defaultValue={initialSchedule}
                            className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                        >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 self-start pt-2">Extraction Prompt</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <textarea
                            name="prompt"
                            rows={4}
                            defaultValue={initialPrompt || ''}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                            placeholder="Describe what data to extract..."
                        />
                    </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 self-start pt-2">Fields to Extract</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                            type="text"
                            name="customFields"
                            defaultValue={initialCustomFields ? initialCustomFields.join(", ") : "APR, Points Earned, Cash Back, Benefits"}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                            placeholder="APR, Annual Fee, Welcome Bonus"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Comma separated list of columns to extract.
                        </p>
                    </dd>
                </div>
                <div className="py-4 sm:py-5 sm:px-6 flex justify-end">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {isPending ? 'Saving...' : 'Save Configuration'}
                    </button>
                </div>
            </dl>
        </form>
    );
}
