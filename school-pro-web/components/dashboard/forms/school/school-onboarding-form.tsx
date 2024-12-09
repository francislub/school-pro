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
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { Send } from "lucide-react";
import { createSchool } from "@/app/actions/schools";


export type SelectOptionProps = {
  label: string;
  value: string;
};
type SingleStudentFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
};

export type SchoolProps = {
  name: string;
  logo: string
};
export default function SchoolOnboardingForm() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SchoolProps>({
    defaultValues: {
      name: "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage =  "/images/man.png";
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveStudent(data: SchoolProps) {
    try {
      setLoading(true);
      data.logo = imageUrl;
      console.log(data)
      const res = await createSchool(data);
      console.log(res)
      toast.success("Successfully Created")
      
    } catch (error) {
      setLoading(false);
    }
  }
  

  return (
    <form className="" onSubmit={handleSubmit(saveStudent)}>
      <div className="text-center">
      <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
        Welcome to schoolPro,
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-2">
         Complete your school's profile to get started with SchoolPro
      </p>
      </div>

      <div className="grid grid-cols-12 gap-6 py-6">
        <div className="lg:col-span-12 col-span-full space-y-3">
        <div className="grid gap-6">
                <div className="grid gap-3">
                
                  <TextInput
                    register={register}
                    errors={errors}
                    label="School Name"
                    name="name"
                  />
                </div>

                <div className="grid">
                <ImageInput
                  title="Customise Your School Logo"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="schoolLogo"
                  className="object-contain"
                  size="sm"
                />
                </div>
              </div>
        </div>
      </div>
       <SubmitButton 
       buttonIcon={Send}
       title="Register School"
       loading={loading}
       loadingTitle="Creating please wait ..."
       >
             
       </SubmitButton>
    </form>
  );
}
