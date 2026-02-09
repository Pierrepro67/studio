"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShieldCheck, Loader2, Rocket, ArrowLeft, CreditCard, QrCode } from "lucide-react"
import { createOrder } from "@/app/actions/orders"
import Link from "next/link"

const checkoutSchema = z.object({
  customerName: z.string().min(3, "Nome completo é obrigatório"),
  phone: z.string().min(10, "Telefone inválido"),
  address: z.string().min(5, "Endereço é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  neighborhood: z.string().min(2, "Bairro é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  cep: z.string().min(8, "CEP inválido"),
  paymentMethod: z.enum(["pix", "credit_card"]),
})

type CheckoutForm = z.infer<typeof checkoutSchema>

const KITS = {
  "kit-gamma": { name: "SABOR ENERGÉTICO", price: 29.99 },
  "kit-void": { name: "SABOR ENERGÉTICO", price: 29.99 },
  "kit-nebula": { name: "SABOR ENERGÉTICO", price: 29.99 },
  "kit-plasma": { name: "SABOR ENERGÉTICO", price: 29.99 },
}

export default function CheckoutPage() {
  const { id } = useParams()
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [step, setStep] = React.useState<'form' | 'payment'>('form')

  const kit = KITS[id as keyof typeof KITS] || { name: "SABOR ENERGÉTICO", price: 29.99 }

  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: {
      paymentMethod: "pix"
    }
  })

  const onSubmit = async (data: CheckoutForm) => {
    setLoading(true)
    const result = await createOrder({
      ...data,
      kitId: id as string,
      kitName: kit.name,
      price: kit.price,
    })
    
    if (result.success) {
      router.push(`/success?orderId=${result.orderId}`)
    } else {
      setLoading(false)
      alert(result.error)
    }
  }

  const paymentMethod = watch("paymentMethod")

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card border-border shadow-2xl animate-fade-in">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="font-headline text-2xl text-white flex items-center">
                  <ShieldCheck className="mr-2 text-accent h-6 w-6" />
                  BASE DE DADOS DO CLIENTE
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="customerName" className="text-muted-foreground uppercase text-xs tracking-widest font-bold">Nome Completo</Label>
                      <Input 
                        id="customerName" 
                        {...register("customerName")} 
                        className="bg-black/50 border-border focus:border-accent text-white" 
                        placeholder="Seu nome oficial na Terra"
                      />
                      {errors.customerName && <p className="text-red-500 text-xs animate-bounce">{errors.customerName.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-muted-foreground uppercase text-xs tracking-widest font-bold">Telefone / Canal de Contato</Label>
                      <Input id="phone" {...register("phone")} className="bg-black/50 border-border focus:border-accent text-white" placeholder="(00) 00000-0000" />
                      {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cep" className="text-muted-foreground uppercase text-xs tracking-widest font-bold">Cód. Postal (CEP)</Label>
                      <Input id="cep" {...register("cep")} className="bg-black/50 border-border focus:border-accent text-white" placeholder="00000-000" />
                      {errors.cep && <p className="text-red-500 text-xs">{errors.cep.message}</p>}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address" className="text-muted-foreground uppercase text-xs tracking-widest font-bold">Endereço de Entrega</Label>
                      <Input id="address" {...register("address")} className="bg-black/50 border-border focus:border-accent text-white" placeholder="Rua, Av, etc." />
                      {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="number" className="text-muted-foreground uppercase text-xs tracking-widest font-bold">Número</Label>
                      <Input id="number" {...register("number")} className="bg-black/50 border-border focus:border-accent text-white" placeholder="00" />
                      {errors.number && <p className="text-red-500 text-xs">{errors.number.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="neighborhood" className="text-muted-foreground uppercase text-xs tracking-widest font-bold">Bairro</Label>
                      <Input id="neighborhood" {...register("neighborhood")} className="bg-black/50 border-border focus:border-accent text-white" placeholder="Setor Alien" />
                      {errors.neighborhood && <p className="text-red-500 text-xs">{errors.neighborhood.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-muted-foreground uppercase text-xs tracking-widest font-bold">Cidade</Label>
                      <Input id="city" {...register("city")} className="bg-black/50 border-border focus:border-accent text-white" />
                      {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
                    </div>
                  </div>

                  <Separator className="bg-border/50" />

                  <div className="space-y-4">
                    <Label className="text-muted-foreground uppercase text-xs tracking-widest font-bold">Método de Transferência de Crédito</Label>
                    <RadioGroup 
                      defaultValue="pix" 
                      onValueChange={(val) => register("paymentMethod").onChange({ target: { value: val, name: "paymentMethod" } })}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div className={`flex items-center space-x-2 border p-4 rounded-lg cursor-pointer transition-all ${paymentMethod === 'pix' ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/30'}`}>
                        <RadioGroupItem value="pix" id="pix" {...register("paymentMethod")} className="text-accent" />
                        <Label htmlFor="pix" className="flex items-center cursor-pointer text-white">
                          <QrCode className="mr-2 h-5 w-5 text-accent" />
                          PIX (Instantâneo)
                        </Label>
                      </div>
                      <div className={`flex items-center space-x-2 border p-4 rounded-lg cursor-pointer transition-all ${paymentMethod === 'credit_card' ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/30'}`}>
                        <RadioGroupItem value="credit_card" id="credit_card" {...register("paymentMethod")} />
                        <Label htmlFor="credit_card" className="flex items-center cursor-pointer text-white">
                          <CreditCard className="mr-2 h-5 w-5 text-accent" />
                          Cartão de Crédito
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="bg-card border-border border-l-4 border-l-accent animate-fade-in [animation-delay:200ms]">
              <CardHeader>
                <CardTitle className="font-headline text-lg text-white">RESUMO DO PEDIDO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-bold">{kit.name}</h4>
                    <p className="text-xs text-muted-foreground">Kit com 3 drinks - Mansão Maromba</p>
                  </div>
                  <span className="text-white font-bold">Qtd: 1</span>
                </div>
                <Separator className="bg-border/50" />
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-muted-foreground">TOTAL:</span>
                  <span className="text-accent neon-glow">R$ {kit.price.toFixed(2).replace('.', ',')}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  form="checkout-form"
                  disabled={!isValid || loading}
                  className={`w-full h-14 font-headline font-bold text-lg uppercase tracking-wider transition-all duration-500 ${isValid ? 'bg-accent text-black hover:bg-accent/80' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Transmitindo dados...
                    </>
                  ) : (
                    <>
                      Finalizar Pedido
                      <Rocket className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <div className="bg-primary/10 border border-accent/20 rounded-lg p-4 text-xs text-muted-foreground text-center italic animate-pulse">
              * Apenas 1 kit por pedido permitido pela diretriz alienígena.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
