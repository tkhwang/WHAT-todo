import { AuthProviders } from "@whatTodo/models";
import { atom } from "jotai";

export const authIsSignedInAtom = atom(false);

export const authSignUpPlatformAtom = atom<AuthProviders | null>(null);
