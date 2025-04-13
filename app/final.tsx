import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import globalStyles from "C:/Users/sophi/itscooked/app/styles/styles";



export default function final() {
    const router = useRouter();
    return(
    <View>
        <Text style={globalStyles.title}> MEATT DONE :p </Text>
        
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => router.push("/chooseanimal")}
        >
          <Text style={globalStyles.buttonText}>MAKE MORE MEAT</Text>
        </TouchableOpacity>

    </View>
    )
    
};