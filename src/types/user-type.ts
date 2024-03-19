export type UserT = {
  id?: number;
  date_joined?: string;
  username: string;
  email: string;
  profile: {
    hometown: string;
    age: number;
    gender: string;
  };
};
