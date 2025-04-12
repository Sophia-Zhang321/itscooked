import { useFonts } from 'expo-font';
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import globalStyles from "C:/Users/sophi/itscooked/app/styles/styles";

export default function Index() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'Jersey10-Regular': require('C:/Users/sophi/itscooked/assets/fonts/Jersey10-Regular.ttf'),
    'VT323-Regular': require('C:/Users/sophi/itscooked/assets/fonts/VT323-Regular.ttf'),
  });

  return (  
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <Pressable style={globalStyles.container} onPress={() => router.push("/chooseanimal")}>
      <Text style={{ fontFamily: 'Jersey10-Regular', fontSize: 80 }}>
        WELCOME TO MEAT COOKER 1000
      </Text>
      <Text style={{ fontFamily: 'VT323-Regular', fontSize: 30 }}>
        CLICK ANYWHERE TO START
      </Text>
    </Pressable>
    </View>
  );
}

