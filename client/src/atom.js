import { atom } from "jotai";

export const tokenAtom = atom("");

export const userAtom = atom({
  role: "guest",
});

export const isLoggedAtom = atom((get) => get(userAtom.id) !== "");

export const roleAtom = atom((get) => get(userAtom.role));
