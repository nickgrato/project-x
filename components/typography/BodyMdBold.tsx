import React from 'react'
import { StyleSheet, Text } from 'react-native'
import colors from '../../constants/colors'
type BodyMdBoldPropsT = {
  style?: {}
  children: string
}
const BodyMdBold = ({ children, style }: BodyMdBoldPropsT) => (
  <Text style={[style, styles.body]}>{children}</Text>
)

export default BodyMdBold

const styles = StyleSheet.create({
  body: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.med_black,
  },
})
