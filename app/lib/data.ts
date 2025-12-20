import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function getTargetUrls() {
    const session = await auth();
    if (!session?.user?.id) return [];

    try {
        const targets = await prisma.targetURL.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: 'desc' },
            include: {
                scanResults: {
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            }
        });
        return targets;
    } catch (error) {
        console.error('Failed to fetch targets:', error);
        return [];
    }
}

export async function getUsers() {
    const session = await auth();
    if (!session?.user?.id) return [];
    // Ideally check for admin role, but assuming all logged-in users are admins per request.

    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                // Exclude password
            }
        });
        return users;
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return [];
    }
}
