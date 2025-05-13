import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import TextHumanizerTool from "./TextHumanizerTool";
import SubscriptionBanner from "./SubscriptionBanner";
import { Sparkles, Shield, Zap, User } from "lucide-react";

const Home = () => {
  // Mock user state - in a real app, this would come from auth context
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Navigation Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">TextHumanizer</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Pricing</Button>
            <Button variant="ghost">FAQ</Button>
            {isLoggedIn ? (
              <Button variant="outline" size="sm" className="gap-2">
                <User size={16} />
                Dashboard
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLoggedIn(true)}
                >
                  Log in
                </Button>
                <Button size="sm" onClick={() => setIsLoggedIn(true)}>
                  Sign up
                </Button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-12 md:py-24 lg:py-32">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <motion.h1
            className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Make Your AI-Generated Content{" "}
            <span className="text-primary">Undetectable</span>
          </motion.h1>
          <motion.p
            className="max-w-[750px] text-lg text-muted-foreground sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Transform AI-written text into natural, human-like content that
            bypasses AI detection tools. Perfect for students, professionals,
            and content creators.
          </motion.p>
          <motion.div
            className="flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" className="gap-2">
              <Zap size={18} />
              Try for Free
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Shield size={18} />
              How It Works
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Subscription Banner */}
      <div className="container py-4">
        <SubscriptionBanner
          isSubscribed={isLoggedIn}
          wordLimit={500}
          wordsUsed={0}
          onUpgrade={() => console.log("Upgrade clicked")}
        />
      </div>

      {/* Main Tool Section */}
      <section className="container py-8">
        <Card className="border-2 border-muted/30 shadow-lg">
          <CardContent className="p-6">
            <TextHumanizerTool />
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section className="container py-16 md:py-24">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Why Choose TextHumanizer?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Undetectable Results",
              description:
                "Our advanced algorithms transform AI text to bypass detection tools with high success rates.",
              icon: <Shield className="h-10 w-10 text-primary" />,
            },
            {
              title: "Preserve Key Points",
              description:
                "Maintain the original meaning and important information while making the text more human-like.",
              icon: <Sparkles className="h-10 w-10 text-primary" />,
            },
            {
              title: "Multiple Style Options",
              description:
                "Choose from academic, casual, or professional writing styles to match your specific needs.",
              icon: <Zap className="h-10 w-10 text-primary" />,
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="flex flex-col items-center p-6 text-center"
            >
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/20">
        <div className="container py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold">TextHumanizer</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TextHumanizer. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">
                Terms
              </Button>
              <Button variant="ghost" size="sm">
                Privacy
              </Button>
              <Button variant="ghost" size="sm">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
