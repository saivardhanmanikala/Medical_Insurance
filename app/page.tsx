"use client"
import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheckCircle2, ArrowRight } from "lucide-react"

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null)
  const howItWorksRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    const sections = [featuresRef.current, howItWorksRef.current, teamRef.current, ctaRef.current]

    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  const features = [
    {
      title: "AI-Powered Prediction",
      description:
        "Our advanced XGBoost model provides accurate insurance premium predictions based on your health data.",
      icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
    },
    {
      title: "Secure Data Handling",
      description: "Your personal health information is encrypted and never stored, ensuring complete privacy.",
      icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
    },
    {
      title: " Upto 95% Accuracy",
      description: "Our model has been trained on extensive datasets to provide highly accurate premium estimates.",
      icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
    },
    {
      title: "Interactive Dynamic UI",
      description: "Get real-time feedback and insights as you input your health information.",
      icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
    },
  ]

  const teamMembers = [
    {
      name: "M. Naga Supraja",
      role: "ML Engineer",
      funFact: "Loves to solve complex ML problems while hiking",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      avatar: "/placeholder.svg?height=200&width=200",
    },
	{
      name: "Sai Vardan Manikala",
      role: "Frontend Developer",
      funFact: "Creates UI designs in dreams and implements them by day",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      avatar: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "K. Durga Manohar Reddy",
      role: "Data Scientist",
      funFact: "Can explain neural networks while cooking perfect pasta",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      avatar: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "K. Sekhar Venkata Prasad",
      role: "Backend Developer",
      funFact: "Writes Python code faster than most people type",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      avatar: "/placeholder.svg?height=200&width=200",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted transition-colors duration-500">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 animate-fade-up">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    🚀 Healthcare Cost Prediction using XGBoost
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Predict Your Premium Instantly with Our Advanced Machine Learning Model
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    <Link href="/estimator">
                      Try Estimator Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center animate-fade-up animate-delay-200">
                <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-muted md:h-[400px] lg:h-[500px] xl:h-[600px] shadow-xl transition-all duration-500 hover:shadow-2xl">
                  <img
                    alt="Medical Insurance"
                    className="object-cover w-full h-full"
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          ref={featuresRef}
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted to-muted/30 transition-colors duration-500 opacity-0 translate-y-8 transition-all duration-700"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides accurate insurance premium predictions with a user-friendly interface.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 hover:border-primary/50 group"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          ref={howItWorksRef}
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background transition-colors duration-500 opacity-0 translate-y-8 transition-all duration-700"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Process</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our simple three-step process makes estimating your insurance premium quick and easy.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              {[
                {
                  step: 1,
                  title: "Enter Your Details",
                  description: "Fill in your age, BMI, smoking status, region, and gender in our simple form.",
                },
                {
                  step: 2,
                  title: "AI Analysis",
                  description: "Our XGBoost model analyzes your data to generate an accurate premium estimate.",
                },
                {
                  step: 3,
                  title: "Get Your Estimate",
                  description:
                    "Receive your personalized premium estimate along with health insights and recommendations.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-4 text-center transform transition-all duration-500 hover:-translate-y-2"
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary border-2 border-primary/20 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:scale-110">
                    <span className="text-2xl font-bold">{item.step}</span>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent my-2"></div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Members Section */}
        <section
          ref={teamRef}
          className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30 transition-colors duration-500 opacity-0 translate-y-8 transition-all duration-700"
        >
          <div className="container">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Team</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Meet Our <span className="text-primary">Team</span>
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The talented individuals behind our medical insurance cost estimator.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="group relative bg-background rounded-xl overflow-hidden shadow-lg border border-muted transition-all duration-500 hover:shadow-xl hover:border-primary/50 hover:-translate-y-2"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/0 to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <div className="h-48 bg-muted/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background/0"></div>
                    <div className="w-32 h-32 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center mx-auto mt-8 overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:border-primary">
                      <span className="text-3xl font-bold text-primary">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 text-center relative z-20">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">{member.role}</p>
                    <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500 opacity-0 group-hover:opacity-100">
                      <p className="text-sm bg-primary/10 p-3 rounded-lg mb-4 text-foreground">"{member.funFact}"</p>
                      <div className="flex justify-center space-x-4">
                        <Link
                          href={member.github}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-github"
                          >
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                            <path d="M9 18c-4.51 2-5-2-7-2"></path>
                          </svg>
                        </Link>
                        <Link
                          href={member.linkedin}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-linkedin"
                          >
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect width="4" height="12" x="2" y="9"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          ref={ctaRef}
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-primary/5 transition-colors duration-500 opacity-0 translate-y-8 transition-all duration-700"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Estimate Your Premium?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Try our AI-powered estimator today and get an accurate prediction of your medical insurance costs.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  <Link href="/estimator">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

