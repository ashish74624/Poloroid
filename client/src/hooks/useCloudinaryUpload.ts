import { useState } from "react";
import toast from "react-hot-toast";

export function useCloudinaryUpload() {
    const [uploading, setUploading] = useState(false);

    // Convert any image file to compressed WebP (only if large)
    const convertToWebP = async (file: File): Promise<File> => {
        const isLarge = file.size > 1 * 1024 * 1024; // > 1MB

        if (!isLarge) return file; // No compression if file is small

        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                if (!ctx) return reject("Canvas not supported");

                ctx.drawImage(img, 0, 0);

                // convert to WebP (quality 0.7 ~ balanced size + quality)
                canvas.toBlob(
                    (blob) => {
                        if (!blob) return reject("Failed to convert to WebP");
                        resolve(new File([blob], file.name.split(".")[0] + ".webp", { type: "image/webp" }));
                    },
                    "image/webp",
                    0.7
                );
            };

            img.onerror = () => reject("Failed to load image");
        });
    };

    // Upload image to Cloudinary
    const uploadImage = async (file: File): Promise<string | null> => {
        if (!file) return null;

        try {
            setUploading(true);

            // Convert/compress before upload (only if large)
            const processedFile = await convertToWebP(file);

            const formData = new FormData();
            formData.append("file", processedFile);
            formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                { method: "POST", body: formData }
            );

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            return data.secure_url; // Cloudinary URL

        } catch (err) {
            console.log("Image upload failed = ", err)
            toast.error("Image upload failed");

            return null;
        } finally {
            setUploading(false);
        }
    };

    return { uploadImage, uploading };
}
