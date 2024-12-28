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
import { createParents } from "@/actions/parents";


export type SelectOptionProps = {
  label: string;
  value: string;
};
type SingleStudentFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
};

export type ParentProps = {
  title:string;
  firstName:string,
  lastName:string,
  relationship:string,
  email:string,
  NIN:string,
  gender:string,
  dob:string,
  phone:string,
  nationality:string,
  whatsapNo:string,
  contactMethod:string,
  occupation:string,
  address:string,
  password:string,
  imageUrl:string,
}
export default function TeacherForm({
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
  const [selectedTitle, setSelectedTitle ] = useState<any>(titles[0])

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
  const [selectedContactMethod, setSelectedContactMethod ] = useState<any>(contactMethod[0])
  // depertments
  const departments =[
    {
      label:"Science",
      value:"1234"
    },
    {
      label:"Chemistry",
      value:"1423"
    },
  ]
  const [selectedDepertment, setSelectedDepartment ] = useState<any>(departments[0])

  const subjects =[
    {
      label:"Science",
      value:"1234"
    },
    {
      label:"Chemistry",
      value:"1423"
    },
  ]
  const [selectedSubject, setSelectedSubject ] = useState<any>(subjects[0])

  const classes =[
    {
      label:"S.1",
      value:"12"
    },
    {
      label:"S.2",
      value:"1423"
    },
  ]
  const [selectedClass, setSelectedClass ] = useState<any>(classes[0])

  const mainSubjects =[
    {
      label:"Science",
      value:"1234"
    },
    {
      label:"Chemistry",
      value:"1423"
    },
  ]
  const [selectedMainSubject, setSelectedMainSubject ] = useState<any>(mainSubjects[0])

  const qualifications =[
    {
      label:"Bachelors",
      value:"Bachelors"
    },
    {
      label:"Diploma",
      value:"Diploma"
    },
    {
      label:"Certificate",
      value:"Certificate"
    },
  ]
  const [selectedQualification, setSelectedQualification ] = useState<any>(qualifications[0])

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
    const [selectedGender, setSelectedGender ] = useState<any>(genders[0])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ParentProps>({
    defaultValues: {
      firstName: "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/images/man.png";
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveStudent(data: ParentProps) {
    try {
      setLoading(true);
      data.imageUrl = imageUrl;
      data.title = selectedTitle.value;
      data.relationship = selectedRelationship.value;
      data.gender = selectedGender.value;
      data.contactMethod = selectedContactMethod.value;

      if (editingId) {
        // await updateCategoryById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
        // reset();
        // router.push("/dashboard/categories");
        // setImageUrl("/placeholder.svg");
      } else {
        const res = await createParents(data);
        setLoading(false);
        toast.success("Successfully Created!");
        reset();
        // setImageUrl("/placeholder.svg");
        router.push("/dashboard/users/parents");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  

  return (
    <form className="" onSubmit={handleSubmit(saveStudent)}>
      <FormHeader
        href="/teachers"
        parent="users"
        title="Teacher"
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
                <TextInput
                    register={register}
                    errors={errors}
                    label="Phone Number"
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
                    type="tel"
                    label="Whatsap No"
                    name="whatsapNo"
                  />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TextInput
                    register={register}
                    errors={errors}
                    label="Nationality"
                    name="nationality"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="National ID /Passport No"
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
                  <FormSelectInput
                    label="Preferred Contact Method"
                    options={contactMethod}
                    option={selectedContactMethod}
                    setOption={setSelectedContactMethod}
                  />

                  <PasswordInput
                    register={register}
                    errors={errors}
                    label="Teacher Portal Password"
                    name="password"
                    type="Password"
                  />
                 
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TextInput
                    register={register}
                    errors={errors}
                    label="Date Of Joining"
                    name="dateOfJoining"
                    type="date"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Designation"
                    name="designation"
                    placeholder="eg Head of Department"
                  />

                  <FormSelectInput
                    label="Department"
                    options={departments}
                    option={selectedDepertment}
                    setOption={setSelectedDepartment}
                    href="/dashboard/academics/departments/new"
                    toolTipText="Create New Department"
                  />
                 
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <FormSelectInput
                    label="Qualification"
                    options={qualifications}
                    option={selectedQualification}
                    setOption={setSelectedQualification}
                  />

                  <FormSelectInput
                    label="Main Subject"
                    options={mainSubjects}
                    option={selectedMainSubject}
                    setOption={setSelectedMainSubject}
                    href="/dashboard/academics/subjects/new"
                    toolTipText="Add New Subject"
                  />
                  {/* multi select */}
                  <FormSelectInput
                    label="Subjects"
                    options={subjects}
                    option={selectedSubject}
                    setOption={setSelectedSubject}
                    href="/dashboard/academics/subjects/new"
                    toolTipText="Add New Subject"
                  />
                 
                </div>

                
                <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-3">

                  {/* multi select */}
                  <FormSelectInput
                    label="Classes"
                    options={classes}
                    option={selectedClass}
                    setOption={setSelectedClass}
                    href="/dashboard/academics/classes"
                    toolTipText="Add New Class"
                  />

                <div className="grid gap-3">
                  
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Experience"
                    name="experience"
                    placeholder="eg 5"
                    type="number"
                  />
                </div>

                <div className="grid gap-3">
                  <TextArea
                    register={register}
                    errors={errors}
                    label="Address"
                    name="address"
                  />
                </div>
                </div>
                <div className="grid">
                <ImageInput
                  title="Teacher Profile Image"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="teacherProfileImage"
                  className="object-contain"
                />
                </div>
                </div>
              </div>
        </div>
      </div>
      <FormFooter
        href="/teachers"
        editingId={editingId}
        loading={loading}
        title="Teacher"
        parent="users"
      />
    </form>
  );
}
