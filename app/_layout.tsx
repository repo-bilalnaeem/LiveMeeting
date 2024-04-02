import "react-native-gesture-handler";

import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import {
  StreamVideoClient,
  StreamVideo,
} from "@stream-io/video-react-native-sdk";

import { OverlayProvider } from "stream-chat-expo";
import Toast from "react-native-toast-message";

const InitialLayout = () => {
  const { authState, initialized } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [client, setClient] = useState<StreamVideoClient | null>(null);

  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === "inside";

    if (authState?.authenticated && inAuthGroup) {
      router.replace("/(inside)");
    } else if (!authState?.authenticated && inAuthGroup) {
      router.replace("/");
    }
  }, [authState, initialized]);
  return (
    <>
      {!client && (
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      )}
      
    </>
  );
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <InitialLayout />
      </GestureHandlerRootView>
    </AuthProvider>
  );
};

export default RootLayout;
