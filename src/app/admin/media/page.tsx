"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MediaAdmin() {
  const [mediaFiles, setMediaFiles] = useState([
    {
      id: 1,
      filename: "basketball-championship.jpg",
      url: "/api/placeholder/400/250",
      altText: "Basketball team celebrating championship",
      type: "image",
      size: 245760,
      uploadDate: "2024-12-16",
    },
    {
      id: 2,
      filename: "soccer-goal.mp4",
      url: "/api/placeholder/400/250",
      altText: "Amazing goal from soccer game",
      type: "video",
      size: 15728640,
      uploadDate: "2024-12-15",
    },
    {
      id: 3,
      filename: "team-photo.jpg",
      url: "/api/placeholder/400/250",
      altText: "Team photo after victory",
      type: "image",
      size: 512000,
      uploadDate: "2024-12-14",
    },
  ]);

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileUpload = async (files: FileList) => {
    setUploading(true);

    // Simulate file upload
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const newMedia = {
        id: Date.now() + i,
        filename: file.name,
        url: URL.createObjectURL(file),
        altText: "",
        type: file.type.startsWith("video/") ? "video" : "image",
        size: file.size,
        uploadDate: new Date().toISOString().split("T")[0],
      };

      setMediaFiles((prev) => [newMedia, ...prev]);
    }

    setUploading(false);
    setShowUploadForm(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      {/* Admin Header */}
      <div
        style={{
          backgroundColor: "#8b0000",
          color: "white",
          padding: "1rem 0",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Link
                href="/admin"
                style={{ color: "white", textDecoration: "none" }}
              >
                ← Back to Dashboard
              </Link>
              <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                Media Library
              </h1>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link
                href="/"
                style={{
                  color: "white",
                  textDecoration: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
              >
                View Site
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}
      >
        {/* Header Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "1.875rem",
                fontWeight: "bold",
                color: "#1f2937",
                marginBottom: "0.5rem",
              }}
            >
              Media Library
            </h2>
            <p style={{ color: "#6b7280" }}>
              Upload and manage images and videos for your sports content.
            </p>
          </div>
          <Button
            onClick={() => setShowUploadForm(true)}
            style={{ backgroundColor: "#8b0000" }}
          >
            + Upload Media
          </Button>
        </div>

        {/* Upload Area */}
        {showUploadForm && (
          <Card style={{ marginBottom: "2rem" }}>
            <CardHeader>
              <CardTitle>Upload New Media</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                style={{
                  border: `2px dashed ${dragOver ? "#8b0000" : "#d1d5db"}`,
                  borderRadius: "0.5rem",
                  padding: "3rem",
                  textAlign: "center",
                  backgroundColor: dragOver ? "#fef2f2" : "#f9fafb",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onClick={() => document.getElementById("file-input")?.click()}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📁</div>
                <p
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#1f2937",
                    marginBottom: "0.5rem",
                  }}
                >
                  Drop files here or click to browse
                </p>
                <p style={{ color: "#6b7280" }}>
                  Supports images and videos up to 10MB
                </p>
                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (e.target.files) {
                      handleFileUpload(e.target.files);
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Media Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {mediaFiles.map((file) => (
            <Card key={file.id}>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    aspectRatio: "16/9",
                    backgroundColor: "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                  }}
                >
                  {file.type === "video" ? "🎥" : "🖼️"}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "0.5rem",
                    backgroundColor: "rgba(0,0,0,0.7)",
                    color: "white",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  {file.type.toUpperCase()}
                </div>
              </div>
              <CardContent style={{ padding: "1rem" }}>
                <h3
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#1f2937",
                    marginBottom: "0.5rem",
                    wordBreak: "break-word",
                  }}
                >
                  {file.filename}
                </h3>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#6b7280",
                    marginBottom: "0.5rem",
                  }}
                >
                  {formatFileSize(file.size)}
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#6b7280",
                    marginBottom: "1rem",
                  }}
                >
                  {file.uploadDate}
                </p>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Button variant="secondary" size="sm" style={{ flex: 1 }}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to delete this file?")
                      ) {
                        setMediaFiles(
                          mediaFiles.filter((f) => f.id !== file.id)
                        );
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mediaFiles.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              color: "#6b7280",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📁</div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              No media files yet
            </h3>
            <p>Upload your first image or video to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
