import React from 'react'
import RightSidebar from './RightSidebar'

interface Friend {
    id: string;
}

interface Request {
    sentTo: Friend;
    _id: string;
}

export interface UserSuggestion {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profileImage: string;
    place: string;
    friends: Friend[];
    notifications: any[]; // Assuming notifications can have any structure
    request: Request[];
    rejectedBy: Friend[];
    __v: number;
}

interface Props {
    rightSideBarData: UserSuggestion[]
}


export default function Pymk({ rightSideBarData }: Props) {
    return (
        <div className='lg:block hidden border-l border-borderColor px-4 overflow-x-hidden overflow-y-scroll w-[30%] '>
            <h3 className='w-full mb-2 mt-3  text-center'>People you may know</h3>
            {rightSideBarData.map((rightSideBarData: any) => (
                <div key={rightSideBarData._id}>
                    <RightSidebar profileImage={rightSideBarData.profileImage} id={rightSideBarData._id} email={userData.email} firstName={rightSideBarData.firstName} lastName={rightSideBarData.lastName} />
                </div>
            ))}
        </div>
    )
}
