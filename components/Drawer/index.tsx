import React from 'react'

type Props = {}

const Drawer = (props: Props) => {
  return (
    <div className="drawer max-w-xs">
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
            <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
            </ul>
        
        </div>
        </div>
  )
}

export default Drawer