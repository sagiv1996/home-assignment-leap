declare global {
  type ResponseAllUsersInterFace = {
    page: number;
    perPage: number;
    totalUsers: number;
    totalPages: number;
    data: UserInterface[];
  };
  type UserInterface = {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

export {};
