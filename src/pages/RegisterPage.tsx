import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { registerSchema } from '@/schemas/register.shema'
import { ZodError } from 'zod'

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)

    const data = {
      firstName: formData.get('firstName'),
      password: formData.get('password'),
    }

    try {
      const validatedData = registerSchema.parse(data)
      console.log(validatedData)
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error)
      }
    }
  }

  return (
    <section className="flex-1 flex items-center justify-center py-20">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="text-center">
          <div className="w-full flex justify-center mb-4">
            <div className="text-2xl font-bold text-primary">ConectaIFCE</div>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">Criar sua conta</CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Preencha os dados para entrar na comunidade
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Nome e Sobrenome lado a lado */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" type="text" placeholder="Seu nome" required className="h-11 bg-background" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <Label htmlFor="sobrenome">Sobrenome</Label>
                <Input id="sobrenome" type="text" placeholder="Seu sobrenome" required className="h-11 bg-background" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">E-mail institucional</Label>
              <Input id="email" type="email" placeholder="seu.nome@ifce.edu.br" required className="h-11 bg-background" />
            </div>

            {/* Selects de Vínculo e Campus */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="vínculo">Vínculo</Label>
              <Select required>
                <SelectTrigger id="vínculo" className="h-11 bg-background">
                  <SelectValue placeholder="Selecione seu vínculo com o IFCE" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Estudante</SelectItem>
                  <SelectItem value="professor">Docente</SelectItem>
                  <SelectItem value="technician">Técnico ou Técnica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="campus">Campus</Label>
              <Select required>
                <SelectTrigger id="campus" className="h-11 bg-background">
                  <SelectValue placeholder="Selecione seu campus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="taua">Campus Tauá</SelectItem>
                  <SelectItem value="boa-viagem">Boa Viagem</SelectItem>
                  <SelectItem value="fortaleza">Fortaleza</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  required
                  className="h-11 bg-background"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-primary"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
              </div>
              <p className="text-[12px] text-muted-foreground">
                Mínimo de 8 caracteres com letras e números
              </p>
            </div>

            <Button type="submit" className="h-11 mt-2">Criar conta</Button>
          </form>
        </CardContent>

        <CardFooter className="border-t border-border pt-6 justify-center">
          <p className="text-sm text-muted-foreground">
            Já tem conta? <a href="/login" className="text-primary font-medium hover:underline">Entrar</a>
          </p>
        </CardFooter>
      </Card>
    </section>
  )
}
