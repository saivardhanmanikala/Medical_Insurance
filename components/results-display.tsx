"use client"

import { useEffect, useState } from "react"
import confetti from "canvas-confetti"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { BarChart } from "@/components/bar-chart"
import { InsurancePlans } from "@/components/insurance-plans"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ResultsDisplayProps {
  premium: number
  bmi: number | null
  isSmoker: boolean
}

export function ResultsDisplay({ premium, bmi, isSmoker }: ResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Trigger confetti animation when results are displayed
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [])

  // Generate comparison data for the chart
  // These values could be adjusted based on the actual premium range from the Flask backend
  const averagePremium = Math.round(premium * 0.85)
  const lowRiskPremium = Math.round(premium * 0.6)
  const highRiskPremium = Math.round(premium * 1.3)

  const chartData = [
    { name: "Your Estimate", value: premium },
    { name: "Average", value: averagePremium },
    { name: "Low Risk", value: lowRiskPremium },
    { name: "High Risk", value: highRiskPremium },
  ]

  return (
    <div className="space-y-6 animate-fade-up">
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Premium Overview</TabsTrigger>
          <TabsTrigger value="plans">Insurance Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-4">
          <Card className="border-primary/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Your Estimated Premium</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">₹{premium.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-2">
                This is an estimate based on the information you provided and our XGBoost model prediction.
              </p>
              <Button className="mt-4" onClick={() => setActiveTab("plans")}>
                View Insurance Plans
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Premium Comparison</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <BarChart data={chartData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Health Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {bmi && bmi > 25 && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>BMI Consideration</AlertTitle>
                    <AlertDescription>
                      Your BMI is above the normal range. Reducing your BMI to below 25 could potentially lower your
                      premium by up to ₹{Math.round((bmi - 25) * 500).toLocaleString()}.
                    </AlertDescription>
                  </Alert>
                )}

                {isSmoker && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Smoking Impact</AlertTitle>
                    <AlertDescription>
                      Being a smoker significantly increases your premium. Quitting smoking could reduce your premium by
                      approximately ₹{Math.round(premium * 0.3).toLocaleString()}.
                    </AlertDescription>
                  </Alert>
                )}

                {!isSmoker && (!bmi || bmi <= 25) && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Healthy Profile</AlertTitle>
                    <AlertDescription>
                      Your health profile is good! Maintaining your current lifestyle will help keep your premiums low.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="plans" className="pt-4">
          <InsurancePlans basePremium={premium} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
