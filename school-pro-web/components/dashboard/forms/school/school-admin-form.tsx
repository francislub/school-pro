"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "@/components/FormInputs/TextInput";
import toast from "react-hot-toast";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { Lock, Mail, Phone, Send, User } from "lucide-react";
import { UserCreateProps } from "@/types/types";
import PasswordInput from "@/components/FormInputs/PasswordInput";


export type SelectOptionProps = {
  label: string;
  value: string;
};

export type SchoolProps = {
  name: string;
  logo: string
};
export default function SchoolAdminForm({schoolId, schoolName}: {schoolId: string, schoolName: string}) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserCreateProps>({
    defaultValues: {
      name: "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage =  "/images/man.png";
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveStudent(data: UserCreateProps) {
    try {
      setLoading(true);
      data.schoolId = schoolId;
      data.schoolName = schoolName;
      data.role = "ADMIN";
      console.log(data)
      // const res = await createSchool(data);
      // console.log(res)

      setLoading(false);
      toast.success("Successfully Created")
      reset();
      // router.push(`/school-admin/${res.id}?name=${res.name}`);
      
    } catch (error) {
      setLoading(false);
    }
  }
  

  return (
    <form className="" onSubmit={handleSubmit(saveStudent)}>
      <div className="text-center">
      <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
        Welcome to {schoolName},
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-2">
         Create the Admin for this School
      </p>
      </div>

      <div className="grid grid-cols-12 gap-6 py-6">
        <div className="lg:col-span-12 col-span-full space-y-3">
        <div className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-3">
                
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Admin Name"
                    name="name"
                    icon={User}
                  />

                 <TextInput
                    register={register}
                    errors={errors}
                    label="Admin Email"
                    name="email"
                    icon={Mail}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Admin Phone"
                    name="phone"
                    icon={Phone}
                  />

                 <PasswordInput
                    register={register}
                    errors={errors}
                    label="Admin Password"
                    name="password"
                    icon={Lock}
                  />
                </div>
              </div>
        </div>
      </div>
       <SubmitButton 
       buttonIcon={Send}
       title="Create School Admin"
       loading={loading}
       loadingTitle="Creating please wait ..."
       >
             
       </SubmitButton>
    </form>
  );
}
