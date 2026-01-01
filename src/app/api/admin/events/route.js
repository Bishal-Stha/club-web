import sql from "@/app/api/utils/sql";

// Create new event
export async function POST(request) {
  try {
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

    if (!title || !description || !event_type || !event_date) {
      return Response.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Determine if event is upcoming based on date
    const eventDateTime = new Date(event_date);
    const now = new Date();
    const is_upcoming = eventDateTime > now;

    const result = await sql`
      INSERT INTO events (
        title, description, event_type, event_date, location, 
        image_url, registration_link, max_participants, is_upcoming
      ) VALUES (
        ${title}, ${description}, ${event_type}, ${event_date}, ${location},
        ${image_url || null}, ${registration_link || null}, 
        ${max_participants ? parseInt(max_participants) : null}, ${is_upcoming}
      )
      RETURNING *
    `;

    return Response.json({ 
      success: true, 
      event: result[0],
      message: 'Event created successfully' 
    });

  } catch (error) {
    console.error('Error creating event:', error);
    return Response.json(
      { message: 'Failed to create event' },
      { status: 500 }
    );
  }
}

// Get all events for admin
export async function GET(request) {
  try {
    const events = await sql`
      SELECT * FROM events
      ORDER BY event_date DESC
    `;

    return Response.json(events);

  } catch (error) {
    console.error('Error fetching events:', error);
    return Response.json(
      { message: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}