import { Stack } from "expo-router";
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Jersey10-Regular': require('C:/Users/sophi/itscooked/assets/fonts/Jersey10-Regular.ttf'),
    'VT323-Regular': require('C:/Users/sophi/itscooked/assets/fonts/VT323-Regular.ttf'),
  });

  return (
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="chooseanimal" options={{ headerShown: false }} />
    <Stack.Screen name="cow" options={{ headerShown: false }} />
    <Stack.Screen name="pig" options={{ headerShown: false }} />
    <Stack.Screen name="chicken" options={{ headerShown: false }} />
    <Stack.Screen name="fish" options={{ headerShown: false }} />
  </Stack>)
}