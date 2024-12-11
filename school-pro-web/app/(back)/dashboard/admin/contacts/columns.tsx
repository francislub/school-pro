"use client";

import DateColumn from "@/components/DataTableColumns/DateColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Contact } from "@/types/types";
import ContactInfoModal from "@/components/DataTableColumns/ContactCard";
export const columns: ColumnDef<Contact>[] = [
  
  {
    accessorKey: "fullname",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone No",
  },
  {
    accessorKey: "school",
    header: "School Name",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "view",
    header: "View",
    cell: ({ row }) => <ContactInfoModal contact={row.original}/>,
  },

  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const contact = row.original;
      return (
        <ActionColumn
          row={row}
          model="contact"
          editEndpoint={'#'}
          id={contact.id}
        />
      );
    },
  },
];
