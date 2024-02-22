import { View, Image, StyleSheet, Text } from "react-native";
import {AntDesign} from '@expo/vector-icons';

const ProductDetails = ({navigation, route}) => {
    const {item} = route.params;

    return (
        <View className="flex flex-1 justify-between">
            <Image 
                source={{uri: item.poster}}
                style={[StyleSheet.absoluteFillObject]}
            />
            <View style={[StyleSheet.absoluteFillObject]} className="bg-white opacity-30"/> 
            <View className="items-end p-8">
                <AntDesign 
                    name="close"
                    size={28}
                    color={"#000"}
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
            </View>
            
            <View className="bg-white -translate-y-48 pl-4 pt-4 rounded-[16px]">
                <Text className="font-black text-2xl">{item.title}</Text>
                <Text className="font-semibold text-lg">{item.location}</Text>
                <Text className="text-md">{item.date}</Text>
            </View>
        </View>
    )
}

export default ProductDetails;