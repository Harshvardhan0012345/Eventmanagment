import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for small personal events",
      icon: Star,
      features: [
        "Up to 3 events per month",
        "50 guests per event",
        "Basic RSVP management",
        "Email notifications",
        "Mobile responsive design",
        "Community support",
      ],
      cta: "Get Started Free",
      popular: false,
      gradient: "from-gray-500 to-gray-600",
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "Ideal for event professionals and businesses",
      icon: Zap,
      features: [
        "Unlimited events",
        "500 guests per event",
        "Advanced analytics",
        "Custom branding",
        "QR code check-ins",
        "Priority support",
        "Export guest lists",
        "Custom event pages",
      ],
      cta: "Start Free Trial",
      popular: true,
      gradient: "from-primary to-secondary",
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For large organizations and agencies",
      icon: Crown,
      features: [
        "Unlimited everything",
        "White-label solution",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced security",
        "Team collaboration",
        "24/7 phone support",
      ],
      cta: "Contact Sales",
      popular: false,
      gradient: "from-purple-500 to-pink-500",
    },
  ]

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any billing differences.",
    },
    {
      question: "What happens to my events if I downgrade?",
      answer:
        "Your existing events remain active. However, you may be limited in creating new events based on your plan's restrictions.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll refund your payment in full.",
    },
    {
      question: "Is there a setup fee?",
      answer: "No setup fees ever! You only pay the monthly subscription fee for your chosen plan.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <ScrollReveal>
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Simple, Transparent Pricing</Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Start free and scale as you grow. No hidden fees, no surprises. Just powerful event management tools that
              grow with your needs.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-16">
              <img
                src="/event-planning-workspace.png"
                alt="Event planning dashboard"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-lg font-medium">Trusted by 10,000+ event organizers worldwide</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <ScrollReveal key={plan.name} delay={index * 100}>
                <Card
                  className={`relative h-full border-0 overflow-hidden ${
                    plan.popular
                      ? "bg-gradient-to-br from-primary/10 to-secondary/10 shadow-2xl scale-105"
                      : "bg-background/50 backdrop-blur-sm hover:shadow-xl"
                  } transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-secondary text-white text-center py-2 text-sm font-medium">
                      Most Popular
                    </div>
                  )}

                  <CardHeader className={`text-center ${plan.popular ? "pt-12" : "pt-8"}`}>
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold mt-4">
                      {plan.price}
                      {plan.period && <span className="text-lg text-muted-foreground">{plan.period}</span>}
                    </div>
                    <p className="text-muted-foreground mt-2">{plan.description}</p>
                  </CardHeader>

                  <CardContent className="px-8 pb-8">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        plan.popular ? "bg-gradient-to-r from-primary to-secondary hover:shadow-lg" : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                      size="lg"
                      asChild
                    >
                      <Link href={plan.name === "Enterprise" ? "/contact" : "/events/create"}>{plan.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Choose EventFlow?</h2>
              <p className="text-xl text-muted-foreground">
                More than just event management - it's your complete event ecosystem
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">No Setup Fees</h3>
                    <p className="text-muted-foreground">
                      Get started immediately with no upfront costs or hidden charges.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                    <p className="text-muted-foreground">Create and launch events in minutes, not hours.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Enterprise Ready</h3>
                    <p className="text-muted-foreground">
                      Scale from small gatherings to massive conferences seamlessly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                    <p className="text-muted-foreground">
                      Get help whenever you need it with our dedicated support team.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground">Everything you need to know about our pricing</p>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <ScrollReveal key={faq.question} delay={index * 100}>
                <Card className="border-0 bg-background/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of event organizers who've made the switch to EventFlow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/events/create">Start Free Trial</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                asChild
              >
                <Link href="/contact">Talk to Sales</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
