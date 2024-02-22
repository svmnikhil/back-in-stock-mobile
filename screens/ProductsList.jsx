import * as React from 'react';

import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const { height, width} = Dimensions.get('screen');
import { EvilIcons } from '@expo/vector-icons';

import {
  FlingGestureHandler,
  Directions,
  State,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import ProductDetails from './ProductDetails';
import DATA from '../data/data';

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

const Stack = createNativeStackNavigator();

const OverflowItems = ({ data, scrollXAnimated }) => {
    const inputRange = [-1, 0, 1];
    const translateY = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
    });
    return (
      <View className="overflow-hidden h-[70px] mb-5">
        <Animated.View style={{ transform: [{ translateY }] }}>
          {data.map((item, index) => {
            return (
              <View key={index} className="h-[68px] p-5">
                <Text className="text-3xl font-extrabold uppercase tracking-[-1px]" numberOfLines={1}>
                  {item.title} 
                  {/* product name goes here */}
                </Text>
                <View className="flex-row justify-between items-center mt-1">
                  <Text className="text-[16px]">
                    <EvilIcons
                      name='location'
                      size={16}
                      color='black'
                      style={{ marginRight: 5 }}
                    />
                    {item.location}
                    {/* company name goes here and change the location icon to some establishment icon*/}
                  </Text>
                  <Text className="text-[12px]">{item.date}</Text>
                  {/* change the date into the date the tracking was created */}
                </View>
              </View>
            );
          })}
        </Animated.View>
      </View>
    );
  };

export default function ProductsList({ navigation }) {

    const [data, setData] = React.useState(DATA);
    const scrollXIndex = React.useRef(new Animated.Value(0)).current;
    const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
    const [index, setIndex] = React.useState(0);
    const setActiveIndex = React.useCallback((activeIndex) => {
      scrollXIndex.setValue(activeIndex);
      setIndex(activeIndex);
    });
  
    React.useEffect(() => {
      if (index === data.length - VISIBLE_ITEMS - 1) {
        // get new data
        // fetch more data
        const newData = [...data, ...data];
        setData(newData);
      }
    });
  
    React.useEffect(() => {
      Animated.spring(scrollXAnimated, {
        toValue: scrollXIndex,
        useNativeDriver: true,
      }).start();
    });

  
    return (
        <GestureHandlerRootView className="flex-1">
            <FlingGestureHandler
            key='left'
            direction={Directions.LEFT}
            onHandlerStateChange={(ev) => {
                if (ev.nativeEvent.state === State.END) {
                if (index === data.length - 1) {
                    return;
                }
                setActiveIndex(index + 1);
                }
            }}
            >
                <FlingGestureHandler
                    key='right'
                    direction={Directions.RIGHT}
                    onHandlerStateChange={(ev) => {
                    if (ev.nativeEvent.state === State.END) {
                        if (index === 0) {
                        return;
                        }
                        setActiveIndex(index - 1);
                    }
                    }}
                >
                    <SafeAreaView className="flex-1 justify-center bg-white">
                        <StatusBar hidden />
                        <FlatList
                            data={data}
                            keyExtractor={(_, index) => String(index)}
                            horizontal
                            inverted
                            contentContainerStyle={{
                            flex: 1,
                            justifyContent: 'center',
                            padding: SPACING * 2,
                            marginTop: 50,
                            }}
                            scrollEnabled={false}
                            removeClippedSubviews={false}
                            CellRendererComponent={({
                            item,
                            index,
                            children,
                            style,
                            ...props
                            }) => {
                            const newStyle = [style, { zIndex: data.length - index }];
                            return (
                                <View style={newStyle} index={index} {...props}>
                                {children}
                                </View>
                            );
                            }}
                            renderItem={({ item, index: i }) => {
                            const inputRange = [i - 1, i, i + 1];
                            const translateX = scrollXAnimated.interpolate({
                                inputRange,
                                outputRange: [50, 0, -100],
                            });
                            const scale = scrollXAnimated.interpolate({
                                inputRange,
                                outputRange: [0.8, 1, 1.3],
                            });
                            const opacity = scrollXAnimated.interpolate({
                                inputRange,
                                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
                            });
    
                            return (
                                <Animated.View
                                style={{
                                    position: 'absolute',
                                    left: -ITEM_WIDTH / 2,
                                    opacity,
                                    transform: [
                                    {
                                        translateX,
                                    },
                                    { scale },
                                    ],
                                }}
                                >
                                <TouchableOpacity 
                                    activeOpacity={0.9} 
                                    onPress={() => {
                                    navigation.navigate("ProductDetails", {
                                        item: data[index]
                                        })
                                    }
                                }>
                                    <Image
                                    source={{ uri: item.poster }}
                                    style={{
                                        width: ITEM_WIDTH,
                                        height: ITEM_HEIGHT,
                                        borderRadius: 14,
                                    }}
                                    />
                                </TouchableOpacity>
                                </Animated.View>
                            );
                            }}
                        />
                        <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
                        <View 
                            style={[
                                StyleSheet.absoluteFillObject, 
                                {transform: [{translateY: height}]}
                            ]}
                            className={`bg-red-300 p-20 rounded-[16px]`}
                        />
                    </SafeAreaView>
                </FlingGestureHandler>
            </FlingGestureHandler>
        </GestureHandlerRootView>
    );
}