
"use server"

import { z } from "zod"

const OrderSchema = z.object({
  kitId: z.string(),
  kitName: z.string(),
  price: z.number(),
  customerName: z.string().min(3, "Nome completo é obrigatório"),
  phone: z.string().min(10, "Telefone inválido"),
  address: z.string().min(5, "Endereço completo é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  neighborhood: z.string().min(2, "Bairro é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  cep: z.string().min(8, "CEP inválido"),
  paymentMethod: z.enum(["pix", "credit_card"]),
  flavors: z.array(z.string()).optional(),
})

export type OrderData = z.infer<typeof OrderSchema>

export async function createOrder(data: OrderData) {
  // Simulate delay for "Transmitindo dados..." loader
  await new Promise(resolve => setTimeout(resolve, 2000))

  const validatedFields = OrderSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      error: "Campos obrigatórios faltando ou inválidos.",
    }
  }

  try {
    // Here we would use Firebase Admin or a service layer to save to Firestore
    console.log("Saving order to Firebase:", validatedFields.data)
    
    return {
      success: true,
      orderId: Math.random().toString(36).substring(7).toUpperCase()
    }
  } catch (err) {
    return {
      error: "Falha na conexão com a base alienígena. Tente novamente."
    }
  }
}
