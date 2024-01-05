import { PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import { getStore } from '@/simpleStore'

import './index.less'

export default function GlobalLayout({ children }: PropsWithChildren<any>) {

  const systemInfo = getStore('systemInfo')
  // 仅demo 这里未判断iphone型号 不是所有iphone都有刘海屏
  const isBangsScreen = systemInfo.model.includes('iPhone')

  return (
    <View
      style={{ marginTop: isBangsScreen ? systemInfo.statusBarHeight : 0 }}
    >
      { children }
    </View>
  )
}
