import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

const EventInfo = (props: Props) => {
  const router = useRouter()
  return (
    <div className='page-container flex-row'>
      Hello, {router.query.id}
      
    </div>
  )
}

export default EventInfo