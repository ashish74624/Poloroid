export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
    place: string;
    friends: Friend[];
    notifications: any[];
    request: Request[];
    rejectedBy: RejectedBy[];
    __v: number;
}

interface Friend {
    id: string;
    _id: string;
}

interface Request {
    sentTo: { id: string };
    _id: string;
}

interface RejectedBy {
    id: string;
    _id: string;
}
