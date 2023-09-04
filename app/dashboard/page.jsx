'use client'

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

function Dashboard() {
  const router = useRouter();
  const { data:session } = useSession();

  const handleLogout = async () => {
    await signOut({
      redirect: false
    });
    router.push("/auth/signin");
  }

  useEffect(() => {
    console.log(session?.user);
  }, [])

  return (
    <div className='text-black'>
      <h6>This is protected page. You can't see this page untill login</h6>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard;