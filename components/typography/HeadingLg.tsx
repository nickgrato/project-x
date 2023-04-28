import React from 'react'
import { StyleSheet, Text } from 'react-native'
import colors from '../../constants/colors'
type HeadingLgPropsT = {
  style?: {}
  children: string
}
const HeadingLg = ({ children, style }: HeadingLgPropsT) => (
  <Text style={[style, styles.heading]}>{children}</Text>
)

export default HeadingLg

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.med_black,
  },
})
