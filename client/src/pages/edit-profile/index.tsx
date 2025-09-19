import Navigation from "@/components/Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const EditProfile = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="max-w-2xl mx-auto px-4 pt-24 pb-12">
                {/* Header */}
                <div className="flex items-center mb-8">
                    <Button variant="ghost" size="icon" className="mr-4" asChild>
                        <Link to="/profile">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-display font-bold">Edit Profile</h1>
                </div>

                <Card className="polaroid-frame">
                    <CardHeader>
                        <CardTitle className="text-center">Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Profile Picture */}
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative">
                                <Avatar className="h-32 w-32">
                                    <AvatarImage src="" alt="Profile" />
                                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                                </Avatar>
                                <Button
                                    size="icon"
                                    className="absolute -bottom-2 -right-2 rounded-full h-10 w-10"
                                    variant="secondary"
                                >
                                    <Camera className="h-4 w-4" />
                                </Button>
                            </div>
                            <p className="text-sm text-muted-foreground text-center">
                                Click the camera icon to change your profile picture
                            </p>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    defaultValue="John Doe"
                                    className="bg-background/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    defaultValue="john_photographer"
                                    className="bg-background/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    defaultValue="john@example.com"
                                    className="bg-background/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    placeholder="Tell us about yourself..."
                                    defaultValue="Capturing life's beautiful moments 📸 | Travel enthusiast ✈️ | Coffee lover ☕"
                                    className="bg-background/50 resize-none h-24"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="website">Website (Optional)</Label>
                                <Input
                                    id="website"
                                    type="url"
                                    placeholder="https://yourwebsite.com"
                                    className="bg-background/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Location (Optional)</Label>
                                <Input
                                    id="location"
                                    type="text"
                                    placeholder="New York, NY"
                                    className="bg-background/50"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4 pt-4">
                            <Button className="flex-1" size="lg">
                                Save Changes
                            </Button>
                            <Button variant="outline" className="flex-1" size="lg" asChild>
                                <Link to="/profile">
                                    Cancel
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default EditProfile;