import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom"
import { useUserData } from "@/hooks/useUserData";
import Form from "./components/Form";


export default function EditProfile() {
    const { getData } = useUserData();

    const isLoading = getData.isLoading;
    const user = getData.data;

    if (isLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg font-medium">
                Loading your profile...
            </div>
        );
    }



    return (
        <div className="min-h-screen bg-background">
            <main className="max-w-2xl mx-auto p-4">
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

                    <CardContent>
                        <Form />
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
