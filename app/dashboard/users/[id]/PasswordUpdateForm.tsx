'use client';

import { updateUserPassword } from '@/app/lib/actions';
import { useState } from 'react';
import Link from 'next/link';

export default function PasswordUpdateForm({ userId }: { userId: string }) {
    const [message, setMessage] = useState<{ error?: string; success?: string } | null>(null);
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsPending(true);
        setMessage(null);

        const formData = new FormData(event.currentTarget);
        const result = await updateUserPassword(userId, formData);

        setMessage(result);
        setIsPending(false);

        if (result?.success) {
            (event.target as HTMLFormElement).reset();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow sm:rounded-lg p-6">
            <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Change Password</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Update the password for this user.
                </p>
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    New Password
                </label>
                <div className="mt-1">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        minLength={6}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <Link href="/dashboard/users" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    Back to Users
                </Link>
                <button
                    type="submit"
                    disabled={isPending}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {isPending ? 'Updating...' : 'Update Password'}
                </button>
            </div>

            {message?.error && (
                <p className="text-sm text-red-500">{message.error}</p>
            )}
            {message?.success && (
                <p className="text-sm text-green-500">{message.success}</p>
            )}
        </form>
    );
}
