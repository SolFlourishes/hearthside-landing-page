import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Heart, Users, Lightbulb, BookOpen } from "lucide-react"

export default function BecomingElderPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/20 to-primary/5 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Heart className="w-16 h-16 mx-auto mb-6 text-primary" aria-hidden="true" />
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">Becoming an Elder</h1>
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                Becoming an Elder introduces you to the mentorship and wisdom-sharing role central to our community.
                Learn how you can guide others, share your experience, and help build a more connected world.
              </p>
            </div>
          </div>
        </section>

        {/* What is an Elder Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl font-bold mb-6 text-center">What Does It Mean to Be an Elder?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12 text-center">
                In our community, an Elder isn't defined by age, but by their willingness to share wisdom, support
                others, and create spaces where everyone can flourish. Elders are mentors, guides, and champions of
                mutual care.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <Lightbulb className="w-8 h-8 mb-2 text-primary" />
                    <CardTitle>Share Wisdom</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Offer your experiences and insights to help others navigate communication challenges and build
                      stronger connections.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Users className="w-8 h-8 mb-2 text-primary" />
                    <CardTitle>Mentor Others</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Guide community members through their communication journey, helping them discover their unique
                      voice and style.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Heart className="w-8 h-8 mb-2 text-primary" />
                    <CardTitle>Build Community</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Create inclusive spaces where diverse perspectives are valued and everyone feels they belong.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* The Elder Program Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl font-bold mb-6 text-center">The Elder Program</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-center">
                Our Elder Program is a concrete way to embody these values. As an Elder subscriber, you not only gain
                access to all premium features, but you also sponsor someone in need—ensuring everyone has the tools to
                communicate effectively.
              </p>

              <div className="bg-card border rounded-lg p-8 text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-serif text-2xl font-bold mb-4">Ready to Make a Difference?</h3>
                <p className="text-muted-foreground mb-6">
                  Learn more about joining the Elder Program and supporting our community.
                </p>
                <Button asChild size="lg">
                  <Link href="/elder-program">Explore the Elder Program</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl font-bold mb-6 text-center">How to Begin Your Elder Journey</h2>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        1
                      </div>
                      <CardTitle>Understand Your Communication Style</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Take the Communication Style Quiz to discover your unique strengths and how you can best support
                      others.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        2
                      </div>
                      <CardTitle>Engage with the Community</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Read stories, explore our tools like Clarity Coach, and connect with others who share your values
                      of mutual care.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        3
                      </div>
                      <CardTitle>Share and Support</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Whether through the Elder Program or by sharing your experiences, find ways to lift up others and
                      help them flourish.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
