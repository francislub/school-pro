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
import { Class, Parent } from "@/types/types";
import { createStudents } from "@/actions/students";
import RadioInput from "@/components/FormInputs/RadioInput";
import { generateRegistrationNumber } from "@/lib/generateRegNo";
import { generateRollNumber } from "@/lib/generateRoll";
import useSchoolStore from "@/store/school";


export type SelectOptionProps = {
  label: string;
  value: string;
};
type SingleStudentFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
  classes: Class[]
  parents: Parent[]
  nextSeq:number
};

export type StudentProps = {
  name:string;
  firstName:string;
  lastName:string;
  email:string;
  parentId:string;
  studentType:string;
  parentName?:string;
  classId:string;
  classTitle?:string;
  streamId:string;
  streamTitle?:string;
  password:string;
  imageUrl:string;
  phone:string;
  state:string;
  BCN:string;
  religion:string;
  gender:string;
  nationality:string;
  dob:string;
  rollNo:string;
  regNo:string;
  admissionDate:string;
  address:string;
  schoolId:string;
  schoolName:string;

}
export default function SingleStudentForm({
  editingId,
  initialData,
  classes,
  parents,
  nextSeq,
}: SingleStudentFormProps) {

  //parents
  const parentOptions = parents.map((parent)=>{
    return {
      label:`${parent.firstName} ${parent.lastName}`,
      value:parent.id
    }
  });
  const [selectedParent, setSelectedParent ] = useState<any>(null)
  //classes
  const classOptions =classes.map((item)=>{
    return {
      label:item.title,
      value:item.id
    }
  });
  const [selectedClass, setSelectedClass ] = useState<any>(classOptions[0])
  const classId = selectedClass.value??""
  const streams = classes.find((item)=>item.id===classId)?.streams||[]

    //sections/streams
    const streamsOptions =streams.map((item)=>{
      return {
        label:item.title,
        value:item.id 
      }
    })
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
    const [selectedGender, setSelectedGender ] = useState<any>(genders[0])

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
    const [selectedReligion, setSelectedReligion ] = useState<any>(religions[0])

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
  const studentTypes =[
    {
      label:"Private Student",
      id:"PS"
    },
    {
      label:"Sponsored Student",
      id:"SS"
    },
  ];
  const {school}= useSchoolStore()

  async function saveStudent(data: StudentProps) {
    try {
      setLoading(true);
      data.schoolId=school?.id??"";
      data.schoolName=school?.name??"";
      data.imageUrl = imageUrl;
      data.name = `${data.firstName} ${data.lastName}`;
      data.parentId = selectedParent.value;
      data.parentName = selectedParent.label;
      data.classId = selectedClass.value;
      data.classTitle = selectedClass.label;
      data.streamId = selectedStream.value;
      data.streamTitle = selectedStream.label;
      data.gender = selectedGender.value;
      data.religion = selectedReligion.value;
      
      if (editingId) {
        // await updateCategoryById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
        // reset();
        // router.push("/dashboard/categories");
        // setImageUrl("/placeholder.svg");
      } else {
        const rollNo = generateRollNumber()
        const studentType = data.studentType as "PS"| "SS"
        const regNo = generateRegistrationNumber("BU",studentType, nextSeq);
        data.regNo = regNo
        data.rollNo = rollNo
        console.log(data)
        const res = await createStudents(data);
        setLoading(false);
        toast.success("Student Successfully Created!");
        reset();
        // setImageUrl("/placeholder.svg");
        router.push("/dashboard/students");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveStudent)}>
      <FormHeader
        href="/students"
        parent=""
        title="Students"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">

        <div className="lg:col-span-12 col-span-full space-y-3">
        <div className="grid gap-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Student First Name"
                    name="firstName"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Student Last Name"
                    name="lastName"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Email"
                    name="email"
                    type="email"
                  />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <FormSelectInput
                    label="Parent"
                    options={parentOptions}
                    option={selectedParent}
                    setOption={setSelectedParent}
                    toolTipText="Add New Parent"
                    href="/dashboard/users/parents/new"
                  />
                                    <FormSelectInput
                    label="Class"
                    options={classOptions}
                    option={selectedClass}
                    setOption={setSelectedClass}
                    toolTipText="Add New Class"
                    href="/dashboard/academics/classes"
                  />
                  <FormSelectInput
                    label="Stream/Section"
                    options={streamsOptions}
                    option={selectedStream}
                    setOption={setSelectedStream}
                    toolTipText="Add New Stream"
                    href="/dashboard/academics/classes"
                  />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
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
                  <PasswordInput
                    register={register}
                    errors={errors}
                    label="Student Password"
                    name="password"
                    type="password"
                    toolTipText="Password will be used by student on the student Portal"
                  />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TextInput
                    register={register}
                    errors={errors}
                    label="State/Village"
                    name="state"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Birth Certificate No"
                    name="BCN"
                  />
                  <FormSelectInput
                    label="Religion"
                    options={religions}
                    option={selectedReligion}
                    setOption={setSelectedReligion}
                  />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <FormSelectInput
                    label="Gender"
                    options={genders}
                    option={selectedGender}
                    setOption={setSelectedGender}
                    isSearchable = {false}
                  />
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
                    label="Admission Date"
                    name="admissionDate"
                    type="date"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                <div className="">
                <div className="grid gap-3">
                  
                  {/* <TextInput
                    register={register}
                    errors={errors}
                    label="Registration No"
                    name="regNo"
                  /> */}

                  <RadioInput 
                   radioOptions={studentTypes}
                   register={register}
                   label="Student Type"
                   name="studentType"
                   errors={errors}
                   defauitValue="PS"
                  />
                  {/* <TextInput
                    register={register}
                    errors={errors}
                    label="Admission Date"
                    name="admissionDate"
                    type="date"
                  /> */}
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
                  title="Student Profile Image"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="studentProfileImage"
                  className="object-contain"
                />
                </div>
                </div>
              </div>
        </div>
        {/* <div className="lg:col-span-4 col-span-full ">
          <div className="grid auto-rows-max items-start gap-4 ">
            <ImageInput
              title="Category Image"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="categoryImage"
            />
          </div>
        </div> */}
      </div>
      <FormFooter
        href="/students"
        editingId={editingId}
        loading={loading}
        title="students"
        parent=""
      />
    </form>
  );
}
