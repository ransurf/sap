import { useAuth,signOut } from '../../back-end/authContext'
import Link from 'next/link'

export default function Header(props: any) {
  const { user, loading } = useAuth();

  return (
    //     <div className="navbar bg-base-100">
    //       <div className="flex-1">
    //         <Link href="/dashboard">
    //           <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
    //         </Link>
    //       </div>
    //       <div className="flex-">
    //         <ul className="menu menu-horizontal p-0">
    //           <li>
    //             <a>Item 1</a>
    //           </li>
    //           <li tabIndex={0}>
    //             <a>
    //               Parent
    //               <svg
    //                 className="fill-current"
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width="20"
    //                 height="20"
    //                 viewBox="0 0 24 24"
    //               >
    //                 <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
    //               </svg>
    //             </a>
    //             <ul className="p-2 bg-base-100">
    //               <li>
    //                 <a>Submenu 1</a>
    //               </li>
    //               <li>
    //                 <a>Submenu 2</a>
    //               </li>
    //             </ul>
    //           </li>
    //           <li>
    //             <a>Item 3</a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        {/* <Link href="/dashboard">
        </Link> */}
        <a className="btn btn-ghost normal-case text-xl">SAP</a>
        <Link href="/dashboard">
          <a className="btn btn-ghost normal-case text-xl">Dashboard</a>
        </Link>
        <Link href="/events">
          <a className="btn btn-ghost normal-case text-xl">Events</a>
        </Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          {/* <label tabIndex={0} className="btn btn-ghost btn-circle">
          </label> */}

          {!user && !loading ? (
            <>
              <Link href="/signup">
                <button className="m-auto"> Signup</button>
              </Link>

              <Link href="/signin">
                <button className="m-auto"> Signin</button>
              </Link>
            </>
          ) : null}
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://placeimg.com/80/80/people" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a onClick={signOut}>Logout</a>
                  </li>
                </ul>
              </div>
            </>
          ) : null}
          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          ></div>
        </div>
      </div>
    </div>
  );
  // <div className="flex h-full flex-row">

  //     <div className="flex-1 my-auto">
  //     <Link href='/'>
  //         <button >Home</button>
  //     </Link>
  //     </div>

  //     <div className="m-auto space-x-2">

  //     </div>
  // </div>
}
