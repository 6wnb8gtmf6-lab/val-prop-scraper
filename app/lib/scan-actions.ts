'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export async function promoteScanToMaster(scanId: string) {
    const session = await auth();
    if (!session?.user?.id) throw new Error('Unauthorized');

    const scan = await prisma.scanResult.findUnique({
        where: { id: scanId },
        include: { targetUrl: true },
    });

    if (!scan) throw new Error('Scan not found');
    if (scan.targetUrl.userId !== session.user.id) throw new Error('Unauthorized');
    if (!scan.extractedData) throw new Error('No data to promote');

    // Update TargetURL with master data
    await prisma.targetURL.update({
        where: { id: scan.targetUrlId },
        data: {
            masterData: scan.extractedData,
        },
    });

    // Update ScanResult status
    await prisma.scanResult.update({
        where: { id: scanId },
        data: {
            reviewStatus: 'APPROVED',
        },
    });

    revalidatePath(`/dashboard/${scan.targetUrlId}`);
    revalidatePath(`/dashboard/scan/${scanId}`);

    return { success: true };
}

export async function rejectScan(scanId: string) {
    const session = await auth();
    if (!session?.user?.id) throw new Error('Unauthorized');

    const scan = await prisma.scanResult.findUnique({
        where: { id: scanId },
        include: { targetUrl: true },
    });

    if (!scan) throw new Error('Scan not found');
    if (scan.targetUrl.userId !== session.user.id) throw new Error('Unauthorized');

    // Update ScanResult status
    await prisma.scanResult.update({
        where: { id: scanId },
        data: {
            reviewStatus: 'REJECTED',
        },
    });

    revalidatePath(`/dashboard/${scan.targetUrlId}`);
    revalidatePath(`/dashboard/scan/${scanId}`);

    return { success: true };
}
