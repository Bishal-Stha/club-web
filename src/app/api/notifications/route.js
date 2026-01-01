import sql from "@/app/api/utils/sql";

export async function GET() {
  try {
    const notifications = await sql`
      SELECT 
        id, 
        title, 
        message, 
        notification_type, 
        created_at,
        expires_at
      FROM notifications 
      WHERE is_active = true 
      AND (expires_at IS NULL OR expires_at > NOW())
      ORDER BY created_at DESC
      LIMIT 10
    `;
    
    return Response.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return Response.json(
      { error: 'Failed to fetch notifications' }, 
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      title, 
      message, 
      notification_type = 'general',
      expires_at
    } = body;

    if (!title || !message) {
      return Response.json(
        { error: 'Missing required fields: title, message' }, 
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO notifications (
        title, 
        message, 
        notification_type,
        expires_at
      )
      VALUES (
        ${title}, 
        ${message}, 
        ${notification_type},
        ${expires_at}
      )
      RETURNING *
    `;

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating notification:', error);
    return Response.json(
      { error: 'Failed to create notification' }, 
      { status: 500 }
    );
  }
}