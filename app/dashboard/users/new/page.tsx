'use client';

import { useActionState } from 'react';
import { createUser } from '@/app/lib/actions';
import Link from 'next/link';

export default function NewUserPage() {
    const [errorMessage, dispatch] = useActionState(createUser, undefined);

    return (
        <div className="max-w-md mx-auto">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Add New User
                    </h2>
                </div>
            </div>

            <form action={dispatch} className="space-y-6 bg-white shadow sm:rounded-lg p-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <div className="mt-1">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
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
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create User
                    </button>
                </div>

                {errorMessage && (
                    <p className="text-sm text-red-500">{errorMessage}</p>
                )}
            </form>
        </div>
    );
}
