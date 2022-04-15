import { atom } from "jotai";

export const tokenAtom = atom("");

export const userAtom = atom("");

export const isLoggedAtom = atom((get) => get(userAtom.id) !== "");

export const roleAtom = atom((get) =>
  get(userAtom).role ? get(userAtom).role : "guest"
);

export const questionsAtom = atom(0);

export const quizAtom = atom("");
