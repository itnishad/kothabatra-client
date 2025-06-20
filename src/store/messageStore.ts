import { create } from 'zustand';

export type Message = {
  id: string;
  text: string;
  owner: 'me' | 'other';
  sender: { id: string };
  reciever?: { id: string };
  time: string;
};

type MessageStore = {
  messages: Record<string, Message[]>; // Key = user ID (or thread ID)
  setMessages: (userId: string, messages: Message[]) => void;
  addMessage: (userId: string, message: Message) => void;
  updateMessage: (userId: string, id: string, updated: Partial<Message>) => void;
  deleteMessage: (userId: string, id: string) => void;
  clearMessages: (userId?: string) => void;
};

export const useMessageStore = create<MessageStore>((set) => ({
  messages: {},

  setMessages: (userId, messages) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [userId]: messages,
      },
    })),

  addMessage: (userId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [userId]: [...(state.messages[userId] || []), message],
      },
    })),

  updateMessage: (userId, id, updated) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [userId]: (state.messages[userId] || []).map((msg) =>
          msg.id === id ? { ...msg, ...updated } : msg
        ),
      },
    })),

  deleteMessage: (userId, id) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [userId]: (state.messages[userId] || []).filter((msg) => msg.id !== id),
      },
    })),

  clearMessages: (userId) =>
    set((state) =>
      userId
        ? {
            messages: {
              ...state.messages,
              [userId]: [],
            },
          }
        : { messages: {} }
    ),
}));
