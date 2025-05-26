"use client";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import S3Image from "~/components/ui/image";

export default function ProductImages({
    images
} : {
    images: string[]
}) {
    const [currentImage, setCurrentImage] = useState(0);


    return (
        <div className="flex flex-col gap-4">
            <div className="relative aspect-square border border-primary rounded-2xl overflow-hidden">
                <S3Image
                    src={images[currentImage] ?? ""}
                    alt="product"
                    className="size-full object-cover"
                    width={1080}
                    height={1920}
                />

                <div className="hidden lg:absolute left-6 bottom-6 lg:grid grid-cols-3 gap-4">
                    {images.map((image, index) => (
                        <Button key={index} variant={"ghost"} onClick={() => setCurrentImage(index)} className={cn("border rounded-[4px] h-auto bg-background", currentImage === index ? "border-primary" : "border-[#C23B42]/20")}>
                            <S3Image
                                src={image}
                                alt="product image"
                                className="size-16 object-contain"
                                width={1080}
                                height={1920}
                            />
                        </Button>
                    ))}
                </div>
            </div>

            <div className="lg:hidden grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <Button key={index} variant={"ghost"} onClick={() => setCurrentImage(index)} className={cn("border rounded-[4px] h-auto bg-background", currentImage === index ? "border-primary" : "border-[#C23B42]/20")}>
                        <S3Image
                            src={image}
                            alt="product image"
                            className="size-16 object-contain"
                            width={1080}
                            height={1920}
                        />
                    </Button>
                ))}
            </div>
        </div>
    )
}