import { PropsWithChildren } from 'react'
import { getSystemInfoAsync, useLaunch } from '@tarojs/taro'
import { setStore } from '@/simpleStore'
import './app.less'

export default function App({ children }: PropsWithChildren<any>) {

  const setSystemInfo = () => {
    getSystemInfoAsync({
      success: (res) => {
        setStore('systemInfo', res)
      }
    })
  }

  useLaunch(() => {
    setSystemInfo()
    console.log('App launched.')
  })

  return children
}

