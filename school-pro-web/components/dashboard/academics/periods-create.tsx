import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface CreatePeriodModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreatePeriod: (period: {
    year: number
    term: number
    startDate: Date
    endDate: Date
    isActive: boolean
  }) => void
}

export function CreatePeriodModal({ open, onOpenChange, onCreatePeriod }: CreatePeriodModalProps) {
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [term, setTerm] = useState<number>(1)
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [isActive, setIsActive] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreatePeriod({
      year,
      term,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      isActive,
    })
    // Reset form
    setYear(new Date().getFullYear())
    setTerm(1)
    setStartDate('')
    setEndDate('')
    setIsActive(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Academic Period</DialogTitle>
          <DialogDescription>
            Enter the details for the new academic period.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-right">
                Year
              </Label>
              <Input
                id="year"
                type="number"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="term" className="text-right">
                Term
              </Label>
              <Input
                id="term"
                type="number"
                min="1"
                max="3"
                value={term}
                onChange={(e) => setTerm(parseInt(e.target.value))}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="isActive">Set as active period</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Period</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

