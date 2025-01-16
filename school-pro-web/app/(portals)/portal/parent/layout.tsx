"use client";

import RoleBasedWrapper from '@/components/RoleBasedWrapper'
import React, { ReactNode } from 'react'

export default function RoleLayout({children}:{children:ReactNode}) {
  return (
   <RoleBasedWrapper allowedRoles={["PARENT"]}>
        {children}
    </RoleBasedWrapper>
  )
}
