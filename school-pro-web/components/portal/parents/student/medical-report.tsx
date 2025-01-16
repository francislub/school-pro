import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Activity, Droplet } from "lucide-react";

type MedicalReportProps = {
  selectedTerm: { term: string; year: string };
};

type MedicalData = {
  height: number;
  weight: number;
  bloodPressure: string;
  bloodType: string;
  allergies: string[];
};

type MedicalDataRecord = {
  [year: string]: {
    [term: string]: MedicalData;
  };
};

export function MedicalReport({ selectedTerm }: MedicalReportProps) {
  // Mock data structure for medical records
  const medicalDataRecord: MedicalDataRecord = {
    "2023": {
      "1": { height: 165, weight: 60, bloodPressure: "110/70", bloodType: "A+", allergies: ["Peanuts"] },
      "2": { height: 167, weight: 62, bloodPressure: "112/72", bloodType: "A+", allergies: ["Peanuts"] },
      "3": { height: 168, weight: 63, bloodPressure: "114/74", bloodType: "A+", allergies: ["Peanuts"] },
    },
    "2022": {
      "1": { height: 160, weight: 55, bloodPressure: "108/68", bloodType: "A+", allergies: ["Peanuts"] },
      "2": { height: 162, weight: 57, bloodPressure: "110/70", bloodType: "A+", allergies: ["Peanuts"] },
      "3": { height: 164, weight: 59, bloodPressure: "110/70", bloodType: "A+", allergies: ["Peanuts"] },
    },
  };

  // Fetch medical data based on the selected term
  const medicalData: MedicalData =
    medicalDataRecord[selectedTerm.year]?.[selectedTerm.term] || {
      height: 0,
      weight: 0,
      bloodPressure: "N/A",
      bloodType: "N/A",
      allergies: [],
    };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Medical Report</CardTitle>
        <Heart className="h-6 w-6 text-red-500" />
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-gray-500">
          Term {selectedTerm.term}, {selectedTerm.year}
        </p>
        <div className="space-y-4">
          <div className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-500" />
            <span className="font-medium">Height:</span>
            <span className="ml-2">{medicalData.height} cm</span>
          </div>
          <div className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-500" />
            <span className="font-medium">Weight:</span>
            <span className="ml-2">{medicalData.weight} kg</span>
          </div>
          <div className="flex items-center">
            <Heart className="h-5 w-5 mr-2 text-red-500" />
            <span className="font-medium">Blood Pressure:</span>
            <span className="ml-2">{medicalData.bloodPressure}</span>
          </div>
          <div className="flex items-center">
            <Droplet className="h-5 w-5 mr-2 text-red-500" />
            <span className="font-medium">Blood Type:</span>
            <span className="ml-2">{medicalData.bloodType}</span>
          </div>
          <div>
            <span className="font-medium">Allergies:</span>
            <ul className="list-disc list-inside mt-2">
              {medicalData.allergies.map((allergy, index) => (
                <li key={index}>{allergy}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
