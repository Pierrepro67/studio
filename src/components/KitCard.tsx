
"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap } from "lucide-react"

interface KitCardProps {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  imageHint: string
  delay?: number
}

export function KitCard({ id, name, description, price, imageUrl, imageHint, delay = 0 }: KitCardProps) {
  return (
    <Card 
      className="group relative overflow-hidden bg-card border-border hover:border-accent/50 transition-all duration-500 animate-fade-in flex flex-col"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
          data-ai-hint={imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        <Badge className="absolute top-4 right-4 bg-accent text-black font-bold border-none">
          NOVO
        </Badge>
      </div>

      <CardHeader className="space-y-1">
        <CardTitle className="font-headline text-2xl text-white group-hover:text-accent transition-colors">
          {name}
        </CardTitle>
        <div className="text-xs text-accent/80 font-bold tracking-widest uppercase">
          Kit com 3 drinks – Mansão Maromba
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <div className="w-full flex justify-between items-center">
          <span className="text-2xl font-bold text-white">
            R$ {price.toFixed(2).replace('.', ',')}
          </span>
          <div className="h-px flex-grow mx-4 bg-border" />
        </div>
        <Link href={`/checkout/${id}`} className="w-full">
          <Button 
            className="w-full bg-transparent border-accent border text-accent hover:bg-accent hover:text-black font-headline font-bold uppercase tracking-widest transition-all duration-300 neon-border glitch-hover"
          >
            <Zap className="mr-2 h-4 w-4" />
            Comprar Agora
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
