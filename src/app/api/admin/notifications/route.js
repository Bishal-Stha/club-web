import sql from "@/app/api/utils/sql";

// Create new notification
export async function POST(request) {
  try {
    const notificationData = await request.json();
    
    const {
      title,
      message,
      notification_type,
      expires_at
    } = notificationData;

    if (!title || !message) {
      return Response.json(
        { message: 'Title and message are required' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO notifications (
        title, message, notification_type, expires_at
      ) VALUES (
        ${title}, ${message}, ${notification_type || 'general'}, 
        ${expires_at || null}
      )
      RETURNING *
    `;

    return Response.json({ 
      success: true, 
      notification: result[0],
      message: 'Notification created successfully' 
    });

  } catch (error) {
    console.error('Error creating notification:', error);
    return Response.json(
      { message: 'Failed to create notification' },
      { status: 500 }
    );
  }
}

// Get all notifications for admin
export async function GET(request) {
  try {
    const notifications = await sql`
      SELECT * FROM notifications
      ORDER BY created_at DESC
    `;

    return Response.json(notifications);

  } catch (error) {
    console.error('Error fetching notifications:', error);
    return Response.json(
      { message: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}