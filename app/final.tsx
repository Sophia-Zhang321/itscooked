import { Text, View, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import globalStyles from "C:/Users/sophi/itscooked/app/styles/styles";



export default function final() {
    const router = useRouter();
    return(
    <View style={globalStyles.container}>
        <Text style={globalStyles.title}> MEATT DONE :p </Text>
        
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => router.push("/chooseanimal")}
        >
          <Text style={globalStyles.buttonText}>MAKE MORE MEAT</Text>
        </TouchableOpacity>

        <Image // cow
            style={globalStyles.dancingcow}
            source={{
            uri: 'https://media.tenor.com/9egJp0qwy_UAAAAi/polish-cow-polish.gif',
            }}
        />
        <Image // pig
            style={{marginLeft: 30, width: 160, height: 160}}
            source={{
            uri: 'https://media.tenor.com/w7aosY4inrQAAAAj/minecraft-pig.gif',
            }}
        />

        <Image // fish
            style={{width: 100, height: 65}}
            source={{
            uri: 'https://i.gifer.com/origin/b1/b1d68c139f8c0514b039ff63703633aa_w200.gif',
            }}
        />
    </View>
    )
    
};