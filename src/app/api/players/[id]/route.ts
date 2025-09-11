import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch player" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      name,
      number,
      position,
      bio,
      photo_url,
      height,
      weight,
      year,
      hometown,
      major,
      is_active,
    } = body;

    const { data, error } = await supabase
      .from("players")
      .update({
        name,
        number,
        position,
        bio,
        photo_url,
        height,
        weight,
        year,
        hometown,
        major,
        is_active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update player" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from("players")
      .delete()
      .eq("id", params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Player deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete player" },
      { status: 500 }
    );
  }
}
