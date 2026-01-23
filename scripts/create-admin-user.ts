/**
 * CREATE ADMIN USER SCRIPT
 * 
 * Creates admin@finops user in Firebase Authentication
 * and sets custom claim { role: "admin" }
 * 
 * EMAIL: zaferyuzucu@gmail.com
 * PASSWORD: Zafer1961
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin SDK
if (getApps().length === 0) {
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  
  if (!serviceAccountKey) {
    console.error('❌ FIREBASE_SERVICE_ACCOUNT_KEY environment variable is required');
    process.exit(1);
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountKey);
    initializeApp({
      credential: cert(serviceAccount),
    });
    console.log('✅ Firebase Admin SDK initialized');
  } catch (error: any) {
    console.error('❌ Failed to initialize Firebase Admin SDK:', error.message);
    process.exit(1);
  }
}

const ADMIN_EMAIL = 'zaferyuzucu@gmail.com';
const ADMIN_PASSWORD = 'Zafer1961';

async function createAdminUser() {
  try {
    const auth = getAuth();
    
    console.log(`🔍 Checking if user exists: ${ADMIN_EMAIL}`);
    
    let user;
    
    try {
      // Try to get existing user
      user = await auth.getUserByEmail(ADMIN_EMAIL);
      console.log(`✅ User already exists: ${user.uid}`);
      
      // Update password
      await auth.updateUser(user.uid, {
        password: ADMIN_PASSWORD,
      });
      console.log(`✅ Password updated for user: ${ADMIN_EMAIL}`);
      
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        // Create new user
        console.log(`📝 Creating new user: ${ADMIN_EMAIL}`);
        user = await auth.createUser({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          emailVerified: true, // Auto-verify admin email
          displayName: 'Admin User',
        });
        console.log(`✅ User created: ${user.uid}`);
      } else {
        throw error;
      }
    }
    
    // Set custom claim for admin role
    await auth.setCustomUserClaims(user.uid, { role: 'admin' });
    console.log(`✅ Admin role set for user: ${user.uid}`);
    
    // Verify custom claims
    const userRecord = await auth.getUser(user.uid);
    console.log(`✅ Custom claims:`, userRecord.customClaims);
    
    console.log('\n✅ ADMIN USER READY');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Email: ${ADMIN_EMAIL}`);
    console.log(`Password: ${ADMIN_PASSWORD}`);
    console.log(`UID: ${user.uid}`);
    console.log(`Role: admin`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    return user;
    
  } catch (error: any) {
    console.error('❌ Error creating admin user:', error.message);
    throw error;
  }
}

// Run the script
createAdminUser()
  .then(() => {
    console.log('\n✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
