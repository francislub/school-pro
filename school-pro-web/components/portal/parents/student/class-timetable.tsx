import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock } from "lucide-react";

type ClassTimetableProps = {
  selectedTerm: { term: string; year: string };
};

type TimetableRow = {
  time: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
};

export function ClassTimetable({ selectedTerm }: ClassTimetableProps) {
  // This is where you'd fetch data based on the selected term
  const timetableData: TimetableRow[] =
    {
      "2023": {
        "1": [
          {
            time: "08:00 - 09:00",
            monday: "Math",
            tuesday: "English",
            wednesday: "Science",
            thursday: "History",
            friday: "P.E.",
          },
          {
            time: "09:15 - 10:15",
            monday: "English",
            tuesday: "Science",
            wednesday: "Math",
            thursday: "Art",
            friday: "Geography",
          },
        ],
        "2": [
          {
            time: "08:00 - 09:00",
            monday: "Science",
            tuesday: "Math",
            wednesday: "English",
            thursday: "P.E.",
            friday: "History",
          },
        ],
      },
    }[selectedTerm.year]?.[selectedTerm.term] || [];

  return (
    <Card className="bg-white shadow-lg col-span-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Class Timetable</CardTitle>
        <Clock className="h-6 w-6 text-blue-600" />
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-gray-500">
          Term {selectedTerm.term}, {selectedTerm.year}
        </p>
        <div className="overflow-x-auto">
          {timetableData.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Time</TableHead>
                  <TableHead>Monday</TableHead>
                  <TableHead>Tuesday</TableHead>
                  <TableHead>Wednesday</TableHead>
                  <TableHead>Thursday</TableHead>
                  <TableHead>Friday</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timetableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{row.time}</TableCell>
                    <TableCell>{row.monday}</TableCell>
                    <TableCell>{row.tuesday}</TableCell>
                    <TableCell>{row.wednesday}</TableCell>
                    <TableCell>{row.thursday}</TableCell>
                    <TableCell>{row.friday}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500">No timetable available for the selected term.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
