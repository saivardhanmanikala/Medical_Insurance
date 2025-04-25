import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "M. Naga Supraja",
      role: "ML Engineer",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Sai Vardan Manikala",
      role: "Frontend Developer",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "K. Durga Manohar Reddy",
      role: "Data Scientist",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "K. Sekhar Venkata Prasad",
      role: "Backend Developer",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  ]

  const techStack = [
    { name: "Python", icon: "🐍" },
    { name: "XGBoost", icon: "📈" },
    { name: "Flask/Django", icon: "🖥️" },
    { name: "Next.js", icon: "⚛️" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "Chart.js", icon: "📊" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
            About <span className="text-primary">Our Project</span>
          </h1>

          <div className="max-w-3xl mx-auto space-y-12">
            {/* Project Overview */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4">
                   The Optimizing Data-Driven Healthcare Cost Prediction using XGBoost ML Algorithm is an AI-powered web application that predicts insurance
                    premiums based on various health and demographic factors. Our goal is to provide users with accurate
                    estimates to help them plan their healthcare expenses.
                  </p>
                  <p className="mb-4">
                    We use XGBoost, a powerful machine learning algorithm, to analyze patterns in insurance data and
                    generate premium predictions. The model has been trained on extensive datasets to achieve Upto a 95%
                    accuracy rate.
                  </p>
                  <p>
                    Our application takes into account factors such as age, BMI, smoking status, region,no.of children and gender to
                    provide personalized premium estimates. The interactive UI provides real-time feedback and insights
                    to help users understand how different factors affect their insurance costs.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* ML Model Pipeline */}
            <section>
              <h2 className="text-2xl font-bold mb-4">ML Model Pipeline</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="relative overflow-x-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center text-center gap-4">
                      <div className="bg-primary/10 p-4 rounded-lg w-full md:w-1/4">
                        <h3 className="font-medium mb-2">Data Collection</h3>
                        <p className="text-sm text-muted-foreground">Gathering insurance data from multiple sources</p>
                      </div>
                      <div className="hidden md:block">→</div>
                      <div className="bg-primary/10 p-4 rounded-lg w-full md:w-1/4">
                        <h3 className="font-medium mb-2">Preprocessing</h3>
                        <p className="text-sm text-muted-foreground">
                          Cleaning and transforming data for model training
                        </p>
                      </div>
                      <div className="hidden md:block">→</div>
                      <div className="bg-primary/10 p-4 rounded-lg w-full md:w-1/4">
                        <h3 className="font-medium mb-2">XGBoost Model</h3>
                        <p className="text-sm text-muted-foreground">Training and optimizing the prediction model</p>
                      </div>
                      <div className="hidden md:block">→</div>
                      <div className="bg-primary/10 p-4 rounded-lg w-full md:w-1/4">
                        <h3 className="font-medium mb-2">API Integration</h3>
                        <p className="text-sm text-muted-foreground">Deploying model for real-time predictions</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Team Members */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Team Members</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamMembers.map((member, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-lg font-bold text-primary">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                        <div className="ml-auto flex gap-2">
                          <Link
                            href={member.github}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                          </Link>
                          <Link
                            href={member.linkedin}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Tech Stack */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {techStack.map((tech, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <span className="text-2xl">{tech.icon}</span>
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

