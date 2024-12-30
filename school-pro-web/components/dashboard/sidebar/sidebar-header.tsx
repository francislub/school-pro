import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarTrigger } from '@/components/ui/sidebar'
import { Plus } from 'lucide-react'
import React from 'react'
import UserMenu from './user-menu'

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
            <Plus className="h-5 w-5" />
            <span className="sr-only">Add new</span>
          </Button>
          <SidebarFooter>
            <SidebarMenu>
            <SidebarMenuItem>
                <UserMenu />
            </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          {/* <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar> */}
        </div>
  )
}
