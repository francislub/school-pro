"use client"

import { ArrowLeft, Home, Terminal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4">
            <Card className="w-full max-w-3xl text-center">
                <CardContent className="pt-16">
                    <div className="mb-8 flex justify-center">
                        <div className="rounded-full bg-destructive/90 p-6">
                        <Terminal 
                        className="h-12 w-12 text-destruction-foreground" aria-hidden="true"
                        />
                        </div>
                    </div>
                    <h1 className="mb-4 text-3xl md:text-5xl font-bold tracking-tight">
                      404 - Page Not Found
                    </h1>
                    <p className="mb-8 text-lg text-muted-foreground">
                       Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                      <Button asChild>
                         <Link href="/">
                           <Home className="mr-2 h-4 w-4" />
                           Go to Homepage
                         </Link>
                      </Button>
                      <Button variant="outline" onClick={() => window.history.back()}>
                        <ArrowLeft className="mr-2 h-4 w-4"/>
                         Go Back
                      </Button>
                    </div>
                </CardContent>
                <CardFooter className="justify-center pb-16 pt-8 text-sm text-muted-foreground">
                    @ {new Date().getFullYear()} SchoolPro. All rights reserved

                </CardFooter>

            </Card>

        </main>
    )
}