import React, { useRef, useState } from "react";
import { View, FlatList, Dimensions, Animated } from "react-native";

const { width } = Dimensions.get("window");

const SLIDE_WIDTH = width * 0.8; // 80% of screen width
const SPACING = 10; // Gap between slides
const ITEM_WIDTH = SLIDE_WIDTH + SPACING; // Full width per item

const Slider = ({ data, size }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [index, setIndex] = useState(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  return (
    <View style={{ alignItems: "center" }}>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled={false} // Allows next slide to be partially visible
        snapToInterval={ITEM_WIDTH} // Ensures smooth snap behavior
        snapToAlignment="start" // Aligns items properly
        decelerationRate="fast" // Makes sliding smooth
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{
              width: SLIDE_WIDTH*0.9,
              height: '100%',
              marginRight: SPACING,
              overflow: "hidden",
            }}
          >
            {item.url && <item.url width="100%" height={size=='normal' ? 200 : 300} />}
          </View>
        )}
        onScroll={handleScroll}
      />
    </View>
  );
};

export default Slider;
