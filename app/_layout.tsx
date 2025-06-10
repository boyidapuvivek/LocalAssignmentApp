import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { BookmarkProvider } from "@/contexts/BookmarkContext";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "poppins-regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "poppins-medium": require("@/assets/fonts/Poppins-Medium.ttf"),
    "poppins-bold": require("@/assets/fonts/Poppins-Bold.ttf"),
    "poppins-semibold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <BookmarkProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name='(tabs)'
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='job/[id]'
            options={{ headerShown: false }}
          />
        </Stack>
        <StatusBar style='auto' />
      </ThemeProvider>
    </BookmarkProvider>
  );
}
