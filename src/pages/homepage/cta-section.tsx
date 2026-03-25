import { Button } from '@/shared/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function CtaSection() {
  return (
    <section className="bg-background py-20" id="cta-section">
      <div className="container-main">
        <div className="mx-auto text-center max-w-2xl">
          <h2 className="text-4xl font-bold text-balance text-foreground tracking-tight">
            Pronto para se conectar com a comunidade?
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Junte-se a milhares de estudantes, professores e técnicos no ConectaIFCE.
          </p>
        </div>

        <div className="mt-16 flex items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link to="/register" className="flex gap-2 items-center w-60 h-12">
              <span className="uppercase tracking-wider">Participar agora</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="lg" asChild>
            <Link to="/login" className='w-40 h-12'>Já tem conta?</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CtaSection
