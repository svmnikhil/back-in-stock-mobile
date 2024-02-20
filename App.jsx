import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle} from 'react-native-reanimated';


function App() {
  const animation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: animation.value}],
  }));

  return (
    <View className="flex flex-1 justify-center items-center">
      <Animated.View 
        style={[
          {
            width: 100,
            height: 100,
            backgroundColor: "orange",
          },
          animatedStyles,
        ]}></Animated.View>
      <TouchableOpacity 
        onPress={() => {animation.value = 100;}}
        className="w-40 h-10 justify-center items-center border mt-5"
      >
        <Text>Start Animation</Text>
      </TouchableOpacity>
    </View>
  );
}

registerRootComponent(App);