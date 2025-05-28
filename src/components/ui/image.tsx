"use client";

import { ImageOff } from "lucide-react";
import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { useState } from "react";
import { cn } from "~/lib/utils";
import Loader from "./loader";

const className =
  "aspect-square flex items-center justify-center text-muted-foreground rounded-md";

export interface ImageProps extends NextImageProps {
  imageClassName?: string;
}

export default function S3Image({ src, imageClassName, ...props }: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <>
      {error ? (
        <div className={cn(className, props.className)}>
          {error && <ImageOff className="size-[20%] animate-pulse" />}
        </div>
      ) : (
        <div className={cn(className, props.className, "relative")}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-secondary">
              <Loader className="max-w-1/2" />
            </div>
          )}
          <NextImage
            {...props}
            src={`/api/file/${String(src)}`}
            className={cn("object-cover size-full", imageClassName)}
            onLoad={() => {
              setIsLoading(false);
            }}
            onError={() => {
              setError(true);
              setIsLoading(false);
            }}
          />
        </div>
      )}
    </>
  );
}
