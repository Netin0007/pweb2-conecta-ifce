
import FormRegister from '@/features/auth/components/form-register'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'

export function RegisterPage() {
 

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
          <FormRegister/>
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
