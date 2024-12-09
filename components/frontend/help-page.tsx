"use client";

import * as React from "react";
import { Search, Mail, Phone, MessageCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const articles = [
  {
    id: 1,
    title: "Getting Started Guide",
    excerpt: "Learn the basics of using our platform",
    category: "Basics",
  },
  {
    id: 2,
    title: "Account Management",
    excerpt: "How to manage your settings",
    category: "Account",
  },
  {
    id: 3,
    title: "Troubleshooting Common Issues",
    excerpt: "Solutions to frequent problems",
    category: "Support",
  },
];

const faqs = [
  {
    question: "What is SchoolPro?",
    answer: "SchoolPro is a comprehensive online school management system designed to streamline educational administration. It provides tools for managing admissions, student information, scheduling, grading and more-all accessible anytime, anywhere through the internet.",
  },
  {
    question: "How do I reset my password?",
    answer: "To reset your password, click on the 'Forgot Password' link on the login page. Enter your registered email address, and we'll send you instructions to reset your password.",
  },
  {
    question: "Can I access SchoolPro on my mobile device?",
    answer: "Yes, SchoolPro is fully responsive and can be accessed on any device with an internet connection, including smartphones and tablets.",
  },
  {
    question: "How secure is my data on SchoolPro?",
    answer: "We take data security very seriously. SchoolPro uses industry-standard encryption protocols and regular security audits to ensure your data is protected.",
  },
  {
    question: "Is there a limit to the number of students we can manage?",
    answer: "SchoolPro is designed to scale with your needs. There's no hard limit on the number of students you can manage, but larger institutions may require a custom plan.",
  },
  {
    question: "How often is SchoolPro updated?",
    answer: "We regularly update SchoolPro with new features and improvements. Major updates are typically released quarterly, with minor updates and bug fixes rolled out more frequently.",
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Articles section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Help Articles</h2>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <Link href="#" key={article.id}>
              <Card className="hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {article.excerpt}
                  </p>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Contact Cards section */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2" /> Email Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">Get in touch via email:</p>
              <Button asChild>
                <Link href="mailto:support@schoolpro.com">Send Email</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="mr-2" /> Phone Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">Call us for immediate help:</p>
              <Button asChild>
                <Link href="tel:+1234567890">Call Now</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="mr-2" /> Live Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">Chat with our support team:</p>
              <Button>Start Chat</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

