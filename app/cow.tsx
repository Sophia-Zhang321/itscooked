import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";

export default function cow() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}> cow please work </Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}