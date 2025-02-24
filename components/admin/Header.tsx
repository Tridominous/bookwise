import { Session } from 'next-auth'
import React from 'react'

const Header = ({session}: {session: Session}) => {
  return (
    <div>
        <h2 className='text-2xl font-semibold text-dark-400'>
            {session?.user?.name}
        </h2>

        <p className='text-base text-slate-500'>Monitor all of your users and books here</p>
    </div>
  )
}

export default Header