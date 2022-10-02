import React from 'react'

type Props = {
  setFilter?: (...args: any) => void;
  filters: string[];
}

const Drawer = (props: Props) => {
  const {setFilter, filters} = props;
  return (
    <div className="drawer max-w-xs">
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
            <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content gap-2">
              {filters?.map((val,index) => {
                return <li onClick={()=>setFilter(val)}><a>{val}</a></li>
              })}
              <button className='btn btn-secondary' onClick={()=>setFilter(null)}>clear filter</button>
            </ul>
        
        </div>
        </div>
  )
}

export default Drawer