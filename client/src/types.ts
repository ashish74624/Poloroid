export interface User {
    id: number;
    firstName: string,
    lastName: string,
    email: string;
    profileImage: string;
    location?: string;
    bio?: string;
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

export interface Friends {
    friends: User[]
}

export interface FriendRequests {
    message: string,
    friendRequestUsers: User[]
}

export interface LoginResponse {
    status: string,
    user: User,
    access: string;
}

export interface TokenPayload {
    email: string;
    exp: number;
}

export interface Notification {
    id: number,
    sender: string,
    type: string,
    isRead: boolean,
    createdAt: string,
    senderProfileImage: string,
    senderFirstName: string,
    senderLastName: string,
    senderFriendId: number,
    senderEmailId: string
}

export interface NavItemInterface {
    NavIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    helperText: string;
    src?: string;
    badge?: boolean;
}
