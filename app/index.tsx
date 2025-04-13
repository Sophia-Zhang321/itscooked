import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import globalStyles from "C:/Users/sophi/itscooked/app/styles/styles";

export default function Index() {
  const router = useRouter();

  return (  
    <View style={globalStyles.container}>
    <Pressable style={globalStyles.container} onPress={() => router.push("/chooseanimal")}>
      <Text style={globalStyles.title}>
        WELCOME TO MEAT COOKER 1000
      </Text>
      <Text style={globalStyles.subtitle}>
        CLICK ANYWHERE TO START
      </Text>
    </Pressable>
    </View>
  );
}

