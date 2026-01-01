import sql from "@/app/api/utils/sql";

export async function GET() {
  try {
    const events = await sql`
      SELECT 
        id, 
        title, 
        description, 
        event_type, 
        event_date, 
        location, 
        image_url, 
        is_upcoming, 
        registration_link, 
        max_participants, 
        current_participants,
        created_at,
        updated_at
      FROM events 
      ORDER BY event_date DESC
    `;
    
    return Response.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return Response.json(
      { error: 'Failed to fetch events' }, 
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      title, 
      description, 
      event_type, 
      event_date, 
      location, 
      image_url, 
      registration_link, 
      max_participants,
      current_participants = 0
    } = body;

    if (!title || !description || !event_type || !event_date) {
      return Response.json(
        { error: 'Missing required fields: title, description, event_type, event_date' }, 
        { status: 400 }
      );
    }

    // Determine if event is upcoming
    const eventDateTime = new Date(event_date);
    const now = new Date();
    const is_upcoming = eventDateTime > now;

    const result = await sql`
      INSERT INTO events (
        title, 
        description, 
        event_type, 
        event_date, 
        location, 
        image_url, 
        is_upcoming, 
        registration_link, 
        max_participants,
        current_participants
      )
      VALUES (
        ${title}, 
        ${description}, 
        ${event_type}, 
        ${event_date}, 
        ${location}, 
        ${image_url}, 
        ${is_upcoming}, 
        ${registration_link}, 
        ${max_participants},
        ${current_participants}
      )
      RETURNING *
    `;

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return Response.json(
      { error: 'Failed to create event' }, 
      { status: 500 }
    );
  }
}