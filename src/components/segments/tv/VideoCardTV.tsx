import {Icon} from "@rneui/base";
import {Image} from "expo-image";
import React, {useState} from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";

import VideoTouchable from "../../general/VideoTouchable";

import {useAppStyle} from "@/context/AppStyleContext";
import {useShelfVideoSelector} from "@/context/ShelfVideoSelector";
import {VideoData} from "@/extraction/Types";

interface Props {
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  data: VideoData;
  onPress?: () => void;
}

// OLD WAY: Should be replaced with VideoCard in elements/tv
export default function VideoCardTV({
  style,
  textStyle,
  onPress,
  data,
  // ...data
}: Props) {
  const {setSelectedVideo, onElementFocused} = useShelfVideoSelector();
  const {style: appStyle} = useAppStyle();
  const {width} = useWindowDimensions();
  const [focus, setFocus] = useState(false);

  return (
    <View
      style={[
        styles.viewContainer,
        {minWidth: 150, maxWidth: width / 4},
        style,
      ]}>
      <VideoTouchable
        style={[styles.segmentContainer, focus ? {borderColor: "white"} : {}]}
        onPress={onPress}
        onFocus={() => {
          onElementFocused?.();
          setFocus(true);
        }}
        onBlur={() => setFocus(false)}
        onLongPress={() => {
          setSelectedVideo(data);
        }}>
        <Image
          style={styles.imageStyle}
          source={{
            uri:
              data.thumbnailImage.url ??
              "https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/minion.jpg",
          }}
        />
        {data.duration ? (
          <Text style={styles.countContainer}>{data.duration}</Text>
        ) : null}
        {data.livestream ? (
          <View style={styles.liveContainer}>
            <Icon name={"record"} type={"material-community"} color={"red"} />
            <Text style={styles.liveStyle}>{"Live"}</Text>
          </View>
        ) : null}
        {data.type === "mix" ? (
          <View style={styles.bottomBorder}>
            <Icon name={"playlist-play"} color={"white"} />
          </View>
        ) : null}
        {data.thumbnailOverlays?.videoProgress ? (
          <View
            style={[
              styles.progressBar,
              {width: `${data.thumbnailOverlays?.videoProgress * 100}%`},
            ]}
          />
        ) : null}
      </VideoTouchable>
      <Text style={[styles.titleStyle, {color: appStyle.textColor}, textStyle]}>
        {data.title}
      </Text>
      {data.author ? (
        <Text style={[{color: appStyle.textColor}, textStyle]}>
          {data.author?.name}
        </Text>
      ) : null}
      {data.short_views ? (
        <Text
          style={[styles.viewsStyle, {color: appStyle.textColor}, textStyle]}>
          {data.short_views}
        </Text>
      ) : null}
      {data.publishDate ? (
        <Text style={[{color: appStyle.textColor}, textStyle]}>
          {data.publishDate}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    marginHorizontal: 20,
    flex: 0,
  },
  segmentContainer: {
    backgroundColor: "#aaaaaa",
    borderRadius: 25,
    overflow: "hidden",
    aspectRatio: 1.7,
    borderWidth: 5,
    borderColor: "black",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    backgroundColor: "grey", // TODO: REMOVE?
  },
  titleStyle: {
    fontSize: 25,
    maxWidth: "100%",
  },
  viewsStyle: {},
  countContainer: {
    position: "absolute",
    right: 10,
    bottom: 10,
    color: "white",
    backgroundColor: "black",
    padding: 5,
    fontSize: 20,
  },
  liveContainer: {
    position: "absolute",
    left: 10,
    bottom: 10,
    backgroundColor: "black",
    padding: 5,
    fontSize: 20,
    flexDirection: "row",
  },
  liveStyle: {
    fontSize: 20,
    color: "red",
  },
  bottomBorder: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    height: "20%",
    backgroundColor: "#111111bb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
  },
  progressBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "red",
    width: "100%",
    height: 3,
  },
});
