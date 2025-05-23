import {Image} from "expo-image";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from "react-native";

import {useAppStyle} from "@/context/AppStyleContext";
import {VideoData} from "@/extraction/Types";

interface Props {
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  data: VideoData;
}

// OLD WAY: Should be replaced with VideoCard in elements/tv
export default function ReelCardPhone({
  style,
  textStyle,
  onPress,
  data,
}: Props) {
  const {style: appStyle} = useAppStyle();

  return (
    <View style={[styles.container, {width: 150}]}>
      <TouchableNativeFeedback onPress={onPress}>
        <View
          style={[
            styles.segmentContainer,
            {aspectRatio: 0.56, borderRadius: 25},
          ]}>
          <Image
            style={styles.imageStyle}
            resizeMode={"cover"}
            source={{
              uri:
                data.thumbnailImage?.url ??
                "https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/minion.jpg",
            }}
          />
          {data.title ? (
            <View style={styles.titleContainer}>
              <Text
                style={[
                  styles.titleStyle,
                  {color: appStyle.textColor},
                  textStyle,
                ]}>
                {data.title}
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "blue",
    marginVertical: 5,
    flex: 0,
    marginHorizontal: 10,
  },
  segmentContainer: {
    backgroundColor: "#aaaaaa",
    overflow: "hidden",
    aspectRatio: 1.7,
    alignItems: "center",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
  titleStyle: {
    fontSize: 15,
    maxHeight: 50,
    flexWrap: "wrap",
    paddingEnd: 20,
  },
  titleContainer: {
    position: "absolute",
    left: 5,
    bottom: 5,
    right: 5,
    fontSize: 14,
  },
});
