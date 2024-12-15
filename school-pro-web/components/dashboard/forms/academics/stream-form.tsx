"use client";
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
import { ClassCreateProps, StreamCreateProps } from "@/types/types";
import { createStream } from "@/actions/classes";
import toast from "react-hot-toast";
 
export type ClassProps={
    name:string
}
export default function StreamForm({
  classId,
  initialContent,
  editingId,
}: {
  classId: string;
  initialContent?: string;
  editingId?: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StreamCreateProps>({
    defaultValues: {
      title: initialContent || "",
    },
  });
 
  const [loading, setLoading] = useState(false);
 
  async function saveStream(data: StreamCreateProps) {
    data.classId = classId;
    try {
      setLoading(true);
      if (editingId) {
        // await updateFolderById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
      } else {
        const res = await createStream(data);
        setLoading(false);
        toast.success("Successfully Created!");
        reset()
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
 
  return (
    <div>
      <div className="py-1">
      <Dialog>
          <DialogTrigger asChild>
            {editingId ? (
              <button title="Edit Folder" className="text-blue-600">
                <Pencil className="w-4 h-4 " />
              </button>
            ) : (
                  <Button variant="outline" size="sm" className="h-8">
                      <Plus className="h-4 w-4 mr-2"/>
                    Add Stream
                  </Button>
                
            )}
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Stream" : "Add New Stream"}
              </DialogTitle>
            </DialogHeader>
            <form className="" onSubmit={handleSubmit(saveStream)}>
              <div className="">
                <div className="space-y-3">
                  <div className="grid gap-3">
                    <TextInput
                      register={register}
                      errors={errors}
                      label=""
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