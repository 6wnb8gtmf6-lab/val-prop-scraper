'use client';

import { updateExtractionFields } from './actions';
import { useTransition } from 'react';

export default function ExtractionFieldsForm({ initialFields }: { initialFields: string[] }) {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            await updateExtractionFields(formData);
        });
    };

    return (
        <form action={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="fields" className="block text-sm font-medium text-gray-700">
                    Required Extraction Fields (global)
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        name="fields"
                        id="fields"
                        defaultValue={initialFields.join(', ')}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                        placeholder="APR, Points Earned, Cash Back"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                        These fields will be automatically included in all new target scans.
                    </p>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isPending}
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {isPending ? 'Saving...' : 'Save Fields'}
                </button>
            </div>
        </form>
    );
}
