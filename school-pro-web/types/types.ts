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
  schoolId: string;
  // slug: string;
};

export type DepartmentCreateProps ={
  name: string;
  // slug: string;
  schoolId: string;
};
export type SubjectCreateProps ={
  name: string;
  code: string;
  shortName: string;
  category: string;
  type: string;
  departmentId: string;
  departmentName: string;
};

export type StreamCreateProps ={
  title: string;
  // slug: string;
  classId: string;
  schoolId:string;
}

export type Class ={
  id: string;
  title: string;
  slug: string;
  streams: StreamWithCount[];
  _count:{
    students: number;
  };
  createdAt: string;
  updatedAt: string;
};

export type Department ={
  id: string;
  name: string;
  slug: string;
  hodId?: string;
  hodName?: string;
  hodStartDate?: string;
  budget?: number;
  budgetYear?: string;
  teachers: StreamWithCount[];
  subjects: StreamWithCount[];
  createdAt: string;
  updatedAt: string;
};
export interface Period {
  id: string;
  year: number;
  term: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  schoolId: string;
  
  // createdAt: string;
  // updatedAt: string;
};

export interface GroupedPeriods {
[year: string]: Period[];
}

export type DepartmentBrief ={
  id: string;
  name: string;
  
};
export type ClassBrief ={
  id: string;
  title: string;
  
};

export type SubjectBrief ={
  id: string;
  name: string;
  
};

export type StreamWithCount ={
  id: string;
  title: string;
  slug: string;
  classId: string;
  _count:{
    students: number;
  };
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
  parentName?:string;
  classTitle?:string;
  streamTitle?:string;
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

export enum SubjectCategory {
  CORE = 'CORE',
  ELECTIVE = 'ELECTIVE',
  ADDITIONAL = 'ADDITIONAL',
  VOCATIONAL = 'VOCATIONAL',
  LANGUAGE = 'LANGUAGE',
  EXTRA_CURRICULAR = 'EXTRA_CURRICULAR'
}

export enum SubjectType {
  THEORY = 'THEORY',
  PRACTICAL = 'PRACTICAL',
  BOTH = 'BOTH'
}

export interface Subject {
  id: string;
  createdAt: string;
  updatedAt: string;

  name: string;
  slug: string;
  code: string;
  shortName: string;

  category: string;
  type: string;
  passingMarks?: string;
  totalMarks?: string;
  departmentId: string;
  departmentName: string;
  department: string;

  isActive: boolean;
  isOptional: boolean;
  hasTheory: boolean;
  hasPractical: boolean;
  labRequired: boolean;
}

export type TeacherCreateProps = {
  title:string;
  employeeId:string;
  firstName:string,
  lastName:string,
  phone:string,
  email:string,
  whatsappNo:string,
  nationality:string,
  NIN:string,
  gender:string,
  dateOfBirth:string,
  contactMethod:string,
  password:string,
  dateOfJoining:string,
  designation:string,
  departmentId:string,
  departmentName:string,
  qualification:string,
  mainSubject:string,
  mainSubjectId:string,
  subjects:string[],
  classIds:string[],
  classes:string[],
  experience:number,
  address:string,
  imageUrl:string,
  schoolId:string,
  schoolName:string,
}
export type Teacher = {
  id:string;
  title:string;
  employeeId:string;
  firstName:string,
  lastName:string,
  phone:string,
  email:string,
  whatsappNo:string,
  nationality:string,
  NIN:string,
  gender:string,
  dateOfBirth:string,
  contactMethod:string,
  password:string,
  dateOfJoining:string,
  designation:string,
  departmentId:string,
  departmentName:string,
  isActive: boolean;

  qualification:string,
  mainSubject:string,
  mainSubjectId:string,
  subjects:string[],
  classIds:string[],
  classes:string[],
  experience:number,
  address:string,
  imageUrl:string,
  createdAt:string,
  updatedAt:string,
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  image?: string | null;
  phone?: string  | null;
  schoolId?: string | null;
  schoolName?: string | null;
}
export type School = {
  id: string;
  name: string;
  logo: string | null;
  slug: string;
}
export type UserCreateProps = {
  email: string;
  password: string;
  role: UserRole;
  name: string;
  phone?: string;
  image?: string;
  schoolId?: string;
  schoolName?: string;
};

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT'| 'SECRETARY';

export type PeriodCreateProps ={
  year: number;
  term: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  schoolId: string;
};
