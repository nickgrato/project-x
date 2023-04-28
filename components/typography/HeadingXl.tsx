import React from 'react'
import { StyleSheet, Text } from 'react-native'
import colors from '../../constants/colors'

type HeadingXlPropsT = {
  style?: {}
  children: string
}
const HeadingXl = ({ children, style }: HeadingXlPropsT) => (
  <Text style={[style, styles.heading]}>{children}</Text>
)

export default HeadingXl

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.med_black,
  },
})
