import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { EstimatorForm } from "@/components/estimator-form"

export default function EstimatorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Insurance Premium <span className="text-primary">Estimator</span>
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Fill in your details below to get an instant estimate of your medical insurance premium. Our AI-powered
            model uses your health information to provide an accurate prediction.
          </p>

          <div className="max-w-3xl mx-auto">
            <EstimatorForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

