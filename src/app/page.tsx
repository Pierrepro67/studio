
import { Banner } from "@/components/Banner"
import { KitCard } from "@/components/KitCard"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings2, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const KITS = [
  {
    id: "kit-gamma",
    name: "SABOR ENERGÉTICO",
    description: "Uma explosão radioativa de sabores cítricos e energia alienígena. Perfeito para quem busca alta intensidade.",
    price: 29.99,
  },
  {
    id: "kit-void",
    name: "SABOR ENERGÉTICO",
    description: "Sinta o mistério do vazio profundo com notas de frutas roxas e uma finalização suave e sombria.",
    price: 29.99,
  },
  {
    id: "kit-nebula",
    name: "SABOR ENERGÉTICO",
    description: "Uma corrente elétrica de sabor que ilumina seus sentidos. Refrescante e hipnotizante.",
    price: 29.99,
  },
  {
    id: "kit-plasma",
    name: "SABOR ENERGÉTICO",
    description: "O calor das estrelas em cada gole. Intensidade total com um toque metálico e futurista.",
    price: 29.99,
  }
]

export default function Home() {
  const customKitImage = PlaceHolderImages.find(img => img.id === 'kit-custom')

  return (
    <main className="min-h-screen bg-background">
      <Banner />

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-white mb-4">
            ESCOLHA SEU <span className="text-accent">"SABOR"</span>
          </h2>
          <div className="w-24 h-1 bg-accent neon-glow" />
          <p className="mt-6 text-muted-foreground max-w-xl italic">
            "Na Mansão Maromba, o impossível é apenas o começo. Nossos kits são portais para outra dimensão."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {KITS.map((kit, index) => {
            const imageData = PlaceHolderImages.find(img => img.id === kit.id)
            return (
              <KitCard
                key={kit.id}
                id={kit.id}
                name={kit.name}
                description={kit.description}
                price={kit.price}
                imageUrl={imageData?.imageUrl || ""}
                imageHint={imageData?.imageHint || "drink"}
                delay={index * 100}
              />
            )
          })}

          {/* Monte Seu Kit Card */}
          <Card 
            className="group relative overflow-hidden bg-card border-accent/40 border-2 hover:border-accent transition-all duration-500 animate-fade-in flex flex-col shadow-[0_0_20px_rgba(57,255,20,0.1)]"
            style={{ animationDelay: `500ms` }}
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={customKitImage?.imageUrl || ""}
                alt="Monte Seu Kit"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                data-ai-hint="cocktail selection"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <Badge className="absolute top-4 right-4 bg-accent text-black font-bold border-none animate-pulse">
                MONTE DO SEU JEITO
              </Badge>
              <Badge className="absolute top-4 left-4 bg-white text-black font-bold border-none">
                PERSONALIZADO
              </Badge>
            </div>

            <CardHeader className="space-y-1">
              <CardTitle className="font-headline text-xl text-white group-hover:text-accent transition-colors uppercase leading-tight">
                MONTE SEU KIT – MANSÃO MAROMBA
              </CardTitle>
              <div className="text-xs text-accent font-bold tracking-widest uppercase">
                Escolha 3 sabores
              </div>
            </CardHeader>

            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                “Você escolhe os sabores. A Mansão entrega a experiência.”
              </p>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <div className="w-full flex justify-between items-center">
                <span className="text-2xl font-bold text-white">
                  R$ 29,99
                </span>
                <div className="h-px flex-grow mx-4 bg-border" />
              </div>
              <Link href="/custom-kit" className="w-full">
                <Button 
                  className="w-full bg-accent text-black hover:bg-white font-headline font-bold uppercase tracking-widest transition-all duration-300 neon-border"
                >
                  <Settings2 className="mr-2 h-4 w-4" />
                  Montar Kit
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border/50 py-12 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center space-y-4">
          <div className="font-headline text-2xl font-bold tracking-tighter text-white">
            MANSÃO <span className="text-accent">MAROMBA</span>
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            © 2024 Mansão Maromba - Todos os direitos reservados para a galáxia.
          </p>
        </div>
      </footer>
    </main>
  )
}
