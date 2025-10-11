import * as React from 'react';
import {Link} from "react-router-dom";

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Link to="/" className='flex items-center font-bold gap-x-2'>
      <svg
        width={100}
        height={100}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <circle cx="50" cy="50" r="50" fill="#222BEE" />
        <path
          d="M29 50V29H35H41V32V35H44H47V38V41H50H53V44V47H56H59V38V29H65H71V50V71H65H59V68V65H56H53V62V59H50H47V56V53H44H41V62V71H35H29V50Z"
          fill="white"
        />
      </svg>
      Logo
    </Link>
  );
}
