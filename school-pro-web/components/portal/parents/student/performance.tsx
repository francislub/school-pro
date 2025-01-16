import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type SelectedTerm = {
  term: string;
  year: string;
};

type SubjectScores = {
  math: number;
  science: number;
  english: number;
};

type PerformanceData = {
  [year: string]: {
    [term: string]: SubjectScores;
  };
};

type PerformanceProps = {
  selectedTerm: SelectedTerm;
};

export function Performance({ selectedTerm }: PerformanceProps) {
  // Mock data for performance with proper typing
  const performanceData: PerformanceData = {
    "2023": {
      "1": { math: 85, science: 92, english: 78 },
      "2": { math: 88, science: 90, english: 82 },
      "3": { math: 90, science: 94, english: 85 },
    },
    "2022": {
      "1": { math: 80, science: 88, english: 75 },
      "2": { math: 82, science: 89, english: 79 },
      "3": { math: 85, science: 91, english: 81 },
    },
  };

  const scores: SubjectScores =
    performanceData[selectedTerm.year]?.[selectedTerm.term] || {
      math: 0,
      science: 0,
      english: 0,
    };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Academic Performance</CardTitle>
        <p className="text-sm text-gray-500">
          Term {selectedTerm.term}, {selectedTerm.year}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {["Math", "Science", "English"].map((subject) => {
          const key = subject.toLowerCase() as keyof SubjectScores;
          return (
            <div key={key}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{subject}</span>
                <span className="text-sm font-medium">{scores[key]}%</span>
              </div>
              <Progress value={scores[key]} className="h-2" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
