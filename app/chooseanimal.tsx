import { useFonts } from 'expo-font';
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Button } from "react-native";
import globalStyles from "C:/Users/sophi/itscooked/app/styles/styles";

export default function chooseanimal() {
    const router = useRouter();
    // const [fontsLoaded] = useFonts({
    //     'Jersey10-Regular': require('C:/Users/sophi/itscooked/assets/fonts/Jersey10-Regular.ttf'),
    //     'VT323-Regular': require('C:/Users/sophi/itscooked/assets/fonts/VT323-Regular.ttf'),
    // });
  
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>👋 pick one </Text>
        <Text style={[globalStyles.buttonText, { marginBottom: 30 }]}>
          Choose an option:
        </Text>
  
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => router.push("/cow")}
        >
          <Text style={globalStyles.buttonText}>Cow</Text>
        </TouchableOpacity>
  
        {/* <TouchableOpacity
          style={globalStyles.button}
          onPress={() => router.push("/option2")}
        >
          <Text style={globalStyles.buttonText}>Option 2</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => router.push("/option3")}
        >
          <Text style={globalStyles.buttonText}>Option 3</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => router.push("/option4")}
        >
          <Text style={globalStyles.buttonText}>Option 4</Text>
        </TouchableOpacity> */}
      </View>
    );
  }