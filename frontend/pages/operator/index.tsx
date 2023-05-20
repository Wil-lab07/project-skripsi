import type { NextPage } from 'next';
import { useAccount } from 'wagmi'
import Content from '../../components/content';
import { useRouter } from 'next/router'
import { useEffect } from 'react';

const Operator : NextPage = () => {
  const { isConnected } = useAccount()
  const { push } = useRouter()

  useEffect(() => {
    if (!isConnected) {
      push('/login')
    }
  }, [isConnected, push])

  return (
    <>
      <Content/> 
    </>  
  )
}

export default Operator;