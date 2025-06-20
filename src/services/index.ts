import { api } from "@/lib/axios";
import { User } from "@/types";

export const getActiveUsers = async() => {
    try {
        const activeUsers = await api.get<User[]>('/users/active-users');
        if(activeUsers.data.length > 0){
            return activeUsers.data;
        }
        return []
    } catch (error) {
        console.log(error);
        return [];
    }
}