export type SingleMessage = {
  id: string;
  name: string;
  message: string;
};

type Chat = {
  [key: string]: SingleMessage[];
};

export type User = {
  id: string;
  name: string;
  socketId: string;
  conversition: Chat;
};
