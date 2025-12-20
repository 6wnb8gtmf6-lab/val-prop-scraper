import { getProposals } from '@/app/lib/data';
import DiscoveryForm from './DiscoveryForm';
import ProposalList from './ProposalList';

export default async function Page() {
    const proposals = await getProposals();

    return (
        <div>
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Target Discovery
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Use AI to find new URLs to add to your evaluator dashboard.
                    </p>
                </div>
            </div>

            <DiscoveryForm />

            <h3 className="mt-8 text-lg font-medium leading-6 text-gray-900">Proposed URLs</h3>
            <ProposalList proposals={proposals} />
        </div>
    );
}
