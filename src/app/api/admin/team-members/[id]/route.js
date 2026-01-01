import sql from "@/app/api/utils/sql";

// Update team member
export async function PUT(request, { params }) {
  try {
    const { id } = params;
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

    const result = await sql`
      UPDATE team_members SET
        full_name = ${full_name},
        education_background = ${education_background},
        current_profession = ${current_profession},
        profile_image_url = ${profile_image_url || null},
        position = ${position || null},
        bio = ${bio || null},
        linkedin_url = ${linkedin_url || null},
        github_url = ${github_url || null},
        email = ${email || null},
        display_order = ${display_order ? parseInt(display_order) : 0},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} AND is_active = true
      RETURNING *
    `;

    if (result.length === 0) {
      return Response.json(
        { message: 'Team member not found' },
        { status: 404 }
      );
    }

    return Response.json({ 
      success: true, 
      member: result[0],
      message: 'Team member updated successfully' 
    });

  } catch (error) {
    console.error('Error updating team member:', error);
    return Response.json(
      { message: 'Failed to update team member' },
      { status: 500 }
    );
  }
}

// Delete team member (soft delete)
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const result = await sql`
      UPDATE team_members 
      SET is_active = false, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return Response.json(
        { message: 'Team member not found' },
        { status: 404 }
      );
    }

    return Response.json({ 
      success: true,
      message: 'Team member deleted successfully' 
    });

  } catch (error) {
    console.error('Error deleting team member:', error);
    return Response.json(
      { message: 'Failed to delete team member' },
      { status: 500 }
    );
  }
}

// Get single team member
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const result = await sql`
      SELECT * FROM team_members 
      WHERE id = ${id} AND is_active = true
    `;

    if (result.length === 0) {
      return Response.json(
        { message: 'Team member not found' },
        { status: 404 }
      );
    }

    return Response.json(result[0]);

  } catch (error) {
    console.error('Error fetching team member:', error);
    return Response.json(
      { message: 'Failed to fetch team member' },
      { status: 500 }
    );
  }
}