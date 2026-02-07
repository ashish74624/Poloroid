/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useUserData } from '@/hooks/useUserData';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { z } from "zod";
import { Camera } from "lucide-react";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload';


const editSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Enter a valid email"),
    location: z.string().optional(),
    profileImage: z.any().optional(),
    bio: z.any().optional()
});

type EditFormData = z.infer<typeof editSchema>;


export default function Form() {

    // const navigate = useNavigate();
    const { updateProfileMutation, getData } = useUserData();
    const { uploadImage, uploading } = useCloudinaryUpload();
    const user = getData.data;
    console.log(user)
    const [formData, setFormData] = useState<EditFormData>({
        firstName: user?.firstName ?? '',
        lastName: user?.lastName ?? '',
        email: user?.email ?? '',
        location: user?.location ?? '',
        profileImage: undefined,
        bio: user?.bio ?? ''
    });

    const [errors, setErrors] = useState<
        Partial<Record<keyof EditFormData, string>>
    >({});
    const [preview, setPreview] = useState<string | null>(user?.profileImage || null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;

        setFormData((prev) => ({ ...prev, [id]: value }));

        if (errors[id as keyof EditFormData]) {
            setErrors((prev) => ({ ...prev, [id]: undefined }));
        }
    };


    const handleProfilePic = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFormData((prev) => ({ ...prev, profileImage: file }));

        const url = URL.createObjectURL(file);
        setPreview(url);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const validated = editSchema.parse(formData);
            setErrors({});

            let finalImageUrl = user?.profileImage || "";

            // Check if user selected a new file
            if (validated.profileImage instanceof File) {
                const uploadedUrl = await uploadImage(validated.profileImage);

                if (!uploadedUrl) {
                    toast.error("Could not upload profile image");
                    return; // STOP submission
                }

                finalImageUrl = uploadedUrl; // Use cloudinary URL
            }

            updateProfileMutation.mutate(
                {
                    firstName: validated.firstName,
                    lastName: validated.lastName,
                    email: validated.email,
                    profileImage: finalImageUrl, // final url
                    location: validated.location,
                    bio: validated.bio
                },
                {
                    onSuccess: () => {
                        toast.success("Profile updated successfully");
                    },
                    onError: () => {
                        toast.error("Unable to update profile at the moment");
                    }
                }
            );

        } catch (error: any) {
            if (error instanceof z.ZodError) {
                const fieldErrors: Partial<Record<keyof EditFormData, string>> = {};
                setErrors(fieldErrors);
            }
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                    <Avatar className="h-32 w-32">
                        <AvatarImage src={preview || ""} />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>

                    <Button
                        size="icon"
                        type="button"
                        className="absolute -bottom-2 -right-2 rounded-full h-10 w-10"
                        variant="secondary"
                        onClick={() =>
                            document.getElementById("profilePicInput")?.click()
                        }
                    >
                        <Camera className="h-4 w-4" />
                    </Button>

                    <input
                        id="profilePicInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfilePic}
                    />
                </div>

                <p className="text-sm text-muted-foreground text-center">
                    Click the camera icon to change your profile picture
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                {errors.firstName && (
                    <p className="text-sm text-destructive">
                        {errors.firstName}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                {errors.lastName && (
                    <p className="text-sm text-destructive">
                        {errors.lastName}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && (
                    <p className="text-sm text-destructive">
                        {errors.email}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    defaultValue="Capturing life's beautiful moments 📸 | Travel enthusiast ✈️ | Coffee lover ☕"
                    className="bg-background/50 resize-none h-24"
                    value={formData.bio}
                    onChange={handleChange}
                />
                {errors.bio && (
                    <p className="text-sm text-destructive">
                        {errors.bio}
                    </p>
                )}
            </div>


            <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                />
            </div>

            <div className="flex space-x-4 pt-4">
                <Button className="flex-1" size="lg" type="submit" disabled={updateProfileMutation.isPending || uploading}>
                    {uploading
                        ? "Uploading..."
                        : updateProfileMutation.isPending
                            ? "Saving..."
                            : "Save Changes"}
                </Button>

                <Button type="button" variant="outline" className="flex-1" size="lg" asChild>
                    <Link to="/profile">Cancel</Link>
                </Button>
            </div>
        </form>
    )
}
