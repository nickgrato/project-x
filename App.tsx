import React from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import MainNavigation from "./navigation/MainNavigation"
import * as eva from "@eva-design/eva"
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components"
import { EvaIconsPack } from "@ui-kitten/eva-icons"

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaView
          style={{
            flex: 1,
          }}
        >
          <NavigationContainer>
            <MainNavigation />
          </NavigationContainer>
        </SafeAreaView>
      </ApplicationProvider>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
