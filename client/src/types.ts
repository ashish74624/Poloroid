export interface User {
    id: number;
    firstName: string,
    lastName: string,
    email: string;
    profileImage: string;
}

export interface Post {
    id: number;
    userId: number,
    email: string,
    firstName: string,
    lastName: string,
    profileImage: string,
    caption: string,
    image: string,
    likesCount: string,
    createdAt: string
}

export interface Suggestions {
    suggestions: User[]
}