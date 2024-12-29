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
import { ClassCreateProps, DepartmentCreateProps, SubjectCreateProps } from "@/types/types";
import { createDepartment } from "@/actions/departments";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import { DepartmentOption } from "../../subject-listing";
import { createSubject } from "@/actions/subjects";
 
export type SubjectProps={
    name:string
}
export default function SubjectForm({
  userId,
  initialContent,
  editingId,
  departments
}: {
  userId?: string;
  initialContent?: string;
  editingId?: string;
  departments: DepartmentOption[]
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubjectCreateProps>({
    defaultValues: {
      name: initialContent || "",
    },
  });
 
  const [loading, setLoading] = useState(false);

const types =[
  {
    label:"THEORY",
    value:"THEORY"
  },
  {
    label:"PRACTICAL",
    value:"PRACTICAL"
  },
  {
    label:"BOTH",
    value:"BOTH"
  },
]
const [selectedType, setSelectedType ] = useState<any>(types[0])


  const categories =[
    {
      label:"CORE",
      value:"CORE"
    },
    {
      label:"ELECTIVE",
      value:"ELECTIVE"
    },
    {
      label:"ADDITIONAL",
      value:"ADDITIONAL"
    },
    {
      label:"VOCATIONAL",
      value:"VOCATIONAL"
    },
    {
      label:"LANGUAGE",
      value:"LANGUAGE"
    },
    {
      label:"EXTRA_CURRICULAR",
      value:"EXTRA_CURRICULAR"
    },
  ]
  const [selectedCategory, setSelectedCategory ] = useState<any>(categories[0])
  const [selectedDepartment, setSelectedDepartment ] = useState<any>(departments[0])
 
  async function saveSubject(data: SubjectCreateProps) {
    // data.userId = userId;
    data.departmentId= selectedDepartment.value
    data.departmentName= selectedDepartment.label
    data.category= selectedCategory.value
    data.type= selectedType.value

    try {
      setLoading(true);
      if (editingId) {
        // await updateFolderById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
      } else {
        const res = await createSubject(data);
        setLoading(false);
        toast.success("Subject Successfully Created!");
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
                <span className="sr-only">Add Subject</span>
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
                {editingId ? "Edit Subject" : "Add New Subject"}
              </DialogTitle>
              {/* <DialogDescription>
                Please Write your Comment here, with respect
              </DialogDescription> */}
            </DialogHeader>
            <form className="" onSubmit={handleSubmit(saveSubject)}>
              <div className="">
                <div className="space-y-3">
                  <div className="grid gap-3">
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Name"
                      name="name"
                      icon={Check}
                    />
                    {/* <IconInput
                      onIconSelect={setSelectedIcon}
                      selectedIcon={selectedIcon}
                    /> */}
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Subject Code"
                      name="code"
                      placeholder="MATH101"
                    />
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Short Name"
                      name="shortName"
                      placeholder="Math"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <FormSelectInput
                        label="Category"
                        options={categories}
                        option={selectedCategory}
                        setOption={setSelectedCategory}
                      />
                      <FormSelectInput
                        label="Type"
                        options={types}
                        option={selectedType}
                        setOption={setSelectedType}
                      />
                  </div>

                  <div className="grid gap-3">
                    <FormSelectInput
                        label="Subject"
                        options={departments}
                        option={selectedDepartment}
                        setOption={setSelectedDepartment}
                        toolTipText="Add Department"
                        href="/dashboard/academics/departments"
                      />
                      {/* <FormSelectInput
                        label="Type"
                        options={types}
                        option={selectedType}
                        setOption={setSelectedType}
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