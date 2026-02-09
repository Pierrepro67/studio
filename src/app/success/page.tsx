
"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Package, Rocket, Home } from "lucide-react"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 scanline-container">
      <div className="max-w-md w-full bg-card border border-accent/30 rounded-xl p-8 text-center space-y-6 animate-fade-in shadow-[0_0_50px_rgba(57,255,20,0.1)]">
        <div className="flex justify-center">
          <div className="relative">
            <CheckCircle2 className="h-24 w-24 text-accent animate-bounce" />
            <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full" />
          </div>
        </div>

        <h1 className="font-headline text-3xl font-bold text-white uppercase tracking-tighter">
          Pedido Confirmado!
        </h1>
        
        <div className="space-y-2">
          <p className="text-muted-foreground">Envio iniciado para sua coordenada terrestre.</p>
          <div className="bg-black/50 p-3 rounded border border-border">
            <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">Cód. Transmissão:</span>
            <span className="text-accent font-mono text-xl tracking-widest">{orderId || "TRANS-M-001"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-4">
          <div className="flex items-center justify-center space-x-3 text-sm text-accent/80 font-bold uppercase tracking-widest">
            <Package className="h-5 w-5" />
            <span>Preparando Kit Darkness</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-sm text-accent/80 font-bold uppercase tracking-widest">
            <Rocket className="h-5 w-5" />
            <span>Aguardando Descolagem</span>
          </div>
        </div>

        <Separator className="bg-border/50" />

        <Link href="/" className="block">
          <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-black">
            <Home className="mr-2 h-4 w-4" />
            Voltar para Base
          </Button>
        </Link>
      </div>
    </div>
  )
}

function Separator({ className }: { className?: string }) {
  return <div className={`h-px w-full ${className}`} />
}
