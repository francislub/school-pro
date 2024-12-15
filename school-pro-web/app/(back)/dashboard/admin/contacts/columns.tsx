"use client";

import DateColumn from "@/components/DataTableColumns/DateColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Contact } from "@/types/types";
import ContactInfoModal from "@/components/DataTableColumns/ContactCard";
export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "user",
    header: "View",
    cell: ({ row }) => {
      const contact = row.original;
      return (
        <div className="">
          <h2 className="font-medium capitalize">{contact.fullname.toLowerCase()}</h2>
          <p className="text-xmstext-muted-foreground">{contact.school}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "email-phone",
    header: "View",
    cell: ({ row }) => {
      const contact = row.original;
      return (
        <div className="">
          <h2 className="font-medium">{contact.email.toLocaleLowerCase()}</h2>
          <p className="text-xmstext-muted-foreground">{contact.phone}</p>
        </div>
      )
    }
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
