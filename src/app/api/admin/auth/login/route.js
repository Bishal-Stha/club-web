import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // For demo purposes, using simple password comparison
    // In production, use proper password hashing (bcrypt)
    if (email === 'admin@godawariitclub.com' && password === 'admin123') {
      // Log the login activity
      await sql`
        INSERT INTO user_activity_logs (user_email, action, details, ip_address)
        VALUES (${email}, 'admin_login', 'Successful admin login', ${request.headers.get('x-forwarded-for') || 'unknown'})
      `;

      // Generate a simple token (in production, use JWT)
      const token = `admin_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      
      return Response.json({
        success: true,
        token,
        admin: {
          id: 1,
          email: email,
          full_name: 'Admin User',
          role: 'admin'
        }
      });
    }

    // Check database for admin users (for future extensibility)
    const adminUsers = await sql`
      SELECT id, email, full_name, role, password_hash 
      FROM admin_users 
      WHERE email = ${email} AND is_active = true
    `;

    if (adminUsers.length === 0) {
      // Log failed login attempt
      await sql`
        INSERT INTO user_activity_logs (user_email, action, details, ip_address)
        VALUES (${email}, 'admin_login_failed', 'Invalid email', ${request.headers.get('x-forwarded-for') || 'unknown'})
      `;
      
      return Response.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const admin = adminUsers[0];
    
    // In production, verify password hash here
    // const isValidPassword = await bcrypt.compare(password, admin.password_hash);
    
    // For now, accepting any password for database admins (update as needed)
    
    // Update last login
    await sql`
      UPDATE admin_users 
      SET last_login = CURRENT_TIMESTAMP 
      WHERE id = ${admin.id}
    `;

    // Log successful login
    await sql`
      INSERT INTO user_activity_logs (user_email, action, details, ip_address)
      VALUES (${email}, 'admin_login', 'Successful admin login', ${request.headers.get('x-forwarded-for') || 'unknown'})
    `;

    // Generate token
    const token = `admin_${admin.id}_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    
    return Response.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        full_name: admin.full_name,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    return Response.json(
      { message: 'Login failed' },
      { status: 500 }
    );
  }
}