import { atom } from "jotai";

export const currentListIdAtom = atom<string | null>(null);

export const userDefaultListIdAtom = atom<string | null>(null);
