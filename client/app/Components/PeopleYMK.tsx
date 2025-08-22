import React from 'react'
import RightSidebar from './RightSidebar'

interface Props {
  userData: any;
  rightSideBarData: any;
}

export default function PeopleYMK({ rightSideBarData, userData }: Props) {
  return (
    <div className='lg:block hidden border-l border-borderColor px-4 overflow-x-hidden overflow-y-scroll w-[30%] '>
      <h3 className='w-full mb-2 mt-3  text-center'>People you may know</h3>
      {(Array.isArray(rightSideBarData) ? rightSideBarData : [])?.map((rightSideBarData: any) => (
        <div key={rightSideBarData._id}>
          <RightSidebar profileImage={rightSideBarData.profile_image} id={rightSideBarData.id} email={userData.email} firstName={rightSideBarData.first_name} lastName={rightSideBarData.last_name} />
        </div>
      ))}
    </div>
  )
}
