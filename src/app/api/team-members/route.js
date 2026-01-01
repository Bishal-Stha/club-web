import sql from "@/app/api/utils/sql";

export async function GET() {
  try {
    const teamMembers = await sql`
      SELECT 
        id, 
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
      FROM team_members 
      WHERE is_active = true 
      ORDER BY display_order ASC, created_at ASC
    `;

    return Response.json(teamMembers);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return Response.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
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
      display_order = 0,
    } = body;

    if (!full_name || !education_background || !current_profession) {
      return Response.json(
        {
          error:
            "Missing required fields: full_name, education_background, current_profession",
        },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO team_members (
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
      )
      VALUES (
        ${full_name}, 
        ${education_background}, 
        ${current_profession}, 
        ${profile_image_url}, 
        ${position}, 
        ${bio}, 
        ${linkedin_url}, 
        ${github_url}, 
        ${email},
        ${display_order}
      )
      RETURNING *
    `;

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating team member:", error);
    return Response.json(
      { error: "Failed to create team member" },
      { status: 500 }
    );
  }
}