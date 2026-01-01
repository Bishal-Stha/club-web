import sql from "@/app/api/utils/sql";

// Get all email subscribers for admin
export async function GET(request) {
  try {
    const subscribers = await sql`
      SELECT id, email, is_active, subscribed_at
      FROM email_subscribers
      ORDER BY subscribed_at DESC
    `;

    return Response.json(subscribers);

  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return Response.json(
      { message: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

// Update subscriber status
export async function PUT(request) {
  try {
    const { email, is_active } = await request.json();

    if (!email) {
      return Response.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    const result = await sql`
      UPDATE email_subscribers 
      SET is_active = ${is_active}
      WHERE email = ${email}
      RETURNING *
    `;

    if (result.length === 0) {
      return Response.json(
        { message: 'Subscriber not found' },
        { status: 404 }
      );
    }

    return Response.json({ 
      success: true,
      subscriber: result[0],
      message: 'Subscriber status updated successfully' 
    });

  } catch (error) {
    console.error('Error updating subscriber:', error);
    return Response.json(
      { message: 'Failed to update subscriber' },
      { status: 500 }
    );
  }
}