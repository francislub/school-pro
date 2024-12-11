"use client"; // Ensure client-side rendering
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Check, FolderPlus, Pencil, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { createClass } from "@/actions/classes";
import toast from "react-hot-toast";

// Added 'title' to ClassProps
export type ClassProps = {
  name: string;
  title: string; // <-- Added this property
};

export default function ClassForm({
  userId,
  initialContent,
  editingId,
}: {
  userId?: string;
  initialContent?: string;
  editingId?: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClassProps>({
    defaultValues: {
      name: initialContent || "",
      title: "", // <-- Initialize default value for 'title'
    },
  });

  const [loading, setLoading] = useState(false);

  async function saveClass(data: ClassProps) {
    // Add 'title' to the data object
    try {
      setLoading(true);
      if (editingId) {
        // Logic for updating an existing class
        // Example:
        // await updateClassById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
      } else {
        const res = await createClass(data); // Pass 'title' with 'name'
        setLoading(false);
        toast.success("Class Successfully Created!");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  return (
    <div>
      <div className="py-1">
        <Dialog>
          <DialogTrigger asChild>
            {editingId ? (
              <button title="Edit Folder" className="text-blue-600">
                <Pencil className="w-4 h-4" />
              </button>
            ) : (
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add Class</span>
              </Button>
            )}
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Class" : "Add New Class"}
              </DialogTitle>
            </DialogHeader>
            <form className="" onSubmit={handleSubmit(saveClass)}>
              <div className="">
                <div className="space-y-3">
                  <div className="grid gap-3">
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Class Name" // Updated label for clarity
                      name="name"
                      icon={Check}
                    />
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Class Title" // Added input for 'title'
                      name="title"
                      icon={Check}
                    />
                  </div>
                </div>
                <div className="py-3">
                  <SubmitButton
                    title={editingId ? "Update" : "Add"}
                    loading={loading}
                  />
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
