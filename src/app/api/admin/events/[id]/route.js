import sql from "@/app/api/utils/sql";

// Update event
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const eventData = await request.json();
    
    const {
      title,
      description,
      event_type,
      event_date,
      location,
      image_url,
      registration_link,
      max_participants
    } = eventData;

    // Determine if event is upcoming based on date
    const eventDateTime = new Date(event_date);
    const now = new Date();
    const is_upcoming = eventDateTime > now;

    const result = await sql`
      UPDATE events SET
        title = ${title},
        description = ${description},
        event_type = ${event_type},
        event_date = ${event_date},
        location = ${location},
        image_url = ${image_url || null},
        registration_link = ${registration_link || null},
        max_participants = ${max_participants ? parseInt(max_participants) : null},
        is_upcoming = ${is_upcoming},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return Response.json(
        { message: 'Event not found' },
        { status: 404 }
      );
    }

    return Response.json({ 
      success: true, 
      event: result[0],
      message: 'Event updated successfully' 
    });

  } catch (error) {
    console.error('Error updating event:', error);
    return Response.json(
      { message: 'Failed to update event' },
      { status: 500 }
    );
  }
}

// Delete event
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const result = await sql`
      DELETE FROM events 
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return Response.json(
        { message: 'Event not found' },
        { status: 404 }
      );
    }

    return Response.json({ 
      success: true,
      message: 'Event deleted successfully' 
    });

  } catch (error) {
    console.error('Error deleting event:', error);
    return Response.json(
      { message: 'Failed to delete event' },
      { status: 500 }
    );
  }
}

// Get single event
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const result = await sql`
      SELECT * FROM events 
      WHERE id = ${id}
    `;

    if (result.length === 0) {
      return Response.json(
        { message: 'Event not found' },
        { status: 404 }
      );
    }

    return Response.json(result[0]);

  } catch (error) {
    console.error('Error fetching event:', error);
    return Response.json(
      { message: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}