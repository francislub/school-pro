import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Plus, Sun } from 'lucide-react'
import React from 'react'

export default function SidebarHeader() {
  return (
    <div className="flex h-16 items-center gap-4 border-b px-4">
          <SidebarTrigger />
          <div className="flex-1">
            <Input
              placeholder="Search products..."
              className="max-w-sm"
            />
          </div>
          <Button variant="outline" size="icon">
            <span className="sr-only">Toggle theme</span>
            <Sun className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <Plus className="h-5 w-5" />
            <span className="sr-only">Add new</span>
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
  )
}
