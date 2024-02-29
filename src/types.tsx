import { Timestamp } from "firebase/firestore";

export interface User {
    uid: string,
    email: string,
    displayName?: string | null,
    photoURL?: string | null,
    createdAt: string,
    bannerColor: string,
    bannerURL: string,
    aboutMe: string,
}

export interface Channel {
    type: "text" | "voice",
    name: string,
    id: string,
}

export interface Message {
    id: string,
    from: string,
    createdAt: Timestamp,
    content: string,
}