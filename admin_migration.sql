-- Create user_activity_logs table
CREATE TABLE IF NOT EXISTS user_activity_logs (
    id SERIAL PRIMARY KEY,
    user_email TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    password_hash TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    notification_type TEXT DEFAULT 'general',
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create email_subscribers table
CREATE TABLE IF NOT EXISTS email_subscribers (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (optional, hardcoded credentials also work)
-- Password is 'admin123' (though the API currently has a hardcoded check for it)
INSERT INTO admin_users (email, full_name, role, is_active)
VALUES ('admin@godawariitclub.com', 'Admin User', 'admin', true)
ON CONFLICT (email) DO NOTHING;

-- Insert some dummy data
INSERT INTO notifications (title, message, notification_type)
VALUES 
('Welcome to Admin', 'This is a test notification for the admin dashboard.', 'general'),
('System Update', 'Database migration for admin features completed.', 'urgent')
ON CONFLICT DO NOTHING;

INSERT INTO email_subscribers (email)
VALUES ('test@example.com'), ('hello@world.com')
ON CONFLICT (email) DO NOTHING;
