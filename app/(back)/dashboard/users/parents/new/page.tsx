import { Card, CardContent } from "@/components/ui/card";
import ParentForm from "@/components/dashboard/forms/users/parent-form";

export default function ParentsTabs() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <Card className="border-t-4 border-blue-500 shadow">
          <CardContent className="p-6">
              <ParentForm/>
          </CardContent>
        </Card>
    </div>
  );
}
