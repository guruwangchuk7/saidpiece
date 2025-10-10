import { div } from 'motion/react-client'
import React from 'react'

const RecentProjects = () => {

    const data = [
        {
            imageLink:'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title:'XYZ homes',
        },
        {
            imageLink:'https://plus.unsplash.com/premium_photo-1661876567457-d9bd96f4b67f?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title:'ABC homes',
        },
    ]

  return (
    <div className='px-10'>
        <h1 className='text-3xl'>PROJECTS</h1>
        <div className='flex gap-10'>
             {
               data.map((item , index)=>(
                <div className='cursor-pointer'>
                    <img src={item.imageLink} alt="" className='h-70 mt-5 rounded-xl' />
                    <p className='py-2 font-medium text-zinc-400 hover:text-zinc-200'>{item.title}</p>
                </div>
               ))
             }
        </div>
    </div>
  )
}

export default RecentProjects