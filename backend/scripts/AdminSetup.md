# Admin Management CLI Tool

This CLI tool allows you to manage admin users for the Opportunity Central application.

## Prerequisites

- Node.js installed
- MongoDB running
- Backend `.env` file configured with `MONGODB_URI` and `MONGODB_DB_NAME`

## Usage

From the `/backend` directory, run:

```bash
npm run admin
```

## Features

### 1. Create New Admin

Creates a new admin user with name, email, and password.

**Steps:**
1. Run `npm run admin`
2. Select option `1`
3. Enter admin name
4. Enter admin email
5. Enter password (minimum 6 characters)
6. Confirm password

**Admin Fields Created:**
- `name` - Admin's full name
- `email` - Login email (unique)
- `password` - Hashed with bcrypt
- `createdAt` - Account creation timestamp
- `lastLogin` - Last successful login (null initially)
- `isActive` - Account status (true by default)
- `updatedAt` - Last modification timestamp

**Example:**
```
What would you like to do?
1. Create new admin
2. Reset admin password
3. List all admins
4. Deactivate admin account
5. Activate admin account
6. Delete admin account

Enter choice (1-6): 1

Enter admin name: John Doe
Enter admin email: admin@opportunitycentral.com
Enter password: ******
Confirm password: ******

✅ Admin created successfully!
� Name: John Doe
�📧 Email: admin@opportunitycentral.com
✓ Status: Active
```

### 2. Reset Admin Password

Resets the password for an existing admin user.

**Steps:**
1. Run `npm run admin`
2. Select option `2`
3. Enter admin email
4. Enter new password (minimum 6 characters)
5. Confirm new password

**Example:**
```
Enter choice (1-6): 2

Enter admin email: admin@opportunitycentral.com
Enter new password: ******
Confirm new password: ******

✅ Password reset successfully for admin@opportunitycentral.com!
```

### 3. List All Admins

Displays all admin users in the database with their status.

**Steps:**
1. Run `npm run admin`
2. Select option `3`

**Example:**
```
Enter choice (1-6): 3

📋 Found 2 admin(s):

1. John Doe (admin@opportunitycentral.com)
   Status: ✓ Active
   Created: 4/5/2026
   Last Login: 4/5/2026

2. Jane Smith (editor@opportunitycentral.com)
   Status: ✗ Deactivated
   Created: 4/4/2026
   Last Login: Never
```

### 4. Deactivate Admin Account

Deactivates an admin account, preventing login without deleting the account.

**Steps:**
1. Run `npm run admin`
2. Select option `4`
3. Enter admin email to deactivate

**Example:**
```
Enter choice (1-6): 4

Enter admin email to deactivate: editor@opportunitycentral.com

✅ Admin account deactivated: editor@opportunitycentral.com
⚠️ This admin can no longer login.
```

**Note:** Deactivated admins cannot login but their data is preserved. Use this for temporary suspension.

### 5. Activate Admin Account

Re-activates a previously deactivated admin account.

**Steps:**
1. Run `npm run admin`
2. Select option `5`
3. Enter admin email to activate

**Example:**
```
Enter choice (1-6): 5

Enter admin email to activate: editor@opportunitycentral.com

✅ Admin account activated: editor@opportunitycentral.com
✓ This admin can now login.
```

### 6. Delete Admin Account

Permanently deletes an admin account from the database.

**Steps:**
1. Run `npm run admin`
2. Select option `6`
3. Enter admin email to delete
4. Type "DELETE" to confirm

**Example:**
```
Enter choice (1-6): 6

Enter admin email to DELETE: old-admin@opportunitycentral.com

⚠️ WARNING: You are about to permanently delete this admin account:
📧 Email: old-admin@opportunitycentral.com
👤 Name: Old Admin

Type "DELETE" to confirm: DELETE

✅ Admin account permanently deleted: old-admin@opportunitycentral.com
```

**Warning:** This action is irreversible! Consider using deactivate (option 4) instead for temporary suspension.

## Security Notes

- Passwords are hashed using bcrypt with 10 salt rounds
- Minimum password length is 6 characters
- This script requires direct server access
- Use strong, unique passwords for all admin accounts

## Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env` file
- Verify network connectivity

### "Admin already exists"
- Use option 2 to reset the password instead
- Or use a different email address

### "Password too short"
- Passwords must be at least 6 characters
- Use a strong password with mixed characters

## Change Password via Dashboard

Admins can also change their own password after logging in:

1. Login to admin dashboard
2. Click "Change Password" button (next to Logout)
3. Enter current password
4. Enter new password (minimum 6 characters)
5. Confirm new password
6. Click "Change Password"

This method does not require server access and is recommended for regular password updates.
