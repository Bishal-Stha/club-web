import sql from "@/app/api/utils/sql";

// Update notification
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const notificationData = await request.json();
    
    const {
      title,
      message,
      notification_type,
      expires_at,
      is_active
    } = notificationData;

    const result = await sql`
      UPDATE notifications SET
        title = ${title},
        message = ${message},
        notification_type = ${notification_type || 'general'},
        expires_at = ${expires_at || null},
        is_active = ${is_active !== undefined ? is_active : true}
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return Response.json(
        { message: 'Notification not found' },
        { status: 404 }
      );
    }

    return Response.json({ 
      success: true, 
      notification: result[0],
      message: 'Notification updated successfully' 
    });

  } catch (error) {
    console.error('Error updating notification:', error);
    return Response.json(
      { message: 'Failed to update notification' },
      { status: 500 }
    );
  }
}

// Delete notification
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const result = await sql`
      DELETE FROM notifications 
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return Response.json(
        { message: 'Notification not found' },
        { status: 404 }
      );
    }

    return Response.json({ 
      success: true,
      message: 'Notification deleted successfully' 
    });

  } catch (error) {
    console.error('Error deleting notification:', error);
    return Response.json(
      { message: 'Failed to delete notification' },
      { status: 500 }
    );
  }
}

// Get single notification
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const result = await sql`
      SELECT * FROM notifications 
      WHERE id = ${id}
    `;

    if (result.length === 0) {
      return Response.json(
        { message: 'Notification not found' },
        { status: 404 }
      );
    }

    return Response.json(result[0]);

  } catch (error) {
    console.error('Error fetching notification:', error);
    return Response.json(
      { message: 'Failed to fetch notification' },
      { status: 500 }
    );
  }
}