import { db } from '@/db';
import { trainingHistory } from '@/db/schema';

async function main() {
    const twentyDaysAgo = new Date();
    twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);

    const sampleTrainingHistory = [
        {
            mlModelId: 2,
            epochNumber: 1,
            lossValue: 0.65,
            accuracyValue: 0.72,
            createdAt: new Date(twentyDaysAgo.getTime()).toISOString(),
        },
        {
            mlModelId: 2,
            epochNumber: 2,
            lossValue: 0.52,
            accuracyValue: 0.78,
            createdAt: new Date(twentyDaysAgo.getTime() + 1 * 60 * 60 * 1000).toISOString(),
        },
        {
            mlModelId: 2,
            epochNumber: 3,
            lossValue: 0.42,
            accuracyValue: 0.82,
            createdAt: new Date(twentyDaysAgo.getTime() + 2 * 60 * 60 * 1000).toISOString(),
        },
        {
            mlModelId: 2,
            epochNumber: 4,
            lossValue: 0.35,
            accuracyValue: 0.85,
            createdAt: new Date(twentyDaysAgo.getTime() + 3 * 60 * 60 * 1000).toISOString(),
        },
        {
            mlModelId: 2,
            epochNumber: 5,
            lossValue: 0.29,
            accuracyValue: 0.87,
            createdAt: new Date(twentyDaysAgo.getTime() + 4 * 60 * 60 * 1000).toISOString(),
        },
        {
            mlModelId: 2,
            epochNumber: 6,
            lossValue: 0.25,
            accuracyValue: 0.89,
            createdAt: new Date(twentyDaysAgo.getTime() + 5 * 60 * 60 * 1000).toISOString(),
        },
        {
            mlModelId: 2,
            epochNumber: 7,
            lossValue: 0.21,
            accuracyValue: 0.90,
            createdAt: new Date(twentyDaysAgo.getTime() + 6 * 60 * 60 * 1000).toISOString(),
        },
        {
            mlModelId: 2,
            epochNumber: 8,
            lossValue: 0.18,
            accuracyValue: 0.91,
            createdAt: new Date(twentyDaysAgo.getTime() + 7 * 60 * 60 * 1000).toISOString(),
        },
        {
            mlModelId: 2,
            epochNumber: 9,
            lossValue: 0.16,
            accuracyValue: 0.915,
            createdAt: new Date(twentyDaysAgo.getTime() + 8 * 60 * 60 * 1000).toISOString(),
        },
        {
            mlModelId: 2,
            epochNumber: 10,
            lossValue: 0.15,
            accuracyValue: 0.92,
            createdAt: new Date(twentyDaysAgo.getTime() + 9 * 60 * 60 * 1000).toISOString(),
        },
    ];

    await db.insert(trainingHistory).values(sampleTrainingHistory);
    
    console.log('✅ Training history seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});