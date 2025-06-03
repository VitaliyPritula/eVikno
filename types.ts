// types.ts
export type Instructor = {
  id: string;
  name: string;
  car: string;
  transmission: string;
  city: string;
};

export type RootStackParamList = {
  Student: undefined;
  InstructorDetails: { instructor: Instructor };
};
