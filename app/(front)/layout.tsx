import SiteFooter from '@/components/frontend/site-footer'
import SiteHeader from '@/components/site-header'
import React, { ReactNode } from 'react'

export default function FrontLayout({children}: {children:ReactNode}) {
  return (
    <div>
        <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  )
}
