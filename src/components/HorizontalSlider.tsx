import React, { useRef, useState } from 'react';
import {
  FlatList,
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

type Props<T> = {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemWidth: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  keyExtractor?: (item: T, index: number) => string;
  flatListRef?: React.RefObject<FlatList<T> | null>;
  flatListProps?: Omit<
    FlatListProps<T>,
    'data' | 'horizontal' | 'keyExtractor' | 'contentContainerStyle' | 'renderItem'
  >;
  showPagination?: boolean;
  paginationContainerStyle?: StyleProp<ViewStyle>;
  dotStyle?: StyleProp<ViewStyle>;
  activeDotStyle?: StyleProp<ViewStyle>;
};

function HorizontalSlider<T>({
  data = [],
  renderItem,
  itemWidth,
  contentContainerStyle,
  keyExtractor,
  flatListRef,
  flatListProps,
  showPagination = false,
  paginationContainerStyle,
  dotStyle,
  activeDotStyle,
}: Props<T>) {
  const internalRef = useRef<FlatList<T>>(null);
  const sliderRef = flatListRef ?? internalRef;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setActiveIndex(Math.round(event.nativeEvent.contentOffset.x / itemWidth));
    flatListProps?.onMomentumScrollEnd?.(event);
  };

  return (
    <View>
      <FlatList
        ref={sliderRef}
        {...flatListProps}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor || ((_, i) => i.toString())}
        contentContainerStyle={contentContainerStyle}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item, index }) => (
          <View style={{ width: itemWidth }}>
            {renderItem(item, index)}
          </View>
        )}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews
      />

      {showPagination ? (
        <View style={[styles.dots, paginationContainerStyle]}>
          {data.map((_, index) => (
            <TouchableOpacity
              key={keyExtractor ? keyExtractor(_, index) : index.toString()}
              onPress={() => {
                sliderRef.current?.scrollToIndex({ index, animated: true });
                setActiveIndex(index);
              }}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.dot,
                  dotStyle,
                  index === activeIndex && styles.dotActive,
                  index === activeIndex && activeDotStyle,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C4C4C4',
    marginHorizontal: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: '#1E88E5',
  },
});

export default HorizontalSlider;
