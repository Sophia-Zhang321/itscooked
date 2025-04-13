import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import globalStyles from "C:/Users/sophi/itscooked/app/styles/styles";

export default function Index() {
  const router = useRouter();

  return (  
    <View style={globalStyles.container}>
      <Pressable 
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} 
        onPress={() => router.push("/chooseanimal")}>
        <Text style={{    
          fontFamily: "Jersey10-Regular",
          textAlign: 'center',
          fontSize: 80,}}>
          WELCOME TO MEAT COOKER 1000
        </Text>
        <Text style={globalStyles.subtitle}>
          CLICK ANYWHERE TO START
        </Text>
      </Pressable>
    </View>
  );
}

