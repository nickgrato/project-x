import React from 'react'
import { StyleSheet, Text } from 'react-native'
import colors from '../../constants/colors'
type BodyMdPropsT = {
  style?: {}
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
    color: colors.med_black,
  },
})
