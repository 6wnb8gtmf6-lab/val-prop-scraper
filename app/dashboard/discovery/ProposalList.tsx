'use client';

import { promoteProposal, dismissProposal } from '@/app/lib/actions';
import { useState } from 'react';

type Proposal = {
    id: string;
    url: string;
    title: string;
    description: string | null;
    status: string;
};

export default function ProposalList({ proposals }: { proposals: Proposal[] }) {
    const [processingId, setProcessingId] = useState<string | null>(null);

    const handlePromote = async (id: string) => {
        setProcessingId(id);
        await promoteProposal(id);
        setProcessingId(null);
    };

    const handleDismiss = async (id: string) => {
        setProcessingId(id);
        await dismissProposal(id);
        setProcessingId(null);
    };

    if (proposals.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No proposals found. Try generating some above.</p>
            </div>
        );
    }

    return (
        <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Title
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Description
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        URL
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {proposals.map((proposal) => (
                                    <tr key={proposal.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {proposal.title}
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate">
                                            {proposal.description}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-xs truncate">
                                            <a href={proposal.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                                                {proposal.url}
                                            </a>
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handlePromote(proposal.id)}
                                                    disabled={processingId === proposal.id}
                                                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                                                >
                                                    {processingId === proposal.id ? '...' : 'Promote'}
                                                </button>
                                                <button
                                                    onClick={() => handleDismiss(proposal.id)}
                                                    disabled={processingId === proposal.id}
                                                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                                                >
                                                    Dismiss
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
