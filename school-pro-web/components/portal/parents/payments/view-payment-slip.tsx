import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  import { format } from 'date-fns'
  
  interface PaymentSlip {
    id: number
    date: string
    description: string
    amount: number
    status: string
    schoolAccount: string
  }
  
  interface ViewPaymentSlipProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    paymentSlip: PaymentSlip | null
  }
  
  export function ViewPaymentSlip({ open, onOpenChange, paymentSlip }: ViewPaymentSlipProps) {
    if (!paymentSlip) return null
  
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Payment Slip</DialogTitle>
            <DialogDescription>
              Details of the payment slip
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="font-medium">Date:</span>
              <span className="col-span-2">{format(new Date(paymentSlip.date), 'MMMM d, yyyy')}</span>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="font-medium">Description:</span>
              <span className="col-span-2">{paymentSlip.description}</span>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="font-medium">Amount:</span>
              <span className="col-span-2">${paymentSlip.amount.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="font-medium">Status:</span>
              <span className="col-span-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${paymentSlip.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                    paymentSlip.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'}`}>
                  {paymentSlip.status}
                </span>
              </span>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="font-medium">School Account:</span>
              <span className="col-span-2">{paymentSlip.schoolAccount}</span>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
  
  