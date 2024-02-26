export interface User {
    uid: string,
    email: string,
    displayName?: string | null,
    photoUrl?: string | null,
    password?: string | null,
}

export interface Channel {
    type: "text" | "voice",
    name: string,
    id: string,
}