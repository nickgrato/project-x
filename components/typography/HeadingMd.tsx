import React from 'react'
import { StyleSheet, Text } from 'react-native'
import colors from '../../constants/colors'

type HeadingMdPropsT = {
  style?: {}
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
    color: colors.med_black,
  },
})
