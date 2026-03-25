import FormLogin from '@/features/auth/components/form-login'
import Brand from '@/shared/components/brand'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'

function LoginPage() {
  return (
    <section className="flex-1 flex items-center justify-center py-20">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center gap-4">
          <Brand />
          <CardTitle>Entrar na sua conta</CardTitle>
        </CardHeader>

        <CardContent>
          {/* 🔥 Aqui fica toda lógica agora */}
          <FormLogin />
        </CardContent>

        <CardFooter className="border-t border-border">
          <p className="text-sm text-muted-foreground text-center w-full">
            Não tem conta?{' '}
            <a href="/register" className="text-primary">
              Criar conta
            </a>
          </p>
        </CardFooter>
      </Card>
    </section>
  )
}

export default LoginPage
