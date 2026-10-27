import { GuestProvider } from '@/contexts/GuestContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import './fontStyles';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GuestProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <meta property="og:title" content="Zulema y José Manuel ♡ 8 de Enero del 2027" />
      <meta property="og:description" content="Acompáñanos a escribir este capítulo" />
      <meta property="og:image" content="https://zulemaymanuel.onrender.com/previewWhats.png" />
      <meta property="og:url" content="https://zulemaymanuel.com" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GuestProvider>
  );
}
