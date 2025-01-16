
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Archive } from 'lucide-react'
import { format } from "date-fns"

interface Message {
  id: string
  sender: string
  senderEmail: string
  subject: string
  content: string
  timestamp: Date
  avatar?: string
}

interface MessageViewProps {
  message: Message
  onSendReply: (content: string) => void
  onArchive: () => void
}

export function MessageView({ message, onSendReply, onArchive }: MessageViewProps) {
  const initials = message.sender
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()

  return (
    <Card className="flex h-screen flex-col">
      <CardHeader className="flex-none">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={message.avatar} alt={message.sender} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold">{message.sender}</h2>
                  <h3 className="text-lg">{message.subject}</h3>
                </div>
                <time className="text-sm text-gray-500">
                  {format(message.timestamp, "MMM d, yyyy, h:mm a")}
                </time>
              </div>
              <p className="text-sm text-gray-500">Reply-To: {message.senderEmail}</p>
            </div>
          </div>
          <Button variant="outline" size="icon" onClick={onArchive}>
            <Archive className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <div className="prose max-w-none">
          {message.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-none border-t">
        <form className="flex w-full gap-4" onSubmit={(e) => {
          e.preventDefault()
          const form = e.target as HTMLFormElement
          const textarea = form.querySelector('textarea')
          if (textarea) {
            onSendReply(textarea.value)
            textarea.value = ''
          }
        }}>
          <Textarea 
            placeholder="Type your reply..." 
            className="flex-1"
          />
          <div className="flex flex-col justify-between">
            <Button type="submit">Send</Button>
            <div className="flex items-center gap-2">
              <Switch id="mute" />
              <label htmlFor="mute" className="text-sm">
                Mute this thread
              </label>
            </div>
          </div>
        </form>
      </CardFooter>
    </Card>
  )
}

