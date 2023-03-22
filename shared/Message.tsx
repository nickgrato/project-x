import { View, StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import React from 'react'

type MessagePropsT = {
  type?: 'error' | 'success'
  message: string
  icon?: string
}

const Message = ({ type = 'success', message, icon }: MessagePropsT) => {
  return (
    <View style={[styles[`container_${type}`], styles.container]}>
      {icon && <Icon style={styles.icon} fill="#fff" name={icon} />}
      <Text style={styles.message} category="p1">
        {message}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  message: {
    color: '#fff',
  },
  container_error: {
    backgroundColor: '#ea8686',
  },
  container_success: {
    backgroundColor: '#4BB543',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
})

export default Message
