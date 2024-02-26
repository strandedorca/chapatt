export interface User {
    uid: string,
    email: string,
    displayName?: string | null,
    photoURL?: string | null,
    // password?: string | null,  // ???
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