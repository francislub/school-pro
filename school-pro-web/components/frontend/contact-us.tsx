"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { Send } from "lucide-react";
import TextArea from "../FormInputs/TextAreaInput";
import PhoneInput from "../FormInputs/PhoneInput";
import FormSelectInput from "../FormInputs/FormSelectInput";
import CountryDropdown from "../FormInputs/country";

export type ContactProps = {
  fullName: string;
  email: string;
  phone: string;
  school: string;
  country: string;
  schoolPage: string;
  students: number;
  role: string;
  media: string;
  message: string;
};
const ContactUs: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactProps>();
  async function onSubmit(data: ContactProps) {
    console.log(data);
  }
  const [selectedCountry, setSelectedCountry] = useState("");

  const roles =[
    {
      label:"Principal / Leadership / Mgmt",
      value:"principal"
    },
    {
      label:"School Administrator",
      value:"Administrator"
    },
    {
      label:"Head Teacher",
      value:"HeadTeacher"
    },
    {
      label:"Teacher/Parent/Student",
      value:"teacher/parent/student"
    },
    {
      label:"Consultant/Reseller",
      value:"Consultant/reseller"
    },
    {
      label:"Other",
      value:"other"
    },
  ];
  const media =[
    {
      label:"Blog",
      value:"blog"
    },
    {
      label:"Google",
      value:"google"
    },
    {
      label:"Friend",
      value:"friend"
    },
    
    {
      label:"Other",
      value:"other"
    },
  ];
  const [selectedRole, setSelectedRole] = useState<any>(null)
  const [selectedMedia, setMedia] = useState<any>(media[0])
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-center">
          <div className="col-span-2 bg-white p-6 rounded-2xl shadow">
            <h3 className="text-2xl text-center font-semibold mb-4">Tell us about your institution and requirements</h3>
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              label="Your Full Name"
              register={register}
              name="name"
              errors={errors}
              placeholder="Eng Francis"
            />
            <div className="grid md:grid-cols-2 gap-4">
            <TextInput
              label="Email Address"
              register={register}
              name="email"
              type="email"
              errors={errors}
              placeholder="Eng. francis@gmail.com"
            />
            <PhoneInput
              label="Your Phone Number"
              register={register}
              name="phone"
              errors={errors}
              placeholder="Phone Number"
            />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
            <TextInput
              label="School Name"
              register={register}
              name="school"
              errors={errors}
              placeholder="School Name"
            />
           <div className="p-4">
              <CountryDropdown
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
              />
              {/* <p className="mt-4">Selected Country: {selectedCountry}</p> */}
            </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
            <TextInput
              label="School Website/Social Media Page(fb,linkedin)"
              register={register}
              name="schoolPage"
              errors={errors}
              placeholder="https:www.schoolwebsite"
            />
            <TextInput
              label="Number of Students"
              register={register}
              name="students"
              errors={errors}
              placeholder="300"
            />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
            <FormSelectInput
              label="Roles"
              options={roles}
              option={selectedRole}
              setOption={setSelectedRole}
            />
            <FormSelectInput
              label="How did you here about Us"
              options={media}
              option={selectedMedia}
              setOption={setMedia}
            />
            </div>
            <TextArea
              label="Please share with us the key pain points you want to solve"
              register={register}
              name="features"
              errors={errors}
            />

            <SubmitButton
            buttonIcon={Send}
              title="Submit"
              loading={isLoading}
              loadingTitle="Sending in please wait..."
            />
          </form>
          </div>
        </div>
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-800 text-white p-6 rounded-2xl">
              <h3 className="font-semibold text-xl mb-2">
                Speak to someone in sales
              </h3>
              <p className="text-sm mb-4 py-4">
                To create a more value-added solution, is essential to an
                analysis of the possibilities of improvement.
              </p>
              <button className="bg-white text-green-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition duration-300">
                Book Appointment
              </button>
            </div>
            <div className="bg-lime-400 p-6 rounded-2xl">
              <h3 className="font-semibold mb-2 text-xl">
                Contact to our team
              </h3>
              <p className="text-sm mb-4 py-4">
                To create a more value-added solution, is essential to an
                analysis of the possibilities of improvement.
              </p>
              <button className="bg-green-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition duration-300">
                Send a Mail
              </button>
            </div>
          </div>
      </div>
    </section>
  );
};

export default ContactUs;
