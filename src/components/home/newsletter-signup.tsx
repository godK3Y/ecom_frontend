"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-16 sm:py-24 bg-primary text-primary-foreground">
      <div className="   px-24">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10">
                <Mail className="h-6 w-6" />
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Stay in the Loop
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Be the first to know about new arrivals, exclusive offers, and
              style inspiration.
            </p>
          </div>

          {isSubmitted ? (
            <div className="space-y-4">
              <div className="text-lg font-medium">
                Thank you for subscribing!
              </div>
              <p className="text-primary-foreground/80">
                You&apos;ll receive our latest updates and exclusive offers.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button
                type="submit"
                variant="secondary"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Subscribe
              </Button>
            </form>
          )}

          <p className="text-sm text-primary-foreground/60">
            No spam, unsubscribe at any time. Read our{" "}
            <a href="/privacy" className="underline hover:no-underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
