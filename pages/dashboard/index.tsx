import React from 'react'
import Drawer from '../../components/Drawer'
import { getUsersFromEvent, getAllEvents } from '../../back-end/functions'
const dash = () => {

	const onClick = async () => {
		console.log('clicked')
		//get all events
		const users = await getAllEvents();

		console.log(users)
	}

  return (
    <div>
      <Drawer/>
      <button onClick={onClick}>Get All Events</button>
    
    </div>
  )
}

export default dash