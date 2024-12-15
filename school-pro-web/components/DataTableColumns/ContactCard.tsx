"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import {
  Badge,
  Briefcase,
  Building,
  Calendar,
  Globe,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardContent } from "../ui/card";

interface Contact {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  school: string;
  country: string;
  schoolPage: string;
  students: number;
  role: string;
  media: string;
  created: string;
}

interface ContactInfoModalProps {
  contact: Contact;
  trigger?: React.ReactNode;
}

export default function ContactInfoModal({
  contact,
  trigger,
}: ContactInfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const infoCards = [
    { icon: Mail, label: "Email", value: contact.email },
    { icon: Phone, label: "Phone", value: contact.phone },
    { icon: Building, label: "School", value: contact.school },
    { icon: MapPin, label: "Country", value: contact.country },
    { icon: Globe, label: "School Page", value: contact.schoolPage },
    { icon: Users, label: "Students", value: contact.students.toString() },
    { icon: Briefcase, label: "Role", value: contact.role },
    {
      icon: Calendar,
      label: "Joined",
    //   value: new Date(contact.created).toLocaleDateString(),
      value: contact.created ? new Date(contact.created).toLocaleDateString() : "N/A",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">View</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${contact.fullname}`}
                alt={contact.fullname}
              />
              <AvatarFallback>
                {contact.fullname
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{contact.fullname}</h2>
              <Badge className="mt-1">Via {contact.media}</Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {infoCards.map((card, index) => (
            <Card key={index}>
              <CardContent className="p-4 flex flex-col items-center text-center">
                <card.icon className="w-6 h-6 mb-2 text-gray-600" />
                <h3 className="font-medium">{card.label}</h3>
                <p className="text-sm text-gray-500">{card.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
