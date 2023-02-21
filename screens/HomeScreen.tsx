import React from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import { Avatar, Text, Card, Input, Button, Icon } from "@ui-kitten/components"
import colors from "../constants/colors"

const PlusIcon = (props) => <Icon {...props} name="plus-outline" />

export default function Home() {
  return (
    <View style={styles.container}>
      {/* HEADER  */}
      <View style={styles.header}>
        <Avatar size="giant" source={require("../assets/darth.png")} />
        <Text style={[styles.h1, styles.header, styles.ml_10]}>
          Welcome home nick,
        </Text>
      </View>

      {/* HOME SCREEN CONTENTS  */}
      <ScrollView style={styles.body}>
        <Card style={styles.mb_10}>
          <Text style={[styles.h3, styles.mb_10]}>Quote of the day</Text>
          <Text>
            “In order to write about life first you must live it.”– Ernest
            Hemingway
          </Text>
        </Card>
        <Card>
          <Text style={[styles.h3, styles.mb_10]}>New Task</Text>
          <Input size="large" placeholder="Large" style={styles.mb_10} />

          <Input
            style={styles.mb_10}
            multiline={true}
            textStyle={{ minHeight: 64 }}
            placeholder="Multiline"
          />

          <Button
            accessoryLeft={PlusIcon}
            onPress={() => console.log("new tast!")}
          >
            Submit
          </Button>
        </Card>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
  },
  h1: {
    fontSize: 30,
  },
  h2: {
    fontSize: 28,
  },
  h3: {
    fontSize: 26,
    fontWeight: "700",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  body: {
    padding: 10,
  },
  mr_10: {
    marginRight: 10,
  },
  ml_10: {
    marginLeft: 10,
  },
  mb_10: {
    marginBottom: 10,
  },
})
