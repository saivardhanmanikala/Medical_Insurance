"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ResultsDisplay } from "@/components/results-display"
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
  age: z.coerce.number().min(18, "Age must be at least 18 years").max(100, "Age must be less than 100 years"),
  height: z.coerce.number().min(100, "Height must be at least 100 cm").max(250, "Height must be less than 250 cm"),
  weight: z.coerce.number().min(30, "Weight must be at least 30 kg").max(300, "Weight must be less than 300 kg"),
  isSmoker: z.boolean().default(false),
  region: z.string().min(1, "Please select a region"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  children: z.coerce
    .number()
    .min(0, "Number of children cannot be negative")
    .max(10, "Maximum 10 children allowed")
    .default(0),
})

export function EstimatorForm() {
  const [bmi, setBmi] = useState<number | null>(null)
  const [bmiCategory, setBmiCategory] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [premium, setPremium] = useState<number | null>(null)
  const [flaskError, setFlaskError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: undefined,
      height: undefined,
      weight: undefined,
      isSmoker: false,
      region: "northeast", // Default to northeast as in the Flask code
      gender: undefined,
      children: 0,
    },
    mode: "onChange", // This enables real-time validation as the user types
  })

  const calculateBmi = (height: number, weight: number) => {
    // Convert height from cm to m and calculate BMI
    const heightInMeters = height / 100
    const bmiValue = weight / (heightInMeters * heightInMeters)
    setBmi(Number.parseFloat(bmiValue.toFixed(1)))

    // Determine BMI category
    if (bmiValue < 18.5) {
      setBmiCategory("Underweight")
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setBmiCategory("Normal")
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setBmiCategory("Overweight")
    } else {
      setBmiCategory("Obese")
    }
  }

  // Watch height and weight to calculate BMI in real-time
  const height = form.watch("height")
  const weight = form.watch("weight")

  // Use useEffect to calculate BMI when height or weight changes
  useEffect(() => {
    if (height && weight) {
      calculateBmi(height, weight)
    }
  }, [height, weight])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setFlaskError(null)

    try {
      // Prepare data for Flask backend - only send the exact fields expected
      const requestData = {
        age: values.age,
        bmi: bmi || 0, // Use calculated BMI
        isSmoker: values.isSmoker,
        region: values.region,
        children: values.children,
        gender: values.gender, // Include gender in the request data
      }

      console.log("Sending data to Flask:", requestData)

      // Call Flask backend
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      })

      const data = await response.json()
      console.log("Received response from Flask:", data)

      if (response.ok) {
        // Set premium from Flask response
        setPremium(data.predicted_premium)
        setShowResults(true)
        toast({
          title: "Prediction Successful",
          description: "Your insurance premium has been calculated successfully.",
        })
      } else {
        // Handle error from Flask
        setFlaskError(data.error || "Prediction failed!")
        toast({
          title: "Prediction Error",
          description: data.error || "Failed to get premium prediction. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error connecting to Flask server:", error)
      // Handle connection error
      setFlaskError("Error connecting to server!")
      toast({
        title: "Connection Error",
        description: "Could not connect to the prediction server. Please ensure the Flask server is running.",
        variant: "destructive",
      })

      // Fallback to a mock premium for demo purposes
      setPremium(12500)
      setShowResults(true)
      toast({
        title: "Using Demo Mode",
        description: "Could not connect to the prediction server. Using demo data instead.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter your age (18-100)"
                          {...field}
                          min={18}
                          max={100}
                          onChange={(e) => {
                            field.onChange(e)
                            // Show toast for out of range values
                            const value = Number.parseInt(e.target.value)
                            if (value < 18 || value > 100) {
                              toast({
                                title: "Invalid Age",
                                description: "Age must be between 18 and 100 years.",
                                variant: "destructive",
                              })
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription>Your current age in years (18-100).</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="male" />
                            </FormControl>
                            <FormLabel className="font-normal">Male</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="female" />
                            </FormControl>
                            <FormLabel className="font-normal">Female</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="other" />
                            </FormControl>
                            <FormLabel className="font-normal">Other</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">BMI Calculator</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter your height (100-250 cm)"
                          {...field}
                          min={100}
                          max={250}
                          onChange={(e) => {
                            field.onChange(e)
                            // Show toast for out of range values
                            const value = Number.parseInt(e.target.value)
                            if (value < 100 || value > 250) {
                              toast({
                                title: "Invalid Height",
                                description: "Height must be between 100 and 250 cm.",
                                variant: "destructive",
                              })
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription>Valid range: 100-250 cm</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter your weight (30-300 kg)"
                          {...field}
                          min={30}
                          max={300}
                          onChange={(e) => {
                            field.onChange(e)
                            // Show toast for out of range values
                            const value = Number.parseInt(e.target.value)
                            if (value < 30 || value > 300) {
                              toast({
                                title: "Invalid Weight",
                                description: "Weight must be between 30 and 300 kg.",
                                variant: "destructive",
                              })
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription>Valid range: 30-300 kg</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {bmi !== null && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Your BMI</p>
                      <p className="text-2xl font-bold">{bmi}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Category</p>
                      <p
                        className={`text-lg font-semibold ${
                          bmiCategory === "Normal"
                            ? "text-green-500"
                            : bmiCategory === "Underweight"
                              ? "text-amber-500"
                              : "text-red-500"
                        }`}
                      >
                        {bmiCategory}
                      </p>
                    </div>
                  </div>

                  {bmiCategory === "Overweight" || bmiCategory === "Obese" ? (
                    <p className="mt-2 text-sm text-muted-foreground">
                      A higher BMI may result in higher insurance premiums. Consider consulting with a healthcare
                      provider about weight management.
                    </p>
                  ) : bmiCategory === "Underweight" ? (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Being underweight may affect your premium. Consider consulting with a healthcare provider about
                      healthy weight gain.
                    </p>
                  ) : (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Your BMI is within the normal range, which may positively impact your insurance premium.
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="isSmoker"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Smoking Status</FormLabel>
                        <FormDescription>Do you currently smoke tobacco products?</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value ?? false}
                          onCheckedChange={(checked) => {
                            console.log("Switch Toggled:", checked) // Debugging
                            field.onChange(checked) // Update form state
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your region" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="northeast">Northeast</SelectItem>
                          <SelectItem value="southeast">Southeast</SelectItem>
                          <SelectItem value="southwest">Southwest</SelectItem>
                          <SelectItem value="northwest">Northwest</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>The region where you currently reside.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* New Card for Children Information */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="children"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Children</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter number of children (0-10)"
                          min="0"
                          max="10"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            // Show toast for out of range values
                            const value = Number.parseInt(e.target.value)
                            if (value < 0 || value > 10) {
                              toast({
                                title: "Invalid Number of Children",
                                description: "Number of children must be between 0 and 10.",
                                variant: "destructive",
                              })
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        The number of children covered under your insurance plan (0-10).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {flaskError && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg border border-destructive/20">
              <p className="font-medium">Error: {flaskError}</p>
              <p className="text-sm mt-1">Please ensure the Flask server is running at http://127.0.0.1:5000</p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculating Premium...
              </>
            ) : (
              "Calculate Premium"
            )}
          </Button>
        </form>
      </Form>

      {showResults && premium !== null && (
        <ResultsDisplay premium={premium} bmi={bmi} isSmoker={form.getValues("isSmoker")} />
      )}
    </div>
  )
}
