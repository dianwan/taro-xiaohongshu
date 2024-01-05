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

const list = [
  {
    id: 1,
    title: "感觉这姐一点也不上镜头啊",
    url: "http://sns-webpic-qc.xhscdn.com/202401041851/21beeca6197e742556f9edc0dac0b477/1040g2sg30savf62j2s005no9auk0881cmt61v5o!nc_n_webp_mw_1",
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  {
    id: 2,
    title: "留学生深夜痛哭",
    url: "http://sns-webpic-qc.xhscdn.com/202401041851/fd56230a1ea4d67e33785f1f10eb04a6/1040g2sg30s5qoc3gik005onkit67jtb7amed01o!nc_n_webp_mw_1",
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  {
    id: 3,
    title: "热巴小时候",
    url: "http://sns-webpic-qc.xhscdn.com/202401042233/c6da49f45ce097589f27b160e92e7744/1040g2sg30s74c5dk2m6g5p7vrc7giarl1g09st8!nc_n_webp_mw_1",
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  {
    id: 4,
    title: "我发现上海公交一个有趣的现象",
    url: "http://sns-webpic-qc.xhscdn.com/202401041851/6ac71a77efea7dae4e6dd0518aceedc7/1040g00830t4k3sklk0704a4h8bd3k4vdqsrvh68!nc_n_webp_mw_1",
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  {
    id: 5,
    title: "其实PAPI的现状对我来说就已经是发财了",
    url: "http://sns-webpic-qc.xhscdn.com/202401041851/e3aef6d8dbe35fe1e4e0565cab781d9d/1040g00830sl7i70g40005nadi0o44iqtnmfvvp0!nc_n_webp_mw_1",
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  {
    id: 6,
    title: "在摸土豆的时候突然...",
    url: "http://sns-webpic-qc.xhscdn.com/202401041851/2ff70ad31daf8423251b8102fb6c0783/1040g00830t9ntkp546605n31l03ms2fe3gkd40g!nc_n_webp_mw_1",
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  {
    id: 7,
    title: "其实PAPI的现状对我来说就已经是发财了",
    url: "http://sns-webpic-qc.xhscdn.com/202401041851/3b8c69de2bdfa734d21274d8374ea097/1040g00830sc4evhk3c004a764euq4m3rdc71r0o!nc_n_webp_mw_1",
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  {
    id: 8,
    title: "美国人同学说我用美颜相机拍照，好像是另一个人",
    url: "http://sns-webpic-qc.xhscdn.com/202401041851/c55a6670463bbb04d70ae4e5d5558a06/1040g2sg30sr86d2tka00491qi8auam25guciru0!nc_n_webp_mw_1",
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  {
    id: 10,
    title: "又一位劝不动的客妹😂",
    url: "http://sns-webpic-qc.xhscdn.com/202401041920/733b5a7280744b941ca11cc0d5bcb71b/1040g00830s8ei7892k0g48q495dipfjdva836eo!nc_n_webp_mw_1",
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  {
    id: 11,
    title: "乐山大佛：修复前后对比，一比吓一跳",
    url: "http://sns-webpic-qc.xhscdn.com/202401041920/138a8467336a13d08523e60e0b92c276/1040g2sg30t4enior3u6g5pb0dp14fg2abvojl58!nc_n_webp_mw_1",
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
              key={item.url}
              src={item.url}
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
