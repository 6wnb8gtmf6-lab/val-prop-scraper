'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function searchScans(query: string = "") {
    const session = await auth();
    if (!session?.user?.id) return { error: 'Not authenticated' };

    const where: any = {
        userId: session.user.id,
        active: true,
        masterData: { not: null }, // Only include targets with master data
    };

    if (query.trim()) {
        where.name = { contains: query, mode: 'insensitive' };
    }

    const targets = await prisma.targetURL.findMany({
        where,
        select: {
            id: true,
            name: true,
            url: true,
            updatedAt: true,
            masterData: true,
        },
        orderBy: { name: 'asc' },
        take: 50
    });

    const availableTargets = targets.map(t => ({
        targetId: t.id,
        targetName: t.name,
        targetUrl: t.url,
        updatedAt: t.updatedAt,
    }));

    return { success: true, targets: availableTargets };
}

export async function generateValueProposition(targetIds: string[], model: string = "gpt-4o") {
    const session = await auth();
    if (!session?.user?.id) return { error: 'Not authenticated' };

    if (targetIds.length === 0) return { error: 'No targets selected' };

    const targets = await prisma.targetURL.findMany({
        where: {
            id: { in: targetIds },
            userId: session.user.id,
            masterData: { not: null }
        },
        select: {
            name: true,
            masterData: true
        }
    });

    if (targets.length === 0) return { error: 'No targets with master data found' };

    // Prepare data for LLM
    const inputs = targets.map(t => {
        let data = "No data";
        try {
            if (t.masterData) {
                data = t.masterData;
            }
        } catch (e) { }
        return `Target: ${t.name}\nData: ${data}\n---`;
    }).join('\n\n');

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are an expert product strategist. Your goal is to synthesize multiple competitor value propositions into one "Perfect Value Proposition".
                    
Rules for generation:
1. **Summary Synthesis**: Read all summaries and benefits. Create a single, compelling narrative that combines the best features of all inputs into a coherent "sweet spot" description.
2. **Median Calculation**: For any numeric fields found across the inputs (like "APR", "Annual Fee", "Bonus Points", "Cash Back %"), you MUST calculate the mathematical MEDIAN of the available values.
   - Example: If inputs are 15%, 20%, 25%, the "sweet spot" APR is 20%.
   - Explicitly mention that these values represent the "market median" or "sweet spot".
3. **Format**: Return the result in clean Markdown. Use headers for "Value Proposition Summary" and "Key Sweet Spot Metrics".`
                },
                {
                    role: "user",
                    content: `Here are the value propositions from the selected competitors (using verified Master Data):\n\n${inputs}\n\nGenerate the Perfect Value Proposition.`
                }
            ],
            model: model,
        });

        const content = completion.choices[0].message.content;
        return { success: true, content };

    } catch (error) {
        console.error("Generation error:", error);
        return { error: 'Failed to generate value proposition' };
    }
}
