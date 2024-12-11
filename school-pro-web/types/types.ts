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