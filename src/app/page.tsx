
import { Banner } from "@/components/Banner"
import { KitCard } from "@/components/KitCard"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const KITS = [
  {
    id: "kit-gamma",
    name: "GAMMA RAY PULSE",
    description: "Uma explosão radioativa de sabores cítricos e energia alienígena. Perfeito para quem busca alta intensidade.",
    price: 189.90,
  },
  {
    id: "kit-void",
    name: "VOID WALKER",
    description: "Sinta o mistério do vazio profundo com notas de frutas roxas e uma finalização suave e sombria.",
    price: 210.00,
  },
  {
    id: "kit-nebula",
    name: "NEBULA SURGE",
    description: "Uma corrente elétrica de sabor que ilumina seus sentidos. Refrescante e hipnotizante.",
    price: 195.50,
  },
  {
    id: "kit-plasma",
    name: "PLASMA BURST",
    description: "O calor das estrelas em cada gole. Intensidade total com um toque metálico e futurista.",
    price: 225.00,
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Banner />

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-white mb-4">
            SELECIONE SEU <span className="text-accent">COMBUSTÍVEL</span>
          </h2>
          <div className="w-24 h-1 bg-accent neon-glow" />
          <p className="mt-6 text-muted-foreground max-w-xl italic">
            "Na Mansão Maromba, o impossível é apenas o começo. Nossos kits são portais para outra dimensão."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        </div>
      </section>

      <footer className="border-t border-border/50 py-12 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center space-y-4">
          <div className="font-headline text-2xl font-bold tracking-tighter text-white">
            MAROMBA <span className="text-accent">MOONSHINE</span>
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            © 2024 Mansão Maromba - Todos os direitos reservados para a galáxia.
          </p>
        </div>
      </footer>
    </main>
  )
}
