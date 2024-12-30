"use client";

import DateColumn from "@/components/DataTableColumns/DateColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Parent } from "@/types/types";
import { ParentInfoModal } from "@/components/dashboard/models/parent-info-modal";
import Image from "next/image";
export const columns: ColumnDef<Parent>[] = [
  {
    accessorKey: "user",
    header: "Name",
    cell: ({ row }) => {
      const parent = row.original;
      return (
        <div className="flex items-center gap-1">
          <Image src={parent.imageUrl} alt={parent.firstName} width={512} height={512} className="w-10 h-10 rounded-full"/>
          <div className="">
          <h2 className="font-medium capitalize">{parent.firstName.toLowerCase()} {parent.lastName.toLowerCase()}</h2>
          <p className="text-xs text-muted-foreground">{parent.relationship}</p>
        </div>
        </div>
      )
    }
  },
  {
    accessorKey: "email-phone",
    header: "Contact",
    cell: ({ row }) => {
      const parent = row.original;
      return (
        <div className="">
          <h2 className="font-medium">{parent.email.toLocaleLowerCase()}</h2>
          <p className="text-xs text-muted-foreground">{parent.phone}</p>
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
    cell: ({ row }) => <ParentInfoModal parent={row.original}/>,
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
