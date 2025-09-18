"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { createSupabaseClient } from "@/lib/supabase";

interface PhotoUploadProps {
  onUploadComplete: (url: string) => void;
  onUploadError: (error: string) => void;
  onFileSelect?: (file: File) => void; // For new players
  currentPhotoUrl?: string;
  teamId: number;
  playerId?: number; // Optional for new players
  disabled?: boolean;
}

// Helper function to upload photo after player is created
export const uploadPlayerPhoto = async (
  file: File,
  teamId: number,
  playerId: number
): Promise<string> => {
  const supabase = createSupabaseClient();

  // Compress the image
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  const compressedFile = await new Promise<File>((resolve) => {
    img.onload = () => {
      let { width, height } = img;
      if (width > 800) {
        height = (height * 800) / width;
        width = 800;
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        },
        "image/jpeg",
        0.8
      );
    };
    img.src = URL.createObjectURL(file);
  });

  // Upload directly to final location
  const fileName = `${teamId}/${playerId}.jpg`;
  const { data: _data, error } = await supabase.storage
    .from("players")
    .upload(fileName, compressedFile, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Storage upload error:", error);
    if (
      error.message.includes("bucket") ||
      error.message.includes("not found")
    ) {
      throw new Error(
        "Storage bucket 'player-photos' not found. Please create it in your Supabase dashboard."
      );
    }
    throw error;
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from("players")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
};

export default function PhotoUpload({
  onUploadComplete,
  onUploadError,
  onFileSelect,
  currentPhotoUrl,
  teamId,
  playerId,
  disabled = false,
}: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    currentPhotoUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compress image function
  const compressImage = (
    file: File,
    maxWidth: number = 800,
    quality: number = 0.8
  ): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          "image/jpeg",
          quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      onUploadError("Please select a valid image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      onUploadError("File size must be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      // Compress the image
      const compressedFile = await compressImage(file);

      // Create preview
      const previewUrl = URL.createObjectURL(compressedFile);
      setPreview(previewUrl);

      // For existing players, upload directly
      if (playerId) {
        const fileExtension = "jpg"; // Always use jpg after compression
        const fileName = `${teamId}/${playerId}.${fileExtension}`;

        // Upload to Supabase storage
        const supabase = createSupabaseClient();
        const { data: _data, error } = await supabase.storage
          .from("players")
          .upload(fileName, compressedFile, {
            cacheControl: "3600",
            upsert: true,
          });

        if (error) {
          console.error("Storage upload error:", error);
          if (
            error.message.includes("bucket") ||
            error.message.includes("not found")
          ) {
            throw new Error(
              "Storage bucket 'players' not found. Please create it in your Supabase dashboard."
            );
          }
          throw error;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from("players")
          .getPublicUrl(fileName);

        onUploadComplete(urlData.publicUrl);
      } else {
        // For new players, store the file and create preview
        if (onFileSelect) {
          onFileSelect(compressedFile);
        }
        onUploadComplete(URL.createObjectURL(compressedFile));
      }
    } catch (error) {
      console.error("Upload error:", error);
      onUploadError(
        error instanceof Error ? error.message : "Failed to upload image"
      );
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onUploadComplete("");
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "600",
          }}
        >
          Player Photo
        </label>

        {/* Preview */}
        {preview && (
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "0.5rem",
              overflow: "hidden",
              marginBottom: "1rem",
              border: "2px solid #e5e7eb",
            }}
          >
            <img
              src={preview}
              alt="Player preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        {/* Upload Controls */}
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading || disabled}
            style={{ display: "none" }}
          />

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || disabled}
          >
            {uploading
              ? "Uploading..."
              : preview
              ? "Change Photo"
              : "Upload Photo"}
          </Button>

          {preview && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemovePhoto}
              disabled={uploading || disabled}
            >
              Remove
            </Button>
          )}
        </div>

        <p
          style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.5rem" }}
        >
          Recommended: JPG, PNG, or WebP. Max 5MB. Images will be compressed to
          800px width.
        </p>
      </div>
    </div>
  );
}
