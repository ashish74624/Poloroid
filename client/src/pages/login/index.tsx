/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { useAuthContext } from '@/context/useAuthContext';
import { useNavigate } from 'react-router-dom';

// Zod schema for login form validation
const loginSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
    password: z.string().min(1, 'Password is required').min(4, 'Password must be at least 6 characters long'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
    const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
    const [errors, setErrors] = useState<Partial<LoginFormData>>({});
    const navigate = useNavigate()
    const { loginMutation } = useAuth();
    const { setEmail } = useAuthContext();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error on change
        if (errors[name as keyof LoginFormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const validatedData = loginSchema.parse(formData);
            setErrors({});
            loginMutation.mutate(validatedData,
                {
                    onSuccess: (data) => {
                        setEmail(formData.email)
                        localStorage.setItem("token", data.access)
                        navigate("/home");
                    },
                }
            );
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: Partial<LoginFormData> = {};
                (error as any).errors.forEach((err: any) => {
                    if (err.path[0]) {
                        fieldErrors[err.path[0] as keyof LoginFormData] = err.message;
                    }
                });
                setErrors(fieldErrors);
            }
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-vintage film-grain bg-background">
            <div className="max-w-md w-full mx-4">
                <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back</h1>
                        <p className="text-muted-foreground">Sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${errors.email ? 'border-destructive focus:ring-destructive' : 'border-input'
                                    }`}
                                placeholder="Enter your email"
                                disabled={loginMutation.isPending}
                            />
                            {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${errors.password ? 'border-destructive focus:ring-destructive' : 'border-input'
                                    }`}
                                placeholder="Enter your password"
                                disabled={loginMutation.isPending}
                            />
                            {errors.password && <p className="mt-1 text-sm text-destructive">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-end">
                            {/* TODO: Add Remember me feature */}
                            {/* <label className="flex items-center text-sm text-foreground">
                                <input type="checkbox" className="h-4 w-4 text-primary border-input rounded mr-2" />
                                Remember me
                            </label> */}
                            <a href="#" className="text-sm font-medium text-primary hover:text-primary/80">
                                Forgot password?
                            </a>
                        </div>

                        <Button type="submit" className="w-full" onSubmit={handleSubmit}>
                            {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <a href="/signup" className="font-medium text-primary hover:text-primary/80">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
