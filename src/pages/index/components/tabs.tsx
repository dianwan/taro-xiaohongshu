import { useState } from 'react'
import {
  View,
  ScrollView,
  Text,
} from "@tarojs/components"
import styles from "./tabs.module.less"

const tabList = [
  {
    name: '推荐',
    id: 'tab-1',
  },
  {
    name: '穿搭',
    id: 'tab-2',
  },
  {
    name: '美食',
    id: 'tab-3',
  },
  {
    name: '彩妆',
    id: 'tab-4',
  },
  {
    name: '影视',
    id: 'tab-5',
  },
  {
    name: '职场',
    id: 'tab-6',
  },
  {
    name: '情感',
    id: 'tab-7',
  },
  {
    name: '家居',
    id: 'tab-8',
  },
  {
    name: '游戏',
    id: 'tab-9',
  },
  {
    name: '旅行',
    id: 'tab-10',
  },
  {
    name: '健身',
    id: 'tab-11',
  },
]

const Tabs: React.FC<{}> = () => {
  const [current, setCurrent] = useState('tab-1')
  const handleTap = (id: string) => {
    if (id === current) { return }
    setCurrent(id)
  }
  return (
    <ScrollView
      scrollX
      showScrollbar={false}
      className={styles.tabs}
    >
      {
        tabList.map(item => (
          <View
            key={item.id}
            className={styles.tabs__item}
            onTap={() => handleTap(item.id)}
          >
            <Text className={current === item.id && styles.active}>
              {item.name}
            </Text>
          </View>
        ))
      }
    </ScrollView>
  )
}

export default Tabs
