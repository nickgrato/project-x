import React from "react"
import { StyleSheet, Text, View, ScrollView } from "react-native"
import { List, ListItem } from "@ui-kitten/components"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const data = new Array(48).fill({
  title: "Item",
})

export default function ListScreen() {
  const onListPress = () => {
    console.log("list press")
  }

  const renderItem = ({ item, index }) => (
    <ListItem onPress={onListPress} title={`${item.title} ${index + 1}`} />
  )

  return (
    <View style={styles.container}>
      <List data={data} renderItem={renderItem} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
