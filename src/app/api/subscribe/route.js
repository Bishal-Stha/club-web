import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return Response.json(
        { error: 'Email is required' }, 
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Invalid email format' }, 
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await sql`
      SELECT id, is_active FROM email_subscribers 
      WHERE email = ${email}
    `;

    if (existingSubscriber.length > 0) {
      if (existingSubscriber[0].is_active) {
        return Response.json(
          { error: 'Email is already subscribed' }, 
          { status: 409 }
        );
      } else {
        // Reactivate subscription
        await sql`
          UPDATE email_subscribers 
          SET is_active = true, subscribed_at = CURRENT_TIMESTAMP
          WHERE email = ${email}
        `;
        return Response.json({ message: 'Successfully subscribed!' });
      }
    }

    // Create new subscription
    const result = await sql`
      INSERT INTO email_subscribers (email)
      VALUES (${email})
      RETURNING *
    `;

    return Response.json({ 
      message: 'Successfully subscribed!',
      subscriber: result[0]
    }, { status: 201 });

  } catch (error) {
    console.error('Error subscribing email:', error);
    return Response.json(
      { error: 'Failed to subscribe' }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subscribers = await sql`
      SELECT 
        id,
        email,
        subscribed_at
      FROM email_subscribers 
      WHERE is_active = true
      ORDER BY subscribed_at DESC
    `;
    
    return Response.json(subscribers);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return Response.json(
      { error: 'Failed to fetch subscribers' }, 
      { status: 500 }
    );
  }
}