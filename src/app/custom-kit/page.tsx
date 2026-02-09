
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowLeft, Rocket, Info } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const FLAVORS = [
  "Sabor Energético Mansão Maromba Whisky Combo",
  "Mansão Maromba Whisky + Combo Maçã Verde",
  "Drink Mansão Maromba Gin Melancia",
  "Sabor Energético Mansão Maromba Gin Tropical",
  "Drink Bebida Ginkut Mansão Maromba Toguro",
  "Drink Mansão Maromba Darkness Sabor Energético",
  "Bebida Composta Mansão Maromba Colors Berry",
  "Mansão Maromba Vodka Combo – sabor vodka combo"
]

export default function CustomKitPage() {
  const router = useRouter()
  const [selectedFlavors, setSelectedFlavors] = React.useState<string[]>([])

  const toggleFlavor = (flavor: string) => {
    if (selectedFlavors.includes(flavor)) {
      setSelectedFlavors(selectedFlavors.filter(f => f !== flavor))
    } else if (selectedFlavors.length < 3) {
      setSelectedFlavors([...selectedFlavors, flavor])
    }
  }

  const handleFinish = () => {
    if (selectedFlavors.length === 3) {
      const flavorsParam = encodeURIComponent(selectedFlavors.join("|"))
      router.push(`/checkout/kit-custom?flavors=${flavorsParam}`)
    }
  }

  return (
    <div className="min-h-screen bg-black scanline-container py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="flex items-center text-accent hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a Loja
          </Link>
          <div className="font-headline text-xl font-bold tracking-tighter text-white">
            MANSÃO <span className="text-accent">MAROMBA</span>
          </div>
        </div>

        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-headline text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tighter">
            MONTE SEU <span className="text-accent">KIT</span>
          </h1>
          <p className="text-muted-foreground">Escolha exatamente 3 sabores para sua experiência darkness.</p>
          
          <div className="mt-8 flex justify-center gap-2">
            {[1, 2, 3].map((num) => (
              <div 
                key={num}
                className={cn(
                  "w-12 h-12 rounded-full border-2 flex items-center justify-center font-headline font-bold transition-all duration-500",
                  selectedFlavors.length >= num 
                    ? "border-accent bg-accent text-black shadow-[0_0_15px_rgba(57,255,20,0.5)]" 
                    : "border-border text-muted-foreground"
                )}
              >
                {selectedFlavors.length >= num ? <Check className="h-6 w-6" /> : num}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {FLAVORS.map((flavor, index) => {
            const isSelected = selectedFlavors.includes(flavor)
            const isDisabled = !isSelected && selectedFlavors.length >= 3

            return (
              <Card 
                key={index}
                onClick={() => !isDisabled && toggleFlavor(flavor)}
                className={cn(
                  "cursor-pointer transition-all duration-300 bg-card border-2 group overflow-hidden animate-fade-in",
                  isSelected ? "border-accent bg-accent/5" : "border-border hover:border-accent/30",
                  isDisabled && "opacity-40 cursor-not-allowed grayscale"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6 flex items-center justify-between">
                  <span className={cn(
                    "font-bold text-sm md:text-base transition-colors",
                    isSelected ? "text-accent" : "text-white group-hover:text-accent/80"
                  )}>
                    {flavor}
                  </span>
                  <div className={cn(
                    "w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 ml-4 transition-all",
                    isSelected ? "border-accent bg-accent text-black" : "border-border"
                  )}>
                    {isSelected && <Check className="h-4 w-4" />}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="sticky bottom-8 bg-card border border-accent/30 p-6 rounded-xl shadow-2xl animate-fade-in flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center text-sm text-muted-foreground italic">
            <Info className="mr-2 h-4 w-4 text-accent" />
            Você selecionou {selectedFlavors.length} de 3 sabores obrigatórios.
          </div>
          <Button 
            onClick={handleFinish}
            disabled={selectedFlavors.length !== 3}
            className={cn(
              "w-full md:w-64 h-14 font-headline font-bold text-lg uppercase tracking-widest transition-all duration-500",
              selectedFlavors.length === 3 
                ? "bg-accent text-black hover:bg-white shadow-[0_0_20px_rgba(57,255,20,0.3)]" 
                : "bg-muted text-muted-foreground"
            )}
          >
            Finalizar Pedido
            <Rocket className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
