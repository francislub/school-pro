import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText } from 'lucide-react'

type ReportCardProps = {
  selectedTerm: { term: string; year: string }
}

export function ReportCard({ selectedTerm }: ReportCardProps) {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Report Card</CardTitle>
        <FileText className="h-6 w-6 text-blue-600" />
      </CardHeader>
      <CardContent>
        <p className="mb-4">View and download your child's report card for Term {selectedTerm.term}, {selectedTerm.year}.</p>
        <Button className="w-full">
          Download Report Card
        </Button>
      </CardContent>
    </Card>
  )
}


