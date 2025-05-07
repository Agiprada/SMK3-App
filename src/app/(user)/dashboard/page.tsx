import Hero from '@/components/user/dashboard/hero'
import Jurusan from '@/components/user/dashboard/jurusan'
import Profile from '@/components/user/dashboard/Profile'
import React from 'react'

export default function DashboardUser() {
  return (
    <div className=''>
        <Hero/>
        <Profile />
        <Jurusan/>
    </div>
  )
}
