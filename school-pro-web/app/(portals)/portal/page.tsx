
import React from "react";
import PortalAnalytics from "@/components/portal/PortalAnalytics";
import { getServerUser } from "@/actions/auth";


export default async function Portal() {
  const user = await getServerUser()
  return (
    <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight mb-3">
                Welcome, {user?.role} - {user?.name}
              </h1>
              <div className="">
                <p>Status</p>
              </div>
            </div>

            <PortalAnalytics />
          </div>
  );
}
