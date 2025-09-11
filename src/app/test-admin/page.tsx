"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestAdmin() {
  const [testResults, setTestResults] = useState<
    Record<string, { status: string; data?: unknown; error?: string }>
  >({});
  const [loading, setLoading] = useState(false);

  const testAPI = async (endpoint: string, name: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/${endpoint}`);
      const data = await response.json();
      setTestResults((prev) => ({
        ...prev,
        [name]: { status: response.ok ? "success" : "error", data: data },
      }));
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        [name]: {
          status: "error",
          error: error instanceof Error ? error.message : String(error),
        },
      }));
    } finally {
      setLoading(false);
    }
  };

  const testAllAPIs = async () => {
    await Promise.all([
      testAPI("stories", "Stories"),
      testAPI("games", "Games"),
      testAPI("sports", "Sports"),
    ]);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "2rem",
            color: "#1f2937",
          }}
        >
          Admin Panel API Test
        </h1>

        <Card style={{ marginBottom: "2rem" }}>
          <CardHeader>
            <CardTitle>Test API Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Button
                onClick={() => testAPI("stories", "Stories")}
                disabled={loading}
                style={{ backgroundColor: "#8b0000" }}
              >
                Test Stories API
              </Button>
              <Button
                onClick={() => testAPI("games", "Games")}
                disabled={loading}
                style={{ backgroundColor: "#8b0000" }}
              >
                Test Games API
              </Button>
              <Button
                onClick={() => testAPI("sports", "Sports")}
                disabled={loading}
                style={{ backgroundColor: "#8b0000" }}
              >
                Test Sports API
              </Button>
              <Button
                onClick={testAllAPIs}
                disabled={loading}
                variant="secondary"
              >
                Test All APIs
              </Button>
            </div>
          </CardContent>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {Object.entries(testResults).map(([name, result]) => (
            <Card key={name}>
              <CardHeader>
                <CardTitle
                  style={{
                    color: result.status === "success" ? "#10B981" : "#EF4444",
                    fontSize: "1.25rem",
                  }}
                >
                  {name} API {result.status === "success" ? "✅" : "❌"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre
                  style={{
                    backgroundColor: "#f3f4f6",
                    padding: "1rem",
                    borderRadius: "0.375rem",
                    overflow: "auto",
                    fontSize: "0.875rem",
                  }}
                >
                  {JSON.stringify(result, null, 2)}
                </pre>
              </CardContent>
            </Card>
          ))}
        </div>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <Button
            onClick={() => (window.location.href = "/admin")}
            style={{ backgroundColor: "#8b0000" }}
          >
            Go to Admin Panel
          </Button>
        </div>
      </div>
    </div>
  );
}
