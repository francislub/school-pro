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
import { createClass } from "@/actions/classes";
import toast from "react-hot-toast";
import { ClassCreateProps } from "@/types/types";
 
export type ClassProps={
    title:string
}
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
      title: initialContent || "",
    },
  });
 
  const [loading, setLoading] = useState(false);
 
  async function saveClass(data: ClassCreateProps) {
    // data.userId = userId;
    try {
      setLoading(true);
      if (editingId) {
        // await updateFolderById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
      } else {
        const res = await createClass(data);
        setLoading(false);
        toast.success("Class Successfully Created!");
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
                <Button variant="ghost" size="icon" className="h-8 w-8">
                <Plus className="h-4 w-4"/>
                <span className="sr-only">Add Class</span>
                </Button>
                // <Tooltip>
                //     <TooltipTrigger asChild>
                     
                //     </TooltipTrigger>
                //     <TooltipContent>
                //         <p>Add Class</p>
                //     </TooltipContent>
                // </Tooltip>
            )}
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Class" : "Add New Class"}
              </DialogTitle>
              {/* <DialogDescription>
                Please Write your Comment here, with respect
              </DialogDescription> */}
            </DialogHeader>
            <form className="" onSubmit={handleSubmit(saveClass)}>
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
                    {/* <IconInput
                      onIconSelect={setSelectedIcon}
                      selectedIcon={selectedIcon}
                    /> */}
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