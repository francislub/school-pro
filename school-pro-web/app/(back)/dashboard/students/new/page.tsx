import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Users } from "lucide-react";
import SingleStudentForm from "@/components/dashboard/forms/students/student-form";
import BulkStudentForm from "@/components/dashboard/forms/students/bulk-student-form";
import InfoBanner from "@/components/info-banner";
import { getAllClasses } from "@/actions/classes";
import { getAllParents } from "@/actions/parents";
import { getAllStudentNextSequence } from "@/actions/students";
import { getServerSchool } from "@/actions/auth";

export default async function AdmissionTabs() {
  const school = await getServerSchool();
  const classes = await getAllClasses(school?.id?? "")||[]
  const parents = await getAllParents(school?.id?? "")||[]
  const nextSequence = await getAllStudentNextSequence(school?.id?? "")||0
  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <Tabs defaultValue="single" className="w-full">
        {/* Tab List */}
        <TabsList className="grid w-full grid-cols-2 mb-8">
          {/* Single Admission Tab */}
          <TabsTrigger
            value="single"
            className="flex items-center justify-center space-x-2 py-3 transition-all duration-300 ease-in-out data-[state=active]:bg-blue-500 data-[state=active]:text-white hover:bg-blue-400"
          >
            <UserPlus className="w-5 h-5" />
            <span className="font-semibold">Single Student Admission</span>
          </TabsTrigger>

          {/* Bulk Admission Tab */}
          <TabsTrigger
            value="bulk"
            className="flex items-center justify-center space-x-2 py-3 transition-all duration-300 ease-in-out data-[state=active]:bg-blue-500 data-[state=active]:text-white hover:bg-blue-400"
          >
            <Users className="w-5 h-5" />
            <span className="font-semibold">Bulk Student Admissions</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <Card className="border-t-4 border-blue-600 shadow">
          <CardContent className="p-6">
            {/* Single Admission Content */}
            <TabsContent value="single" className="mt-0">
            <InfoBanner message="Please Make sure you have already Create the Parent, Class and Stream for this Student" type="info" />
              <SingleStudentForm nextSeq = {nextSequence} parents = {parents} classes = {classes}/>
            </TabsContent>

            {/* Bulk Admission Content */}
            <TabsContent value="bulk" className="mt-0">
              <BulkStudentForm/>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
