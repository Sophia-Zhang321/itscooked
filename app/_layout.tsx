import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import {View } from 'react-native';

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
    {/* Add other screens as needed */}
  </Stack>)
}