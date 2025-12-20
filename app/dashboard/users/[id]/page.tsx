import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import PasswordUpdateForm from './PasswordUpdateForm';

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const user = await prisma.user.findUnique({
        where: { id },
        select: { id: true, name: true, email: true }
    });

    if (!user) {
        notFound();
    }

    return (
        <div className="max-w-md mx-auto">
            <div className="mb-8">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    Edit User: {user.name}
                </h2>
                <p className="mt-1 text-sm text-gray-500">{user.email}</p>
            </div>

            <PasswordUpdateForm userId={user.id} />
        </div>
    );
}
