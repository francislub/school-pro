"use client";

import DateColumn from "@/components/DataTableColumns/DateColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Student } from "@/types/types";
import { ParentInfoModal } from "@/components/dashboard/models/parent-info-modal";
import Image from "next/image";
import { StudentInfoModal } from "@/components/dashboard/models/student-info-modal";
export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "student",
    header: "View",
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="flex items-center gap-1">
          <Image src={student.imageUrl} alt={student.firstName} width={512} height={512} className="w-10 h-10 rounded-full"/>
          <div className="">
          <h2 className="font-medium capitalize">{student.firstName.toLowerCase()} {student.lastName.toLowerCase()}</h2>
          <p className="text-xmstext-muted-foreground">{student.email}</p>
        </div>
        </div>
      )
    }
  },
  {
    accessorKey: "email-phone",
    header: "View",
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="">
          <h2 className="font-medium">{student.email.toLocaleLowerCase()}</h2>
          <p className="text-xmstext-muted-foreground">{student.phone}</p>
        </div>
      )
    }
  },
  
  {
    accessorKey: "nationality",
    header: "Nationality",
  },
  {
    accessorKey: "view",
    header: "View",
    cell: ({ row }) => <StudentInfoModal student={row.original}/>,
  },

  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const parent = row.original;
      return (
        <ActionColumn
          row={row}
          model="parent"
          editEndpoint={'#'}
          id={parent.id}
        />
      );
    },
  },
];
