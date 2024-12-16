export type Contact = {
  id:   string;
  fullname: string;
  email: string;
  phone: string;
  school: string;
  country: string;
  schoolPage: string;
  students: number;
  role: string;
  media: string;
  message: string;
  created: string;
  updatedAt: string;
};

export type ClassCreateProps ={
  title: string;
  // slug: string;
};

export type StreamCreateProps ={
  title: string;
  // slug: string;
  classId: string;
}

export type Class ={
  id: string;
  title: string;
  slug: string;
  streams: Stream[];
  createdAt: string;
  updatedAt: string;
};

export type Stream ={
  id: string;
  title: string;
  slug: string;
  classId: string;
  class: Class;
  createdAt: string;
  updatedAt: string;
};
export type Parent = {
  id:string;
  title:string;
  firstName:string;
  lastName:string;
  relationship:string;
  email:string;
  NIN:string;
  gender:string;
  dob:string;
  phone:string;
  nationality:string;
  whatsapNo:string;
  contactMethod:string;
  occupation:string;
  address:string;
  password:string;
  imageUrl:string;
  createdAt: string;
  updatedAt: string;
};

export type Student = {
  id:string;
  name:string;
  firstName:string;
  lastName:string;
  email:string;
  parentId:string;
  classId:string;
  streamId:string;
  password:string,
  imageUrl:string,
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
  createdAt: string;
  updatedAt: string;

};