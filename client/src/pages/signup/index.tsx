/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "@/context/useAuthContext";

// ✅ Zod validation schema
const signupSchema = z
    .object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        // username: z.string().min(1, "Username is required"),
        email: z.string().min(1, "Email is required").email("Enter a valid email"),
        // bio: z.string().optional(),
        password: z.string().min(4, "Password must be at least 4 characters"),
        confirmPassword: z.string().min(4, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type SignUpFormData = z.infer<typeof signupSchema>;

export default function SignUp() {
    const navigate = useNavigate(); // ✅ for redirecting
    const [formData, setFormData] = useState<SignUpFormData>({
        firstName: "",
        lastName: "",
        email: "",
        // bio: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<Partial<Record<keyof SignUpFormData, string>>>({});

    const { signupMutation } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));

        if (errors[id as keyof SignUpFormData]) {
            setErrors((prev) => ({ ...prev, [id]: undefined }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const validated = signupSchema.parse(formData);
            setErrors({});

            signupMutation.mutate(
                { firstName: validated.firstName, lastName: validated.lastName, email: validated.email, password: validated.password },
                {
                    onSuccess: () => {
                        navigate("/login");
                    },
                }
            );
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                const fieldErrors: Partial<Record<keyof SignUpFormData, string>> = {};

                setErrors(fieldErrors);
            }
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block">
                        <h1 className="text-4xl font-display font-bold text-primary">Poloroid</h1>
                    </Link>
                    <p className="text-muted-foreground mt-2">Join the community</p>
                </div>

                {/* Sign Up Form */}
                <Card className="polaroid-frame">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-display">Create Account</CardTitle>
                        <CardDescription>Start sharing your moments</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" type="text" value={formData.firstName} onChange={handleChange} placeholder="John" />
                                {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" type="text" value={formData.lastName} onChange={handleChange} placeholder="Doe" />
                                {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
                            </div>
                            {/* TODO: ADD user_name FUNCTIONALITY */}
                            {/* <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" type="text" value={formData.username} onChange={handleChange} placeholder="john_photographer" />
                                {errors.username && <p className="text-sm text-destructive">{errors.username}</p>}
                            </div> */}

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" />
                                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••" />
                                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    value={formData.confirmPassword} onChange={handleChange}
                                    type="password"
                                    placeholder="••••••••"
                                    className="bg-background/50"
                                />
                                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                            </div>

                            <Button type="submit" className="w-full" size="lg" onSubmit={handleSubmit} >
                                {signupMutation.isPending ? "Creating account..." : "Create Account"}
                            </Button>

                            <div className="text-center text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <Link to="/login" className="text-primary hover:underline font-medium">
                                    Sign in
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
