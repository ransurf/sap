import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getEvent } from '../../back-end/functions'

type Props = {}


const EventInfo = (props: Props) => {
  const [event, setEvent] = useState(undefined)
  const eventQuery = async () => {
    const res = await getEvent(`${router.query.id}`)
    setEvent(res)
  }

  useEffect(() => {
    eventQuery()
  }, [])
  
  useEffect(() => {
    console.log("current event", event)
  }, [event])

  const router = useRouter()



  return (
    <div className='page-container flex-row'>

      <div>
        {JSON.stringify(event)}
      </div>
      
    </div>
  )
}

export default EventInfo