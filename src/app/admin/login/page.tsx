"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseClient } from "@/lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp] = useState(false);
  const router = useRouter();
  const supabase = createSupabaseClient();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        router.push("/admin");
      }
    };
    checkUser();
  }, [router, supabase.auth]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          setError(error.message);
        } else if (data.user) {
          setError("Check your email for the confirmation link!");
        }
      } else {
        // Sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setError(error.message);
        } else if (data.user) {
          router.push("/admin");
        }
      }
    } catch (_err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card style={{ width: "100%", maxWidth: "400px" }}>
        <CardHeader style={{ textAlign: "center" }}>
          <div
            style={{
              width: "4rem",
              height: "4rem",
              backgroundColor: "#8b0000",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              fontSize: "1.5rem",
              color: "white",
            }}
          >
            🔐
          </div>
          <CardTitle style={{ fontSize: "1.5rem", color: "#1f2937" }}>
            Admin Login
          </CardTitle>
          <p style={{ color: "#6b7280", margin: 0 }}>
            Sign in to access the admin panel
          </p>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleAuth}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {error && (
              <div
                style={{
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#dc2626",
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                }}
              >
                {error}
              </div>
            )}

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.375rem",
                  fontSize: "1rem",
                }}
                placeholder="your-email@example.com"
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.375rem",
                  fontSize: "1rem",
                }}
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: "#8b0000",
                width: "100%",
              }}
            >
              {loading
                ? isSignUp
                  ? "Creating account..."
                  : "Signing in..."
                : isSignUp
                ? "Sign Up"
                : "Sign In"}
            </Button>
          </form>

          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              backgroundColor: "#f3f4f6",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
              color: "#6b7280",
            }}
          >
            <p style={{ margin: 0, fontWeight: "600", marginBottom: "0.5rem" }}>
              Supabase Authentication:
            </p>
            <p style={{ margin: 0 }}>• Create an account to get started</p>
            <p style={{ margin: 0 }}>• Check your email for confirmation</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
