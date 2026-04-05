const readline = require('readline');
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'opportunitycentral-test';

async function manageAdmin() {
  let client;
  
  try {
    console.log('\n🔧 Admin Management Tool\n');
    
    // Connect to MongoDB
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB\n');
    
    const db = client.db(MONGODB_DB_NAME);
    const adminsCollection = db.collection('admins');
    
    // Ask what to do
    console.log('What would you like to do?');
    console.log('1. Create new admin');
    console.log('2. Reset admin password');
    console.log('3. List all admins');
    console.log('4. Deactivate admin account');
    console.log('5. Activate admin account');
    console.log('6. Delete admin account');
    const choice = await question('\nEnter choice (1-6): ');
    
    if (choice === '1') {
      // Create new admin
      const name = await question('\nEnter admin name: ');
      const email = await question('Enter admin email: ');
      
      // Check if admin already exists
      const existingAdmin = await adminsCollection.findOne({ email });
      if (existingAdmin) {
        console.log('\n❌ Admin with this email already exists!');
        rl.close();
        await client.close();
        return;
      }
      
      const password = await question('Enter password: ');
      const confirmPassword = await question('Confirm password: ');
      
      if (password !== confirmPassword) {
        console.log('\n❌ Passwords do not match!');
        rl.close();
        await client.close();
        return;
      }
      
      if (password.length < 6) {
        console.log('\n❌ Password must be at least 6 characters!');
        rl.close();
        await client.close();
        return;
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create admin
      await adminsCollection.insertOne({
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        lastLogin: null,
        isActive: true,
        updatedAt: new Date()
      });
      
      console.log(`\n✅ Admin created successfully!`);
      console.log(`� Name: ${name}`);
      console.log(`� Email: ${email}`);
      console.log(`✓ Status: Active`);
      
    } else if (choice === '2') {
      // Reset password
      const email = await question('\nEnter admin email: ');
      
      const admin = await adminsCollection.findOne({ email });
      if (!admin) {
        console.log('\n❌ Admin not found!');
        rl.close();
        await client.close();
        return;
      }
      
      const newPassword = await question('Enter new password: ');
      const confirmPassword = await question('Confirm new password: ');
      
      if (newPassword !== confirmPassword) {
        console.log('\n❌ Passwords do not match!');
        rl.close();
        await client.close();
        return;
      }
      
      if (newPassword.length < 6) {
        console.log('\n❌ Password must be at least 6 characters!');
        rl.close();
        await client.close();
        return;
      }
      
      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      // Update password
      await adminsCollection.updateOne(
        { email },
        { 
          $set: { 
            password: hashedPassword,
            updatedAt: new Date()
          } 
        }
      );
      
      console.log(`\n✅ Password reset successfully for ${email}!`);
      
    } else if (choice === '3') {
      // List admins
      const admins = await adminsCollection.find({}).toArray();
      
      if (admins.length === 0) {
        console.log('\n📭 No admins found in database.');
      } else {
        console.log(`\n📋 Found ${admins.length} admin(s):\n`);
        admins.forEach((admin, index) => {
          const statusIcon = admin.isActive ? '✓' : '✗';
          const statusText = admin.isActive ? 'Active' : 'Deactivated';
          console.log(`${index + 1}. ${admin.name || 'N/A'} (${admin.email})`);
          console.log(`   Status: ${statusIcon} ${statusText}`);
          console.log(`   Created: ${admin.createdAt?.toLocaleDateString() || 'Unknown'}`);
          console.log(`   Last Login: ${admin.lastLogin?.toLocaleDateString() || 'Never'}\n`);
        });
      }
      
    } else if (choice === '4') {
      // Deactivate admin account
      const email = await question('\nEnter admin email to deactivate: ');
      
      const admin = await adminsCollection.findOne({ email });
      if (!admin) {
        console.log('\n❌ Admin not found!');
        rl.close();
        await client.close();
        return;
      }
      
      if (admin.isActive === false) {
        console.log('\n⚠️ Admin account is already deactivated!');
        rl.close();
        await client.close();
        return;
      }
      
      // Deactivate account
      await adminsCollection.updateOne(
        { email },
        { 
          $set: { 
            isActive: false,
            updatedAt: new Date()
          } 
        }
      );
      
      console.log(`\n✅ Admin account deactivated: ${email}`);
      console.log('⚠️ This admin can no longer login.');
      
    } else if (choice === '5') {
      // Activate admin account
      const email = await question('\nEnter admin email to activate: ');
      
      const admin = await adminsCollection.findOne({ email });
      if (!admin) {
        console.log('\n❌ Admin not found!');
        rl.close();
        await client.close();
        return;
      }
      
      if (admin.isActive === true) {
        console.log('\n⚠️ Admin account is already active!');
        rl.close();
        await client.close();
        return;
      }
      
      // Activate account
      await adminsCollection.updateOne(
        { email },
        { 
          $set: { 
            isActive: true,
            updatedAt: new Date()
          } 
        }
      );
      
      console.log(`\n✅ Admin account activated: ${email}`);
      console.log('✓ This admin can now login.');
      
    } else if (choice === '6') {
      // Delete admin account
      const email = await question('\nEnter admin email to DELETE: ');
      
      const admin = await adminsCollection.findOne({ email });
      if (!admin) {
        console.log('\n❌ Admin not found!');
        rl.close();
        await client.close();
        return;
      }
      
      console.log(`\n⚠️ WARNING: You are about to permanently delete this admin account:`);
      console.log(`📧 Email: ${email}`);
      console.log(`👤 Name: ${admin.name || 'N/A'}`);
      
      const confirm = await question('\nType "DELETE" to confirm: ');
      
      if (confirm !== 'DELETE') {
        console.log('\n❌ Deletion cancelled.');
        rl.close();
        await client.close();
        return;
      }
      
      // Delete account
      await adminsCollection.deleteOne({ email });
      
      console.log(`\n✅ Admin account permanently deleted: ${email}`);
      
    } else {
      console.log('\n❌ Invalid choice!');
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    rl.close();
    if (client) {
      await client.close();
      console.log('\n✅ Disconnected from MongoDB\n');
    }
  }
}

manageAdmin();
