import { useEffect, useState } from 'react'
import { Eye, EyeOff, Loader2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { registerSchema, type RegisterFormData } from '@/schemas/register.shema'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [campuses, setCampuses] = useState<
    Array<{
      id: string
      name: string
    }>
  >([])

  useEffect(() => {
    async function fetchCampuses() {
      const response = await fetch(
        'https://conectaifce-api.proflucasmendes.com.br/campuses',
      )

      if (response.ok) {
        const data = await response.json()
        setCampuses(data)
      }
    }

    fetchCampuses()
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: RegisterFormData) => {
    const { course, ...rest } = data
    const payload = data.role === 'student' ? data : rest

    try {
      const response = await fetch(
        'https://conectaifce-api.proflucasmendes.com.br/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      )

      if (response.ok) {
        const responseData = await response.json()
        localStorage.setItem('access_token', responseData.token)
        navigate('/')
      } else {
        const responseData = await response.json()
        console.log('Erro da API:', responseData)
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
    }
  }

  return (
    <section className="flex-1 flex items-center justify-center py-20">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="text-center">
          <div className="w-full flex justify-center mb-4">
            <div className="text-2xl font-bold text-primary">ConectaIFCE</div>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Criar sua conta
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Preencha os dados para entrar na comunidade
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <Label htmlFor="firstName">Nome</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Seu nome"
                  className="h-11 bg-background"
                  {...register('firstName')}
                />
                {errors.firstName && (
                  <p className="text-xs text-destructive">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <Label htmlFor="lastName">Sobrenome</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Seu sobrenome"
                  className="h-11 bg-background"
                  {...register('lastName')}
                />
                {errors.lastName && (
                  <p className="text-xs text-destructive">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="handle">Nome de Usuário</Label>
              <Input
                id="handle"
                placeholder="Ex: @Neto"
                className="h-11 bg-background"
                {...register('handle')}
              />
              {errors.handle && (
                <p className="text-xs text-destructive">
                  {errors.handle.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">E-mail institucional</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu.nome@ifce.edu.br"
                className="h-11 bg-background"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <Label htmlFor="role">Vínculo</Label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? ''}
                    >
                      <SelectTrigger id="role" className="h-11 bg-background">
                        <SelectValue placeholder="Vínculo com IFCE" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Estudante</SelectItem>
                        <SelectItem value="professor">Docente</SelectItem>
                        <SelectItem value="technician">
                          Técnico ou Técnica
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.role && (
                  <p className="text-xs text-destructive">
                    {errors.role.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <Label htmlFor="campus">Campus</Label>
                <Controller
                  name="campus"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? ''}
                    >
                      <SelectTrigger id="campus" className="h-11 bg-background">
                        <SelectValue placeholder="Seu campus" />
                      </SelectTrigger>
                      <SelectContent>
                        {campuses &&
                          campuses.map((campus) => (
                            <SelectItem value={campus.id} key={campus.id}>
                              {campus.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.campus && (
                  <p className="text-xs text-destructive">
                    {errors.campus.message}
                  </p>
                )}
              </div>
            </div>

            {watch('role') === 'student' && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="course" className="text-foreground">
                  Curso
                </Label>
                <Input
                  id="course"
                  type="text"
                  placeholder="Seu curso"
                  required
                  className="h-11 bg-background"
                  {...register('course')}
                />
                {errors.course && (
                  <p className="text-xs text-destructive">
                    {errors.course.message}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  className="h-11 bg-background"
                  {...register('password')}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-primary"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
              <p className="text-[12px] text-muted-foreground">
                Mínimo de 8 caracteres com letras e números
              </p>
            </div>

            <Button type="submit" className="h-11 mt-2" disabled={isSubmitting || !isValid}>
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2Icon className="size-4 animate-spin" />
                  Criando conta...
                </div>
              ) : (
                'Criar conta'
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="border-t border-border pt-6 justify-center">
          <p className="text-sm text-muted-foreground">
            Já tem conta?{' '}
            <a
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Entrar
            </a>
          </p>
        </CardFooter>
      </Card>
    </section>
  )
}
