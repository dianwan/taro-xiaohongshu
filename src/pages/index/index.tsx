import { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  BaseEventOrig,
} from "@tarojs/components";
import "taro-ui/dist/style/components/icon.scss";

import GlobalLayout from "@/layouts/globalLayout";
import Header from "./components/header";
import Tabs from "./components/tabs";

import { getStore } from "@/simpleStore";

import styles from "./index.module.less";

import img01 from '@/assets/01.png'
import img02 from '@/assets/02.png'
import img03 from '@/assets/03.png'
import img04 from '@/assets/04.png'
import img05 from '@/assets/05.png'

const list = [
  {
    id: 1,
    title: "感觉这姐一点也不上镜头啊",
    url: img01,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  {
    id: 2,
    title: "留学生深夜痛哭",
    url: img02,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  {
    id: 3,
    title: "热巴小时候",
    url: img03,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  {
    id: 4,
    title: "我发现上海公交一个有趣的现象",
    url: img05,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  {
    id: 5,
    title: "其实PAPI的现状对我来说就已经是发财了",
    url: img01,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  {
    id: 6,
    title: "在摸土豆的时候突然...",
    url: img02,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  {
    id: 7,
    title: "其实PAPI的现状对我来说就已经是发财了",
    url: img03,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  {
    id: 8,
    title: "美国人同学说我用美颜相机拍照，好像是另一个人",
    url: img04,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  {
    id: 10,
    title: "又一位劝不动的客妹😂",
    url: img01,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  {
    id: 11,
    title: "乐山大佛：修复前后对比，一比吓一跳",
    url: img05,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
];

interface FlowItem {
  id: number,
  url: string,
  title: string,
  width: number;
  height: number;
  top: number;
  left: number;
}

export default function Index() {

  const systemInfo = getStore("systemInfo");
  const { windowWidth } = systemInfo;

  const getImgWidth = (windowWidth: number, colNum) => {
    const rowGapWidth = 30; // 10 * 3
    return (windowWidth - rowGapWidth) / colNum;
  };

  const GAP_WIDTH = 10;
  const COL = 2;
  const imgWidth = getImgWidth(windowWidth, COL);

  let [loadedCount, setLoadedCount] = useState(0);
  const [flowList, setFlowList] = useState<FlowItem[][]>(
    Array.from({ length: COL }).map(() => new Array())
  );
  const flowListCopy = [...flowList];

  const updateFlowItem = (event: BaseEventOrig, index: number) => {
    const { width, height } = event.detail;
    const ratio = width / height;
    list[index].width = imgWidth;
    list[index].height = imgWidth / ratio;
    setLoadedCount(++loadedCount);
  };

  const getMinColInfo = () => {
    let minColHeight: number = Infinity, minColIndex: number = 0;
    for (let i = 0; i < flowListCopy.length; i++) {
      const currentColHeight = flowListCopy[i].reduce((acc, cur) => {
        // 13 = 写死的一行标题字数
        // 24 标题行高 + 20 作者&收藏行高
        const titleRowNum = Math.ceil(cur.title.length / 13)
          return acc + cur.height + titleRowNum * 24 + 20
        },0);
      if (minColHeight > currentColHeight) {
        minColHeight = currentColHeight;
        minColIndex = i;
      }
    }
    return {
      minColIndex,
      minColHeight,
    };
  };

  const [flowListContainerHeight, setFlowListContainerHeight] = useState(0)
  const updateFlowList = () => {
    list.forEach((item) => {
      const newItem = { ...item }
      const { minColIndex, minColHeight } = getMinColInfo();

      newItem.left = minColIndex === 0
        ? GAP_WIDTH
        : imgWidth + GAP_WIDTH * 2


      newItem.top = minColHeight === 0
        ? minColHeight + GAP_WIDTH
        : minColHeight + GAP_WIDTH + (flowListCopy[minColIndex].length * GAP_WIDTH)

        flowListCopy[minColIndex].push(newItem);
    });
    setFlowList([...flowListCopy]);
    setFlowListContainerHeight(getContainerHeight())
  };

  useEffect(() => {
    if (loadedCount === list.length) {
      updateFlowList();
    }
  }, [loadedCount]);

  const getContainerHeight = () => {
    let result: number = 0
    for (const colData of flowList) {
      const lastItem = colData[colData.length - 1]
      result = Math.max(result, lastItem.top + lastItem.height)
    }
    return result + 140 // 最后一行给出一些偏移值(计算误差)
  };

  return (
    <GlobalLayout>
      <ScrollView type="custom" scrollY className={styles.scrollview}>
        <Header />
        <Tabs />

        <View style={{ display: "none" }}>
          {list.map((item, index) => (
            <Image
              key={index}
              src={item.url}
              webp={true}
              style={{ display: "none" }}
              onLoad={(event: BaseEventOrig) => updateFlowItem(event, index)}
            />
          ))}
        </View>
        <View className={styles["wrapper"]} style={{ height: flowListContainerHeight }}>
          {flowList.map((colList) =>
            colList.map((item) => (
              <View
                key={item.id}
                className={styles["card-item"]}
                style={{
                  width: item.width,
                  transform: `translate(${item.left}px, ${item.top}px)`,
                }}
              >
                <View
                  className={styles["card-item__thumb"]}
                  style={{
                    width: item.width,
                    height: item.height,
                    background: `url("${item.url}") center center / cover no-repeat`,
                  }}
                />
                <View className={styles["card-item__title"]}>{item.title}</View>
                <View className={styles["card-item__info"]}>
                  <View className={styles["card-item_info__author"]}>
                    <Image
                      src="https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30r3206evhc6g5pa5v3ngieq7t8psn80?imageView2/2/w/60/format/webp|imageMogr2/strip"
                      className={styles["avatar"]}
                    />
                    <Text className={styles["nickname"]}>爱八卦的小孩</Text>
                  </View>
                  <View className={styles["card-item_info__favorite"]}>
                    <View className="at-icon at-icon-heart"></View>
                    <Text className={styles["count"]}>1k+</Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </GlobalLayout>
  );
}
