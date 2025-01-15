"use client";
import React from "react";
import PortalAnalytics from "@/components/portal/PortalAnalytics";


export default function Portal() {
  return (
    <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight mb-3">
                Welcome, Dr. JB Web Developer
              </h1>
              <div className="">
                <p>Status</p>
              </div>
            </div>

            <PortalAnalytics />
          </div>
  );
}
