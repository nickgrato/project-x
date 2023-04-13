import { StyleSheet, Text, TextStyle } from 'react-native'
import React from 'react'
type HeadingMdPropsT = {
  style?: TextStyle
  children: string
}
const HeadingMd = ({ children, style }: HeadingMdPropsT) => (
  <Text style={[style, styles.heading]}>{children}</Text>
)

export default HeadingMd

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    fontWeight: '700',
  },
})
