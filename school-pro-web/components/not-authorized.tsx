"use client"

import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";


export default function NotAuthorized() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <AlertCircle className="h-12 w-12 text-destructive"/>
                    </div>
                    <CardTitle className="text-2xl font-bold text-destruction"> Not Authorized

                    </CardTitle>
                </CardHeader>
                <CardContent >
                    <p className="text-center text-gray-600">
                        Sorry, you don't have permission to access this page, Please contact your administrator if you believe this is an error.
                    </p>

                </CardContent>

                <CardFooter className="flex justify-center">
                    <Button asChild>
                        <Link href="/login">
                            Return to Dashboard
                        </Link>
                    </Button>

                </CardFooter>

            </Card>
        </div>
    )
}