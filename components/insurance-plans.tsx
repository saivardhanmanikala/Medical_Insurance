"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Check, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

interface InsurancePlan {
  id: string
  name: string
  description: string
  coveragePercentage: number
  coverageLimit: number
  minTerm: number
  maxTerm: number
  features: string[]
  premiumMultiplier: number
}

interface InsurancePlansProps {
  basePremium: number
}

export function InsurancePlans({ basePremium }: InsurancePlansProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>("standard")
  const [selectedTerm, setSelectedTerm] = useState<number>(5)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [policyNumber, setPolicyNumber] = useState("")

  const plans: InsurancePlan[] = [
    {
      id: "basic",
      name: "Basic Plan",
      description: "Essential coverage for individuals on a budget",
      coveragePercentage: 70,
      coverageLimit: 1000000,
      minTerm: 3,
      maxTerm: 10,
      features: [
        "Hospitalization coverage",
        "Basic medication coverage",
        "Emergency services",
        "Annual health check-up",
      ],
      premiumMultiplier: 0.8,
    },
    {
      id: "standard",
      name: "Standard Plan",
      description: "Comprehensive coverage for individuals and families",
      coveragePercentage: 85,
      coverageLimit: 3000000,
      minTerm: 5,
      maxTerm: 15,
      features: [
        "Hospitalization coverage",
        "Medication coverage",
        "Emergency services",
        "Specialist consultations",
        "Annual health check-up",
        "Dental coverage (basic)",
      ],
      premiumMultiplier: 1.0,
    },
    {
      id: "premium",
      name: "Premium Plan",
      description: "Complete coverage with additional benefits",
      coveragePercentage: 95,
      coverageLimit: 10000000,
      minTerm: 5,
      maxTerm: 20,
      features: [
        "Hospitalization coverage",
        "Full medication coverage",
        "Emergency services",
        "Specialist consultations",
        "Annual health check-up",
        "Dental coverage (comprehensive)",
        "Vision coverage",
        "International coverage",
        "Alternative medicine",
      ],
      premiumMultiplier: 1.4,
    },
  ]

  const selectedPlanDetails = plans.find((plan) => plan.id === selectedPlan) || plans[1]

  // Calculate adjusted premium based on selected plan
  const adjustedPremium = Math.round(basePremium * selectedPlanDetails.premiumMultiplier)

  // Calculate monthly premium
  const monthlyPremium = Math.round(adjustedPremium / 12)

  // Calculate claimable amounts for different years
  const calculateClaimableAmount = (years: number) => {
    const totalPaid = adjustedPremium * years
    const claimableAmount = Math.min(
      selectedPlanDetails.coverageLimit,
      totalPaid * 1.5 + (years > 5 ? (years - 5) * adjustedPremium * 0.6 : 0),
    )
    return claimableAmount
  }

  // Generate term options based on plan min and max terms
  const termOptions = []
  for (let i = selectedPlanDetails.minTerm; i <= selectedPlanDetails.maxTerm; i += 5) {
    termOptions.push(i)
  }
  if (!termOptions.includes(selectedPlanDetails.maxTerm)) {
    termOptions.push(selectedPlanDetails.maxTerm)
  }

  // Ensure selected term is valid for the current plan
  if (selectedTerm < selectedPlanDetails.minTerm || selectedTerm > selectedPlanDetails.maxTerm) {
    setSelectedTerm(selectedPlanDetails.minTerm)
  }

  // Handle plan purchase
  const handlePurchase = () => {
    // Generate a random policy number
    const randomPolicyNumber =
      "MHI-" +
      Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0")
    setPolicyNumber(randomPolicyNumber)

    // Show success dialog
    setShowSuccessDialog(true)

    // Show toast notification
    toast({
      title: "Plan Purchased Successfully!",
      description: `Your ${selectedPlanDetails.name} has been activated.`,
    })
  }

  // Format date for policy start
  const policyStartDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Calculate policy end date
  const policyEndDate = new Date()
  policyEndDate.setFullYear(policyEndDate.getFullYear() + selectedTerm)
  const formattedEndDate = policyEndDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Select an Insurance Plan</h2>
      <p className="text-muted-foreground">
        Choose a plan that best fits your needs and budget. Each plan offers different coverage levels and benefits.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative overflow-hidden transition-all duration-300 hover:shadow-md ${
              selectedPlan === plan.id ? "border-primary shadow-md" : ""
            }`}
          >
            {selectedPlan === plan.id && (
              <div className="absolute top-0 right-0">
                <div className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg">Selected</div>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Annual Premium</span>
                  <span className="font-medium">
                    ₹{Math.round(basePremium * plan.premiumMultiplier).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Premium</span>
                  <span className="font-medium">
                    ₹{Math.round((basePremium * plan.premiumMultiplier) / 12).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Coverage Limit</span>
                  <span className="font-medium">₹{plan.coverageLimit.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-sm font-medium mb-2">Key Features</h4>
                <ul className="text-sm space-y-1">
                  {plan.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.features.length > 4 && (
                    <li className="text-muted-foreground text-xs">+{plan.features.length - 4} more features</li>
                  )}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant={selectedPlan === plan.id ? "default" : "outline"}
                className="w-full"
                onClick={() => setSelectedPlan(plan.id)}
              >
                {selectedPlan === plan.id ? "Selected" : "Select Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Plan Details: {selectedPlanDetails.name}</span>
            <span className="text-primary">₹{adjustedPremium.toLocaleString()}/year</span>
          </CardTitle>
          <CardDescription>Select a term to see how your coverage grows over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Select Term Length</h3>
              <RadioGroup
                value={selectedTerm.toString()}
                onValueChange={(value) => setSelectedTerm(Number.parseInt(value))}
                className="flex flex-wrap gap-4"
              >
                {termOptions.map((term) => (
                  <div key={term} className="flex items-center space-x-2">
                    <RadioGroupItem value={term.toString()} id={`term-${term}`} />
                    <Label htmlFor={`term-${term}`}>{term} years</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center">
                Claimable Amount Over Time
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground ml-2 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>
                        The claimable amount increases the longer you maintain your policy. After 5 years, you receive
                        additional benefits.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h3>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Years</TableHead>
                    <TableHead>Total Paid</TableHead>
                    <TableHead>Claimable Amount</TableHead>
                    <TableHead>Return Ratio</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 3, 5, 10, selectedTerm]
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .sort((a, b) => a - b)
                    .map((years) => {
                      if (years > selectedPlanDetails.maxTerm) return null

                      const totalPaid = adjustedPremium * years
                      const claimableAmount = calculateClaimableAmount(years)
                      const ratio = (claimableAmount / totalPaid).toFixed(2)

                      return (
                        <TableRow key={years} className={years === selectedTerm ? "bg-muted/50" : ""}>
                          <TableCell className="font-medium">
                            {years} {years === 1 ? "year" : "years"}
                          </TableCell>
                          <TableCell>₹{totalPaid.toLocaleString()}</TableCell>
                          <TableCell className="text-primary font-medium">
                            ₹{claimableAmount.toLocaleString()}
                          </TableCell>
                          <TableCell>{ratio}x</TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Premium</p>
                  <p className="text-xl font-bold">₹{monthlyPremium.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Annual Premium</p>
                  <p className="text-xl font-bold">₹{adjustedPremium.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Claimable After {selectedTerm} Years</p>
                  <p className="text-xl font-bold text-primary">
                    ₹{calculateClaimableAmount(selectedTerm).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handlePurchase}>Proceed with Selected Plan</Button>
        </CardFooter>
      </Card>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Check className="h-6 w-6 text-green-500" />
              Plan Purchased Successfully!
            </DialogTitle>
            <DialogDescription>
              Your insurance plan has been activated. Below are your policy details.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Policy Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Policy Number:</span>
                  <span className="font-medium">{policyNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan:</span>
                  <span className="font-medium">{selectedPlanDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Term:</span>
                  <span className="font-medium">{selectedTerm} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Start Date:</span>
                  <span className="font-medium">{policyStartDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">End Date:</span>
                  <span className="font-medium">{formattedEndDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Annual Premium:</span>
                  <span className="font-medium">₹{adjustedPremium.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Coverage Limit:</span>
                  <span className="font-medium">₹{selectedPlanDetails.coverageLimit.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-900">
              <p className="text-sm text-green-800 dark:text-green-300">
                A confirmation email with your policy details has been sent to your registered email address. You can
                also download your policy document from your account dashboard.
              </p>
            </div>
          </div>

          <DialogFooter className="sm:justify-start">
            <Button variant="outline" onClick={() => setShowSuccessDialog(false)}>
              Close
            </Button>
            <Button>Download Policy</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
