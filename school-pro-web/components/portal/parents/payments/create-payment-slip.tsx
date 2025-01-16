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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CreatePaymentSlipProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateSlip: (paymentDetails: {
    description: string
    amount: number
    dueDate: string
    schoolAccount: string
  }) => void
}

export function CreatePaymentSlip({ open, onOpenChange, onCreateSlip }: CreatePaymentSlipProps) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [schoolAccount, setSchoolAccount] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreateSlip({
      description,
      amount: parseFloat(amount),
      dueDate,
      schoolAccount,
    })
    onOpenChange(false)
    // Reset form
    setDescription('')
    setAmount('')
    setDueDate('')
    setSchoolAccount('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Payment Slip</DialogTitle>
          <DialogDescription>
            Enter the details for the new payment slip.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">
                Due Date
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="schoolAccount" className="text-right">
                School Account
              </Label>
              <Input
                id="schoolAccount"
                value={schoolAccount}
                onChange={(e) => setSchoolAccount(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Slip</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

