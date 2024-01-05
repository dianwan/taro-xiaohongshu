import { useState } from 'react'
import { View, Image, StickyHeader, Icon, Input, BaseEventOrig } from '@tarojs/components'
import styles from './header.module.less'

import newLogo from '@/assets/new-logo.png'

export default function Header() {

  const [searchContent, setSearchContent] = useState('')
  const [isVisibleSearch, setIsVisibleSearch] = useState(false)
  const cancelSearch = () => {
    setIsVisibleSearch(false)
    setSearchContent('')
  }
  const handleSearchInput = (event: BaseEventOrig) => {
    setSearchContent(event.detail.value)
  }

  const fetchSearchingResult = () => {
    console.log('todo')
  }

  return (
    <>
      <StickyHeader>
        <View className={styles.title}>小红书</View>
      </StickyHeader>
      <StickyHeader>
        <View className={styles['new-header']}>
          {
            !isVisibleSearch
              ? (
                  <>
                    <Image className={styles['new-header__logo']} src={newLogo} />
                    <View className={styles['new-header__buttons']} onTap={() => setIsVisibleSearch(true)}>
                      <Icon size='20' type='search' />
                    </View>
                  </>
                )
              : (
                <>
                  <View className={styles['new-header__search-input']}>
                    <Input value={searchContent} onInput={handleSearchInput} className={styles.input} type="text" placeholder='登录探索更多内容'/>
                    <View className={styles['icon-search']} onTap={fetchSearchingResult}>
                      <Icon size='20' type='search' />
                    </View>
                    { !!searchContent && (
                      <View className={styles['icon-clear']} onTap={() => setSearchContent('')}>
                        <Icon size='20' type='clear' />
                      </View>
                    )}
                  </View>
                  <View onTap={cancelSearch}>取消</View>
                </>
              )
          }
        </View>
      </StickyHeader>
    </>
  )
}
