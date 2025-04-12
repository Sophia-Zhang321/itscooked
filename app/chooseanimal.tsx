import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Button } from "react-native";
import globalStyles from "C:/Users/sophi/itscooked/app/styles/styles";

export default function chooseanimal() {
    const router = useRouter();

    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>pick one </Text>
        <Text style={[globalStyles.buttonText, { marginBottom: 30 }]}>
          Choose an option:
        </Text>
  
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => router.push("/cow")}
        >
          <Text style={globalStyles.buttonText}>cow</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => router.push("/pig")}
        >
          <Text style={globalStyles.buttonText}>pig</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => router.push("/chicken")}
        >
          <Text style={globalStyles.buttonText}>chicken</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => router.push("/fish")}
        >
          <Text style={globalStyles.buttonText}> fish</Text>
        </TouchableOpacity>
      </View>
    );
  }