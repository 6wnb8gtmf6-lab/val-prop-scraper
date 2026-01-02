'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateExtractionFields(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }

    const fieldsString = formData.get('fields') as string;
    const fields = fieldsString
        .split(',')
        .map(f => f.trim())
        .filter(f => f.length > 0);

    await prisma.user.update({
        where: { id: session.user.id },
        data: {
            requiredExtractionFields: fields
        }
    });

    revalidatePath('/dashboard/settings');
    revalidatePath('/dashboard/new');
}
