"use client";

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
import { TeacherCreateProps } from "@/types/types";
import { createTeacher } from "@/actions/teachers";
import FormMultipleSelectInput from "@/components/FormInputs/FormMultipleSelectInput";
import { generateRollNumber } from "@/lib/generateRoll";


type TeacherFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
  classes: DataOption[];
  departments: DataOption[];
  subjects: DataOption[];
};

export type DataOption ={
  label:string,
  value:string
}
export default function TeacherForm({
  editingId,
  initialData,
  classes,
  departments,
  subjects
}: TeacherFormProps) {
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
  const [selectedContactMethod, setSelectedContactMethod ] = useState<any>(contactMethod[0]);
  // depertments
  const [selectedDepertment, setSelectedDepartment ] = useState<any>(departments[0]);

  const [mainSubject, setMainSubject ] = useState<any>([subjects[0]]);

  const [selectedSubjects, setSelectedSubjects ] = useState<any>([subjects[0]]);

  const [selectedClasses, setSelectedClasses ] = useState<any>([classes[0]]);
  

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
        value:"MALE"
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
  } = useForm<TeacherCreateProps>({
    defaultValues: {
      firstName: "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/images/man.png";
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveStudent(data: TeacherCreateProps) {
    try {
      setLoading(true);
      data.employeeId = generateRollNumber();
      data.imageUrl = imageUrl;
      data.title = selectedTitle.value;
      data.gender = selectedGender.value;
      data.contactMethod = selectedContactMethod.value;
      data.departmentId = selectedDepertment.value;
      data.departmentName = selectedDepertment.label;
      data.qualification = selectedQualification.label;
      data.mainSubject = mainSubject.label;
      data.mainSubjectId = mainSubject.value;
      data.subjects = selectedSubjects.map((item: any) => item.label);
      data.classIds = selectedClasses.map((item: any) => item.value);
      data.classes = selectedClasses.map((item: any) => item.label);
      data.experience = Number(data.experience)

      if (editingId) {
        // await updateCategoryById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
        // reset();
        // router.push("/dashboard/categories");
        // setImageUrl("/placeholder.svg");
      } else {
        const res = await createTeacher(data);
        setLoading(false);
        toast.success("Teacher Successfully Created!");
        reset();
        // setImageUrl("/placeholder.svg");
        router.push("/dashboard/users/teachers");
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
                    name="whatsappNo"
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
                    name="dateOfBirth"
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
                  <FormMultipleSelectInput
                    label="Subjects"
                    options={subjects}
                    option={selectedSubjects}
                    setOption={setSelectedSubjects}
                    href="/dashboard/academics/subjects/new"
                    toolTipText="Add New Subject"
                  />
                 
                </div>

                
                <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-3">

                  {/* multi select */}
                  <FormMultipleSelectInput
                    label="Classes"
                    options={classes}
                    option={selectedClasses}
                    setOption={setSelectedClasses}
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
