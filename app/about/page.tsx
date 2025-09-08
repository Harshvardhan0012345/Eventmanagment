import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Target, Zap } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Founder",
      image: "/professional-ceo-smiling.png",
      bio: "Former event planner with 10+ years experience organizing corporate and social events.",
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO",
      image: "/professional-cto-developer.png",
      bio: "Tech veteran who's built scalable platforms for millions of users worldwide.",
    },
    {
      name: "Emily Watson",
      role: "Head of Design",
      image: "/professional-woman-designer-creative.png",
      bio: "Award-winning UX designer passionate about creating delightful user experiences.",
    },
  ]

  const values = [
    {
      icon: Heart,
      title: "People First",
      description: "Every feature we build puts human connection at the center of the experience.",
    },
    {
      icon: Target,
      title: "Simplicity",
      description: "Complex event management made simple through intuitive design and smart automation.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Constantly pushing boundaries to make event planning faster, smarter, and more enjoyable.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
        <div className="max-w-6xl mx-auto relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">About EventFlow</Badge>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6">
                Bringing People Together
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We believe that every gathering has the power to create lasting memories, forge meaningful connections,
                and bring communities closer together.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/diverse-celebration.png"
                alt="People celebrating at an event"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  EventFlow was born from a simple frustration: planning events shouldn't be harder than the events
                  themselves. After organizing countless weddings, corporate gatherings, and community meetups, we
                  realized there had to be a better way.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  In 2023, we set out to build the event management platform we wished we'd had all along. Today,
                  EventFlow powers thousands of events worldwide, from intimate dinner parties to large-scale
                  conferences.
                </p>
                <div className="flex gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">50K+</div>
                    <div className="text-sm text-muted-foreground">Events Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary">2M+</div>
                    <div className="text-sm text-muted-foreground">RSVPs Managed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">99.9%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img src="/modern-office-team-planning.png" alt="Team collaboration" className="rounded-2xl shadow-xl" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 100}>
                <Card className="h-full border-0 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">The passionate people behind EventFlow</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 100}>
                <Card className="overflow-hidden border-0 bg-gradient-to-br from-background to-primary/5 hover:shadow-xl transition-all duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
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
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Create Amazing Events?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of event organizers who trust EventFlow to bring their visions to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/events/create">Start Creating Events</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                asChild
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
