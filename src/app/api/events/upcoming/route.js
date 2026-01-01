import sql from "@/app/api/utils/sql";

export async function GET() {
  try {
    const upcomingEvents = await sql`
      SELECT 
        id, 
        title, 
        description, 
        event_type, 
        event_date, 
        location, 
        image_url, 
        registration_link, 
        max_participants, 
        current_participants
      FROM events 
      WHERE event_date > NOW()
      ORDER BY event_date ASC
      LIMIT 10
    `;
    
    return Response.json(upcomingEvents);
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    return Response.json(
      { error: 'Failed to fetch upcoming events' }, 
      { status: 500 }
    );
  }
}