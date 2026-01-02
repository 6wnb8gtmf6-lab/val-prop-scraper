
import CreateTargetForm from './CreateTargetForm';
import { getUserSettings } from '@/app/lib/data';

export default async function Page() {
    const user = await getUserSettings();
    const defaultFields = user?.requiredExtractionFields?.join(', ') || "APR, Points Earned, Cash Back, Benefits";

    return (
        <CreateTargetForm defaultFields={defaultFields} />
    );
}
