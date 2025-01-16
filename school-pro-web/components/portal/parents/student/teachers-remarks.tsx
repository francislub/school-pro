import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

type SelectedTerm = {
  term: string;
  year: string;
};

type RemarkDetails = {
  remark: string;
  teacher: string;
};

type RemarksData = {
  [year: string]: {
    [term: string]: RemarkDetails;
  };
};

type TeacherRemarksProps = {
  selectedTerm: SelectedTerm;
};

export function TeacherRemarks({ selectedTerm }: TeacherRemarksProps) {
  // Mock data for remarks with proper typing
  const remarksData: RemarksData = {
    "2023": {
      "1": {
        remark:
          "John is a diligent student who consistently demonstrates a strong work ethic and eagerness to learn. He actively participates in class discussions and shows great potential in mathematics and science.",
        teacher: "Ms. Johnson",
      },
      "2": {
        remark:
          "John continues to excel in his studies. He has shown remarkable improvement in English and maintains his strong performance in mathematics and science. His leadership skills are also developing nicely.",
        teacher: "Mr. Davis",
      },
      "3": {
        remark:
          "John has had an outstanding year. His academic performance is exemplary across all subjects. He has also taken on more leadership roles, showcasing his ability to work well with others and lead by example.",
        teacher: "Mrs. Thompson",
      },
    },
    "2022": {
      "1": {
        remark:
          "John is adapting well to the new academic year. He shows promise in mathematics and science, though there's room for improvement in English. He's a respectful and attentive student.",
        teacher: "Mr. Wilson",
      },
      "2": {
        remark:
          "John has made significant progress this term, especially in English. He continues to excel in mathematics and science. His participation in class discussions has also increased.",
        teacher: "Ms. Anderson",
      },
      "3": {
        remark:
          "John has finished the year strong. His academic performance has been consistent across all subjects. He's also shown great enthusiasm in extracurricular activities, particularly in the science club.",
        teacher: "Mr. Brown",
      },
    },
  };

  // Fallback data in case the term/year combination doesn't exist
  const currentRemarks: RemarkDetails =
    remarksData[selectedTerm.year]?.[selectedTerm.term] || {
      remark: "No remarks available for this term.",
      teacher: "N/A",
    };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Teacher Remarks</CardTitle>
        <Mail className="h-6 w-6 text-blue-600" />
      </CardHeader>
      <CardContent>
        <p className="mb-2 text-sm text-gray-500">
          Term {selectedTerm.term}, {selectedTerm.year}
        </p>
        <p className="mb-4">"{currentRemarks.remark}"</p>
        <p className="mb-4 text-sm text-gray-500">
          - {currentRemarks.teacher}, Homeroom Teacher
        </p>
        <Button className="w-full">Email Teacher</Button>
      </CardContent>
    </Card>
  );
}
