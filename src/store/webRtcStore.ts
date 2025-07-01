import { User } from "@/types";
import { create } from "zustand";

type WebRtcStore = {
  inCall: boolean;
  offerUser: User | null;
  answerUser: User | null;
  offer: RTCSessionDescriptionInit | null;
  answer: RTCSessionDescriptionInit | null;
  offerIceCandidates: Array<unknown>;
  answererIceCandidates: Array<unknown>;
  setOfferUser: (offer: User) => void;
  setAnswerUser: (answer: User) => void;
  setInCall: (toggle: boolean) => void;
  setOffer: (offer: RTCSessionDescriptionInit) => void;
  setAnswer: (answer: RTCSessionDescriptionInit) => void;
  setOfferIceCandidates: (ice: unknown) => void;
  setAnswererIceCandidates: (ice: unknown) => void;
};

export const webRtcStore = create<WebRtcStore>((set) => ({
  inCall: false,
  offerUser: null,
  answerUser: null,
  offer: null,
  answer: null,
  offerIceCandidates: [],
  answererIceCandidates: [],
  setInCall: (toggle) => set({ inCall: toggle }),
  setOfferUser: (offerUser) => set({ offerUser }),
  setAnswerUser: (answerUser) => set({ answerUser }),
  setOffer: (offer) => set({ offer: offer }),
  setAnswer: (answer) => set({ offer: answer }),
  setOfferIceCandidates: (ice) =>
    set((state) => ({
      offerIceCandidates: [...state.offerIceCandidates, ice],
    })),
  setAnswererIceCandidates: (ice) =>
    set((state) => ({
      answererIceCandidates: [...state.answererIceCandidates, ice],
    })),
}));
