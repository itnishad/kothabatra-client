export * from "./authTypes";

export interface User {
  id: string;
  email: string;
  name: string;
  online: string;
}

export type Message = {
  id: string;
  text: string;
  owner: "me" | "other";
  sender: {
    id: string;
  };
  reciever?: {
    id: string;
  };
  time: string;
};
