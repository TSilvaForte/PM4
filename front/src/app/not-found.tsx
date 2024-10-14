"use client";
import Image from 'next/image'
import { useRouter } from 'next/navigation';


const Error404 = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src="/404.png" alt="Error" width={300} height={300} />
      <h1 className="text-white text-2xl text-center mt-6 mb-4">
        Ops! <br/> Sorry, something went wrong. 
      </h1>
      <button onClick={() => router.push('/')}> 
          Return to homepage
      </button>
    </div>
  )
}

export default Error404;