import {
  PlusJakartaSans_400Regular, PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold
} from '@expo-google-fonts/plus-jakarta-sans';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import "../global.css";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });
  const [splashDone, setSplashDone] = useState(false);
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  let appReady = loaded && !error;
  if (!loaded && !error) {
    return null;
  }
  // {appReady && <Slot />}

  // if (!splashDone) return (
  //   <AnimatedSplash ready={appReady} onFinish={() => setSplashDone(true)} />
  // )

  return (
    <Stack initialRouteName='(app)'
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(public)" />
      <Stack.Screen name="(app)" />
    </Stack>

  )
}
