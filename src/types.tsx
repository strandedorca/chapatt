export interface User {
    id: string,
    name: string,
    avatarUrl: string | null,
}

export interface Channel {
    type: "text" | "voice",
    name: string,
    id: string,
}