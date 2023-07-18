import React from 'react'
import { StyleSheet, Text } from 'react-native'
import colors from '../../constants/colors'

type HeadingSmPropsT = {
  style?: {}
  children: string
}
const HeadingSm = ({ children, style }: HeadingSmPropsT) => (
  <Text style={[style, styles.heading]}>{children}</Text>
)

export default HeadingSm

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.med_black,
  },
})
