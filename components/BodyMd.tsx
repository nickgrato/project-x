import { StyleSheet, Text, TextStyle } from 'react-native'
import React from 'react'
type BodyMdPropsT = {
  style?: TextStyle
  children: string
}
const BodyMd = ({ children, style }: BodyMdPropsT) => (
  <Text style={[style, styles.body]}>{children}</Text>
)

export default BodyMd

const styles = StyleSheet.create({
  body: {
    fontSize: 16,
    fontWeight: '500',
  },
})
