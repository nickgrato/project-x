import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { List, ListItem, Modal, Button, Card } from '@ui-kitten/components'
import { useFocusEffect } from '@react-navigation/native'

export default function ListScreen() {
  type TaskT = {
    title: string
    description: string
    id: string
    is_active: boolean
  }
  const [tasks, setTasks] = useState<any[]>([])
  const [task, setTask] = useState<TaskT>({} as TaskT)
  const [visible, setVisible] = useState<boolean>(false)

  // This hook runs everytime the screen gets routed to
  useFocusEffect(
    useCallback(() => {
      getTasks()
    }, [])
  )

  const getTasks = async () => {
    const blob = await fetch('https://serverx.fly.dev/api/tasks')
    const { data } = await blob.json()
    console.log(data)
    setTasks(data)
  }

  // Click Events
  const dispatchModal = (task: TaskT) => {
    setTask(task)
    setVisible(true)
  }

  const closeModal = () => {
    setVisible(false)
  }

  const onListPress = (task: TaskT) => {
    dispatchModal(task)
  }

  const createDescription = (description: string): string => {
    const max = 100
    const islong = description.length > max
    let formattedTest = description

    if (islong) {
      formattedTest = description.substring(0, max) + '...'
    }

    return formattedTest
  }

  // CRUD
  const deleteTask = async (task: TaskT) => {
    const resp = (await fetch(`https://serverx.fly.dev/api/tasks/${task.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((error) => {
      // setIsFailure(true)
    })) as Response
    closeModal()
    getTasks()
  }

  const deleteTaskPress = () => {
    deleteTask(task)
  }

  const renderItem = ({ item, index }) => (
    <ListItem
      onPress={() => onListPress(item)}
      title={`${index + 1}: ${item.title} `}
      description={createDescription(item.description)}
    />
  )

  return (
    <View style={styles.container}>
      {tasks && <List data={tasks} renderItem={renderItem} />}
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => closeModal()}
      >
        <Card disabled={true}>
          <Text>{task.title}</Text>
          <Text>{task.description}</Text>
          <Button onPress={() => deleteTaskPress()}>DELETE TASK</Button>
          <Button onPress={() => closeModal()}>DISMISS</Button>
        </Card>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})
