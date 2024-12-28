import { Card, CardContent } from "@/components/ui/card";
import TeacherForm from "@/components/dashboard/forms/users/teacher-form";

export default function AdmissionTabs() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <Card className="border-t-4 border-blue-500 shadow">
          <CardContent className="p-6">
              <TeacherForm/>
          </CardContent>
        </Card>
    </div>
  );
}
