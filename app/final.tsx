import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import globalStyles from "C:/Users/sophi/itscooked/app/styles/styles";


export default function final() {
    const router = useRouter();
    return(
    <View>
        <Text style={globalStyles.title}> MEATT :p </Text>
    </View>
    )
    
};