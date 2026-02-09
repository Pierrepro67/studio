
"use client"

import * as React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import Autoplay from "embla-carousel-autoplay"

export function Banner() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )

  const bannerImages = PlaceHolderImages.filter(img => img.id.startsWith('banner'))

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden scanline-container">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-10" />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-4">
        <h1 className="font-headline text-4xl md:text-7xl font-bold text-white tracking-tighter drop-shadow-2xl animate-fade-in">
          KITS DE <span className="text-accent neon-glow">3 DRINKS</span> DA MANSÃO MAROMBA
        </h1>
        <p className="mt-4 text-lg md:text-xl font-light text-muted-foreground max-w-2xl animate-fade-in [animation-delay:200ms]">
          Não é só bebida. É experiência. Entre para a dimensão darkness.
        </p>
      </div>
      
      {/* Smoke effect placeholder */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black opacity-80 z-10" />

      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent className="h-full -ml-0">
          {bannerImages.map((image) => (
            <CarouselItem key={image.id} className="pl-0 h-[60vh] md:h-[80vh]">
              <div className="relative w-full h-full">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  priority
                  className="object-cover transition-transform duration-[5s] hover:scale-110"
                  data-ai-hint={image.imageHint}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
