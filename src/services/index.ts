import { api } from "@/lib/axios";
import { Message, User } from "@/types";

export const getActiveUsers = async () => {
  try {
    const activeUsers = await api.get<User[]>("/users/active-users");
    if (activeUsers.data.length > 0) {
      return activeUsers.data;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getMessages = async (senderId: string, recieverId: string) => {
  try {
    const messages = await api.get<Message[]>(
      `/messages/${senderId}/${recieverId}`
    );
    if (messages.data.length > 0) {
      return messages.data.map((item) => {
        return {
          ...item,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      });
    }
    return [];
  } catch {
    return [];
  }
};
