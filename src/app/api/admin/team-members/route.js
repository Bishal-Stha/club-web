import sql from "@/app/api/utils/sql";

// Create new team member
export async function POST(request) {
  try {
    const memberData = await request.json();
    
    const {
      full_name,
      education_background,
      current_profession,
      profile_image_url,
      position,
      bio,
      linkedin_url,
      github_url,
      email,
      display_order
    } = memberData;

    if (!full_name || !education_background || !current_profession) {
      return Response.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO team_members (
        full_name, education_background, current_profession, 
        profile_image_url, position, bio, linkedin_url, 
        github_url, email, display_order
      ) VALUES (
        ${full_name}, ${education_background}, ${current_profession},
        ${profile_image_url || null}, ${position || null}, ${bio || null},
        ${linkedin_url || null}, ${github_url || null}, ${email || null},
        ${display_order ? parseInt(display_order) : 0}
      )
      RETURNING *
    `;

    return Response.json({ 
      success: true, 
      member: result[0],
      message: 'Team member created successfully' 
    });

  } catch (error) {
    console.error('Error creating team member:', error);
    return Response.json(
      { message: 'Failed to create team member' },
      { status: 500 }
    );
  }
}

// Get all team members for admin
export async function GET(request) {
  try {
    const members = await sql`
      SELECT * FROM team_members
      WHERE is_active = true
      ORDER BY display_order ASC, created_at DESC
    `;

    return Response.json(members);

  } catch (error) {
    console.error('Error fetching team members:', error);
    return Response.json(
      { message: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}