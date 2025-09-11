# Supabase Authentication Setup Guide

This guide will help you set up Supabase authentication for your admin panel.

## Step 1: Enable Authentication in Supabase

1. **Go to your Supabase Dashboard**

   - Navigate to [supabase.com](https://supabase.com) and open your project

2. **Enable Authentication**

   - Go to "Authentication" in the left sidebar
   - Click on "Settings" tab
   - Make sure "Enable email confirmations" is turned ON
   - Set "Site URL" to `http://localhost:3001` (for development)

3. **Configure Email Templates (Optional)**
   - Go to "Authentication" > "Email Templates"
   - Customize the confirmation email template if desired

## Step 2: Create Your First Admin User

1. **Go to Authentication > Users**
2. **Click "Add user"**
3. **Enter admin details**:
   - Email: `admin@yourdomain.com`
   - Password: Choose a strong password
   - Auto Confirm User: ✅ (check this box)
4. **Click "Create user"**

## Step 3: Test the Authentication

1. **Start your development server**:

   ```bash
   npm run dev
   ```

2. **Go to the admin login**:

   - Visit `http://localhost:3001/admin/login`

3. **Sign in with your admin account**:
   - Use the email and password you created in Step 2

## Step 4: Create Additional Users (Optional)

You can create additional admin users in two ways:

### Method 1: Through Supabase Dashboard

1. Go to Authentication > Users
2. Click "Add user"
3. Enter user details and create

### Method 2: Through the Admin Panel

1. Go to the login page
2. Click "Don't have an account? Sign up"
3. Enter email and password
4. Check your email for confirmation link
5. Click the confirmation link
6. Sign in with your new account

## Step 5: Production Setup

For production deployment:

1. **Update Site URL**:

   - In Supabase Dashboard > Authentication > Settings
   - Change "Site URL" to your production domain
   - Add your production domain to "Redirect URLs"

2. **Configure Email Settings**:

   - Set up custom SMTP if desired
   - Or use Supabase's built-in email service

3. **Set Environment Variables**:
   - Make sure your production environment has the correct Supabase credentials

## Security Features

The Supabase authentication includes:

- ✅ **Email verification** - Users must confirm their email
- ✅ **Secure password requirements** - Enforced by Supabase
- ✅ **Session management** - Automatic token refresh
- ✅ **Route protection** - Middleware protects admin routes
- ✅ **Logout functionality** - Proper session cleanup

## Troubleshooting

### "Invalid login credentials"

- Make sure the user exists in Supabase
- Check if email confirmation is required
- Verify the password is correct

### "Email not confirmed"

- Check the user's email for confirmation link
- Or manually confirm the user in Supabase Dashboard

### "Redirect URL mismatch"

- Check your Site URL settings in Supabase
- Make sure localhost:3001 is allowed for development

### Session not persisting

- Check your environment variables
- Make sure cookies are enabled in your browser

## Next Steps

Once authentication is working:

1. **Customize user roles** - Add role-based permissions
2. **Add user management** - Create user management interface
3. **Set up email templates** - Customize confirmation emails
4. **Add social auth** - Enable Google/GitHub login (optional)

Your admin panel now has secure, professional authentication powered by Supabase!
