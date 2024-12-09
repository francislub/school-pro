"use client"

import { useState } from "react";
import { X } from "lucide-react";

interface BannerProps {
  message: string;
  type: "info" | "success";
}

export default function InfoBanner({ message, type }: BannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const styles = {
    info: "bg-blue-500 text-white border-blue-700",
    success: "bg-green-500 text-white border-green-700",
  };

  return (
    <div
      className={`flex items-center justify-between p-4 border-l-4 rounded-md shadow-md ${styles[type]} transition`}
    >
      <span>{message}</span>
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
        className="ml-4 text-white hover:text-opacity-80 focus:outline-none"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
