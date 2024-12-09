import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadButton } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
// import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import React from "react";
type ImageInputProps = {
  title: string;
  imageUrl: string;
  setImageUrl: any;
  endpoint: any;
  className?: string;
  size?:"sm" | "lg"
};
export default function ImageInput({
  title,
  imageUrl,
  setImageUrl,
  endpoint,
  className,
  size="lg"
}: ImageInputProps) {
  if(size==="sm") {
    return (
      <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Image
            alt={title}
            className={cn("h-20 w-full rounded-md object-cover",className)}
            height="500"
            src={imageUrl}
            width="500"
          />
          <UploadButton
            className="col-span-full"
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);

              setImageUrl(res[0].url);
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      </CardContent>
    </Card>
    );
  }
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Image
            alt={title}
            className={cn("h-40 w-full rounded-md object-cover",className)}
            height="500"
            src={imageUrl}
            width="500"
          />
          <UploadButton
            className="col-span-full"
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);

              setImageUrl(res[0].url);
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
