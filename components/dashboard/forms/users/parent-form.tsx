"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormHeader from "../FormHeader";
import FormFooter from "../FormFooter";
import ImageInput from "@/components/FormInputs/ImageInput";
import TextInput from "@/components/FormInputs/TextInput";
import TextArea from "@/components/FormInputs/TextAreaInput";
import toast from "react-hot-toast";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import CountryDropdown from "@/components/FormInputs/country";


export type SelectOptionProps = {
  label: string;
  value: string;
};
type SingleStudentFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
};

export type StudentProps = {
  name:string;
  email:string,
  password:string,
  imageUrl:string,
}
export default function ParentForm({
  editingId,
  initialData,
}: SingleStudentFormProps) {

  //relationship
  const relationships =[
    {
      label:"Mother",
      value:"Mother"
    },
    {
      label:"Father",
      value:"Father"
    },
    {
      label:"Guardian",
      value:"Guardian"
    },
    {
      label:"Other",
      value:"Other"
    },
  ]
  const [selectedRelationship, setSelectedRelationship ] = useState<any>(relationships[1])
  //titles
  const titles =[
    {
      label:"Mr.",
      value:"Mr."
    },
    {
      label:"Mrs.",
      value:"Mrs."
    },
    {
      label:"Ms.",
      value:"Ms."
    },
    {
      label:"Dr.",
      value:"Dr."
    },
  ]
  const [selectedTitle, setSelectedTitle ] = useState<any>(null)

  //contact
  const contactMethod =[
    {
      label:"Phone",
      value:"Phone"
    },
    {
      label:"Email",
      value:"Email"
    },
    {
      label:"Whatsap",
      value:"whatsap"
    },
  ]
  const [selectedContactMethod, setSelectedContactMethod ] = useState<any>(null)

    //sections/streams
    const streams =[
      {
        label:"S.1A",
        value:"123456"
      },
      {
        label:"S.1B",
        value:"1234445"
      },
      {
        label:"S.2A",
        value:"1234445"
      },
      {
        label:"S.2B",
        value:"1234445"
      },
    
    ]
    const [selectedStream, setSelectedStream ] = useState<any>(null)

    //Gender
    const genders =[
      {
        label:"MALE",
        value:"Male"
      },
      {
        label:"FEMALE",
        value:"FEMALE"
      },
    
    ]
    const [selectedGender, setSelectedGender ] = useState<any>(null)

    //Religion
    const religions =[
      {
        label:"Roman Catholic",
        value:"Catholic"
      },
      {
        label:"Anglican",
        value:"Anglican"
      },
      {
        label:"Islam",
        value:"Islam"
      },
    
    ]
    const [selectedReligion, setSelectedReligion ] = useState<any>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentProps>({
    defaultValues: {
      name: "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/images/man.png";
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveStudent(data: StudentProps) {
    try {
      setLoading(true);
      data.imageUrl = imageUrl;

      if (editingId) {
        // await updateCategoryById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
        // reset();
        // router.push("/dashboard/categories");
        // setImageUrl("/placeholder.svg");
      } else {
        // await createCategory(data);
        // setLoading(false);
        // toast.success("Successfully Created!");
        // reset();
        // setImageUrl("/placeholder.svg");
        // router.push("/dashboard/categories");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  
  console.log(status);

  return (
    <form className="" onSubmit={handleSubmit(saveStudent)}>
      <FormHeader
        href="/parents"
        parent="users"
        title="Parent"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-3">
        <div className="grid gap-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <FormSelectInput
                    label="Title"
                    options={titles}
                    option={selectedTitle}
                    setOption={setSelectedTitle}
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="First Name"
                    name="firstName"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Last Name"
                    name="lastName"
                  />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <FormSelectInput
                    label="Relationship with the Student"
                    options={relationships}
                    option={selectedRelationship}
                    setOption={setSelectedRelationship}
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="National ID /Passport"
                    name="NIN"
                  />
                  <FormSelectInput
                    label="Gender"
                    options={genders}
                    option={selectedGender}
                    setOption={setSelectedGender}
                    isSearchable = {false}
                  />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TextInput
                    register={register}
                    errors={errors}
                    label="Date Of Birth"
                    name="dob"
                    type="date"
                  />
                <TextInput
                    register={register}
                    errors={errors}
                    label="Phone"
                    name="phone"
                    type="tel"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Nationality"
                    name="nationality"
                  />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TextInput
                    register={register}
                    errors={errors}
                    label="Phone No"
                    name="phone"
                    type="tel"
                  />
                <TextInput
                    register={register}
                    errors={errors}
                    label="Email"
                    name="email"
                    type="email"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Whatsap No"
                    name="whatsapNo"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-3">
                <div className="grid gap-3">
                  
                <FormSelectInput
                    label="Preferred Contact Method"
                    options={contactMethod}
                    option={selectedContactMethod}
                    setOption={setSelectedContactMethod}
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Occupation"
                    name="Occupation"
                  />
                </div>
                <div className="grid">
                <PasswordInput
                    register={register}
                    errors={errors}
                    label="Parent Portal Password"
                    name="Password"
                    type="Password"
                  />
                </div>

                <div className="grid gap-3">
                  <TextArea
                    register={register}
                    errors={errors}
                    label="Address"
                    name="Address"
                  />
                </div>
                </div>
                <div className="grid">
                <ImageInput
                  title="Parent Profile Image"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="parentProfileImage"
                  className="object-contain"
                />
                </div>
                </div>
              </div>
        </div>
      </div>
      <FormFooter
        href="/parents"
        editingId={editingId}
        loading={loading}
        title="Parent"
        parent="users"
      />
    </form>
  );
}
