
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Archive, Plus } from 'lucide-react'
import { formatDistanceToNow } from "date-fns"

interface Message {
  id: string
  sender: string
  subject: string
  preview: string
  timestamp: Date
  read: boolean
  labels: string[]
}

interface MessageListProps {
  messages: Message[]
  selectedId: string
  onSelect: (id: string) => void
  onArchive: (id: string) => void
  onComposeClick: () => void
}

export function MessageList({ messages, selectedId, onSelect, onArchive, onComposeClick }: MessageListProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <Button onClick={onComposeClick} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Compose
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-2 rounded-lg p-3 transition-colors group",
                "hover:bg-gray-100",
                selectedId === message.id ? "bg-gray-100" : "bg-white",
                !message.read && "font-medium"
              )}
            >
              <button
                onClick={() => onSelect(message.id)}
                className="flex-1 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{message.sender}</span>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                  </span>
                </div>
                <span className="text-sm">{message.subject}</span>
                <span className="text-xs text-gray-500 line-clamp-1">{message.preview}</span>
                {message.labels.length > 0 && (
                  <div className="flex gap-1 mt-1">
                    {message.labels.map((label) => (
                      <Badge key={label} variant="secondary" className="text-xs">
                        {label}
                      </Badge>
                    ))}
                  </div>
                )}
              </button>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onArchive(message.id)}
              >
                <Archive className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

