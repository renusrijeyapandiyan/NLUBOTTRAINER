import { db } from '@/db';
import { user, account } from '@/db/schema';
import bcrypt from 'bcryptjs';

async function main() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const userId = "demo-user-id";
    const passwordHash = await bcrypt.hash('password123', 10);

    // Insert user
    await db.insert(user).values({
        id: userId,
        name: 'Demo User',
        email: 'demo@nluapp.com',
        emailVerified: true,
        createdAt: thirtyDaysAgo,
        updatedAt: thirtyDaysAgo,
    }).onConflictDoNothing();

    // Insert credential account
    await db.insert(account).values({
        id: "demo-account-id",
        accountId: 'demo@nluapp.com',
        providerId: 'credential',
        userId: userId,
        password: passwordHash,
        createdAt: thirtyDaysAgo,
        updatedAt: thirtyDaysAgo,
    }).onConflictDoNothing();

    console.log('✅ Users seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});