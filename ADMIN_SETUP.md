# Admin Panel Setup Guide

This guide will help you set up the admin panel for your Unbenched sports website with Supabase integration.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. Node.js and npm installed
3. Your existing Next.js project

## Step 1: Set up Supabase

1. **Create a new Supabase project:**

   - Go to [supabase.com](https://supabase.com) and create a new project
   - Choose a name like "unbenched-sports"
   - Note down your project URL and anon key

2. **Set up the database schema:**

   - In your Supabase dashboard, go to the SQL Editor
   - Copy and paste the contents of `database-schema.sql` from your project root
   - Run the SQL to create all necessary tables and sample data

3. **Configure Row Level Security (RLS):**
   - The schema includes RLS policies for public read access
   - For production, you'll want to implement proper authentication

## Step 2: Environment Configuration

1. **Create environment variables:**
   - Copy `.env.example` to `.env.local` (if it doesn't exist)
   - Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_SECRET_KEY=your_admin_secret_key
```

2. **Get your Supabase credentials:**
   - Go to your Supabase project settings
   - Copy the Project URL and anon public key
   - For the service role key, go to API settings and copy the service_role key

## Step 3: Install Dependencies

The required dependencies are already installed:

- `@supabase/supabase-js` - Supabase client
- `@supabase/ssr` - Server-side rendering support

## Step 4: Access the Admin Panel

1. **Start your development server:**

   ```bash
   npm run dev
   ```

2. **Access the admin panel:**

   - Go to `http://localhost:3000/admin/login`
   - Use the demo credentials:
     - Email: `admin@unbenched.com`
     - Password: `admin123`

3. **Admin panel features:**
   - **Dashboard**: Overview of content and quick stats
   - **Stories**: Manage news articles and stories
   - **Games**: Update game results and schedules
   - **Sports**: Manage sports teams and categories
   - **Media**: Upload and manage images/videos

## Step 5: File Upload Setup (Optional)

For production file uploads, you'll need to:

1. **Set up Supabase Storage:**

   - In your Supabase dashboard, go to Storage
   - Create a new bucket called "media"
   - Set appropriate policies for public access

2. **Update the media upload component:**
   - Modify `src/app/admin/media/page.tsx` to use Supabase Storage
   - Add proper file validation and error handling

## Step 6: Production Considerations

1. **Authentication:**

   - Replace the simple login with proper authentication
   - Consider using Supabase Auth or NextAuth.js
   - Implement proper user roles and permissions

2. **Security:**

   - Update RLS policies for production
   - Add proper input validation
   - Implement rate limiting

3. **Performance:**
   - Add image optimization
   - Implement caching strategies
   - Consider CDN for media files

## API Endpoints

The admin panel uses these API endpoints:

- `GET/POST /api/stories` - Stories management
- `GET/POST /api/games` - Games management
- `GET/POST /api/sports` - Sports management
- `GET/POST /api/media` - Media management

## Database Schema

The database includes these main tables:

- `stories` - News articles and stories
- `games` - Game results and schedules
- `sports` - Sports teams and categories
- `media` - File uploads and media library
- `admin_users` - Admin user management

## Troubleshooting

1. **Connection issues:**

   - Verify your Supabase URL and keys
   - Check that your project is active
   - Ensure RLS policies are set correctly

2. **Authentication issues:**

   - Clear browser cookies and localStorage
   - Check middleware configuration
   - Verify admin credentials

3. **File upload issues:**
   - Check Supabase Storage configuration
   - Verify file size limits
   - Check CORS settings

## Next Steps

1. Customize the admin panel styling to match your brand
2. Add more content management features
3. Implement real-time updates
4. Add analytics and reporting
5. Set up automated backups

For more help, check the [Supabase documentation](https://supabase.com/docs) or the [Next.js documentation](https://nextjs.org/docs).
