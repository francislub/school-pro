import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { getAllStudents } from "@/actions/students";

export default async function page() {
  const students = (await getAllStudents()) || [];
  return (
    <div className="p-8">
      <TableHeader
        title="Students"
        linkTitle="Add Student"
        href="/dashboard/users/students/new"
        data={students}
        model="student"
      />
      <div className="py-8">
        <DataTable data={students} columns={columns} />
      </div>
    </div>
  );
}

