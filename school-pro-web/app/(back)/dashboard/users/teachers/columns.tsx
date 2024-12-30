"use client";

import DateColumn from "@/components/DataTableColumns/DateColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Teacher } from "@/types/types";
import { ParentInfoModal } from "@/components/dashboard/models/parent-info-modal";
import Image from "next/image";
import { TeacherInfoModal } from "@/components/dashboard/models/teacher-info-modal";
export const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: "user",
    header: "Name",
    cell: ({ row }) => {
      const teacher = row.original;
      return (
        <div className="flex items-center gap-1">
          <Image src={teacher.imageUrl} alt={teacher.firstName} width={512} height={512} className="w-10 h-10 rounded-full"/>
          <div className="">
          <h2 className="font-medium capitalize">{teacher.firstName.toLowerCase()} {teacher.lastName.toLowerCase()}</h2>
          <p className="text-xs text-muted-foreground">{teacher.employeeId}</p>
        </div>
        </div>
      )
    }
  },
  {
    accessorKey: "email-phone",
    header: "Contact",
    cell: ({ row }) => {
      const teacher = row.original;
      return (
        <div className="">
          <h2 className="font-medium">{teacher.email.toLocaleLowerCase()}</h2>
          <p className="text-xs text-muted-foreground">{teacher.phone}</p>
        </div>
      )
    }
  },
  
  {
    accessorKey: "nationality",
    header: "Country",
  },
  {
    accessorKey: "view",
    header: "View",
    cell: ({ row }) => <TeacherInfoModal teacher={row.original}/>,
  },

  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const teacher = row.original;
      return (
        <ActionColumn
          row={row}
          model="teacher"
          editEndpoint={'#'}
          id={teacher.id}
        />
      );
    },
  },
];
