"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Pencil, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import toast from "react-hot-toast";
import { DepartmentCreateProps, PeriodCreateProps } from "@/types/types";
import { createDepartment } from "@/actions/departments";
import useSchoolStore from "@/store/school";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { createPeriod } from "@/actions/periods";
import { convertDateToIso } from "@/lib/convertDateToIso";
 
export type DepartmentProps={
    name:string
}
export default function PeriodForm({
  initialContent,
  editingId,
}: {
  // userId?: string;
  initialContent?: string;
  editingId?: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PeriodCreateProps>({
    defaultValues: {
      year: new Date().getFullYear(),
    },
  });
 
  const [loading, setLoading] = useState(false);

  const {school} = useSchoolStore(); 
  const [isActive, setIsActive] = useState<boolean>(false)
 
  async function savePeriod(data: PeriodCreateProps) {
    // data.userId = userId;
    data.schoolId = school?.id ?? "";
    data.year = Number(data.year)
    data.term = Number(data.term)
    data.startDate = convertDateToIso(data.startDate)
    data.endDate = convertDateToIso(data.endDate)
    try {
      setLoading(true);
      if (editingId) {
        // await updateFolderById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
      } else {
        const res = await createPeriod(data);
        setLoading(false);
        toast.success("Period Successfully Created!");
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
                <span className="sr-only">Add Term And Year</span>
                </Button>
            )}
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Term And Year" : "Add New Term And Year"}
              </DialogTitle>
            </DialogHeader>

            <form className="" onSubmit={handleSubmit(savePeriod)}>
              <div className="">
                <div className="space-y-3">
                  <div className="grid lg:grid-cols-2 gap-3">
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Year"
                      name="year"
                      type="number"
                    />
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Term"
                      name="term"
                      type="number"
                      min={1}
                      max={3}
                    />
                  </div>
                  <div className="grid lg:grid-cols-2 gap-3">
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Start Date"
                      name="startDate"
                      type="date"
                    />
                    <TextInput
                      register={register}
                      errors={errors}
                      label="End Date"
                      name="endDate"
                      type="date"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={isActive}
                      onCheckedChange={setIsActive}
                    />
                    <Label htmlFor="isActive">Set as active period</Label>
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