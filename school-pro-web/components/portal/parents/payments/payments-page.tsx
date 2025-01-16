'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Label } from "@/components/ui/label"
import { FileText, Plus } from 'lucide-react'
import { CreatePaymentSlip } from './create-payment-slip'
import { ViewPaymentSlip } from './view-payment-slip'

// Mock data for payments
interface PaymentSlip {
  id: number;
  date: string;
  description: string;
  amount: number;
  status: string;
  schoolAccount: string;
}

const paymentsData: PaymentSlip[] = [
  { id: 1, date: '2024-01-05', description: 'Tuition Fee', amount: 500, status: 'Paid', schoolAccount: '12345' },
  { id: 2, date: '2024-01-10', description: 'Books and Supplies', amount: 150, status: 'Pending', schoolAccount: '12345' },
  { id: 3, date: '2024-01-15', description: 'School Trip', amount: 75, status: 'Paid', schoolAccount: '12345' },
  { id: 4, date: '2024-01-20', description: 'Exam Fees', amount: 50, status: 'Overdue', schoolAccount: '12345' },
  { id: 5, date: '2024-01-25', description: 'Sports Equipment', amount: 100, status: 'Paid', schoolAccount: '12345' },
  { id: 6, date: '2024-02-01', description: 'Lab Fees', amount: 80, status: 'Pending', schoolAccount: '12345' },
  { id: 7, date: '2024-02-05', description: 'Tuition Fee', amount: 500, status: 'Paid', schoolAccount: '12345' },
  { id: 8, date: '2024-02-10', description: 'Extracurricular Activities', amount: 120, status: 'Paid', schoolAccount: '12345' },
  { id: 9, date: '2024-02-15', description: 'Library Fees', amount: 30, status: 'Pending', schoolAccount: '12345' },
  { id: 10, date: '2024-02-20', description: 'Technology Fee', amount: 90, status: 'Overdue', schoolAccount: '12345' },
  // Add more mock data as needed
]

const itemsPerPage = 5

export default function PaymentsPage() {
  const [selectedTerm, setSelectedTerm] = useState('1')
  const [selectedYear, setSelectedYear] = useState('2024')
  const [currentPage, setCurrentPage] = useState(1)
  const [isCreateSlipOpen, setIsCreateSlipOpen] = useState(false)
  const [payments, setPayments] = useState(paymentsData)
  const [viewSlip, setViewSlip] = useState<PaymentSlip | null>(null) // Added state for viewing payment slip

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPayments = payments.slice(startIndex, endIndex)

  const totalPages = Math.ceil(payments.length / itemsPerPage)

  const handleTermYearChange = (value: string, type: 'term' | 'year') => {
    if (type === 'term') {
      setSelectedTerm(value)
    } else {
      setSelectedYear(value)
    }
    setCurrentPage(1)
    // In a real application, you would fetch data for the selected term and year here
  }

  const handleCreatePaymentSlip = (paymentDetails: {
    description: string
    amount: number
    dueDate: string
    schoolAccount: string // Added schoolAccount
  }) => {
    const newPayment = {
      id: payments.length + 1,
      date: paymentDetails.dueDate,
      description: paymentDetails.description,
      amount: paymentDetails.amount,
      status: 'Pending',
      schoolAccount: paymentDetails.schoolAccount // Added schoolAccount
    }
    setPayments([newPayment, ...payments])
    setCurrentPage(1)
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Payments</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="year-select">Year:</Label>
              <Select onValueChange={(value) => handleTermYearChange(value, 'year')} defaultValue={selectedYear}>
                <SelectTrigger id="year-select" className="w-[100px]">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="term-select">Term:</Label>
              <Select onValueChange={(value) => handleTermYearChange(value, 'term')} defaultValue={selectedTerm}>
                <SelectTrigger id="term-select" className="w-[100px]">
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Term 1</SelectItem>
                  <SelectItem value="2">Term 2</SelectItem>
                  <SelectItem value="3">Term 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setIsCreateSlipOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Create Payment Slip
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.description}</TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                        payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {payment.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => setViewSlip(payment)}> {/* Updated View Slip button */}
                      <FileText className="h-4 w-4 mr-2" />
                      View Slip
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    // disabled={currentPage === 1}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => setCurrentPage(index + 1)}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    // disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
      <CreatePaymentSlip
        open={isCreateSlipOpen}
        onOpenChange={setIsCreateSlipOpen}
        onCreateSlip={handleCreatePaymentSlip}
      />
      <ViewPaymentSlip 
        open={!!viewSlip} 
        onOpenChange={(open) => !open && setViewSlip(null)} 
        paymentSlip={viewSlip} 
      /> {/* Added ViewPaymentSlip component */}
    </div>
  )
}

