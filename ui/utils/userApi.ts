import type { NitroFetchRequest, $Fetch } from "nitropack";

export const userAPI = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
  async getUserById(id: string): Promise<UserInterface> {
    return fetch<UserInterface>(`/user/${id}`);
  },
  async getUsers({
    page = 1,
  }: {
    page: number;
  }): Promise<ResponseAllUsersInterFace> {
    return fetch<ResponseAllUsersInterFace>(`/user?page=${page}`, {
      query: { page },
    });
  },

  async deleteUserById(id: string): Promise<void> {
    return fetch(`/user/${id}`, { method: "DELETE" });
  },

  async createUser(body: {
    firstName: string;
    lastName: String;
    email: String;
    avatar?: string;
  }): Promise<UserInterface> {
    return fetch("/user", { method: "POST", body });
  },

  async updateUserById(
    id: string,
    body: {
      firstName?: string;
      lastName?: String;
      email?: String;
      avatar?: string;
    }
  ): Promise<UserInterface> {
    return fetch(`/user/${id}`, { method: "PUT", body });
  },
});
