import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getEvent } from '../../back-end/functions'
import Image from 'next/image';
type Props = {}


const EventInfo = (props: Props) => {
  const [event, setEvent] = useState(undefined)
  const [ img, setImg] = useState(undefined)

  const eventQuery = async () => {
    const res = await getEvent(`${router.query.id}`)
    setEvent(res)
  }

  useEffect(() => {
    if (!event) {
      eventQuery()
    }
    
  })
  
  useEffect(() => {
    //console.log("current event", event)
    event?setImg(event.image):null
  }, [event])

  const router = useRouter()



  return (
    <div className='page-container flex-row'>

      <div>
        {JSON.stringify(event)}
        
        <img src ={img}/>
      </div>
      
    </div>
  )
}

export default EventInfo