import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sportId = searchParams.get("sport_id");

    let query = supabase
      .from("players")
      .select("*")
      .eq("is_active", true)
      .order("number", { ascending: true });

    if (sportId) {
      query = query.eq("sport_id", sportId);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch players" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sport_id,
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
    } = body;

    const { data, error } = await supabase
      .from("players")
      .insert([
        {
          sport_id,
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
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create player" },
      { status: 500 }
    );
  }
}
