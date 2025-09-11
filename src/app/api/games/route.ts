import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      home_team,
      away_team,
      home_score,
      away_score,
      sport,
      date,
      status,
    } = body;

    const { data, error } = await supabase
      .from("games")
      .insert([
        {
          home_team,
          away_team,
          home_score: home_score || 0,
          away_score: away_score || 0,
          sport,
          date,
          status: status || "upcoming",
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create game" },
      { status: 500 }
    );
  }
}
