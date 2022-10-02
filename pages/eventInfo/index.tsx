import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getEvent } from '../../back-end/functions'

type Props = {}


const EventInfo = (props: Props) => {
  const [event, setEvent] = useState(undefined)
  const eventQuery = async () => {
    const events = await getEvent(`${router.query.id}`)
    setEvent(event)
  }

  useEffect(() => {
    eventQuery()
  }, [])
  
  useEffect(() => {
    console.log("all events", event)
  }, [event])

  const router = useRouter()



  return (
    <div className='page-container flex-row'>
      Hello, {router.query.id}
      
    </div>
  )
}

export default EventInfo