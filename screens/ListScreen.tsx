import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {
  List,
  ListItem,
  Modal,
  Button,
  Card,
  Icon,
} from '@ui-kitten/components'
import { useFocusEffect } from '@react-navigation/native'
import HeadingMd from '../components/HeadingMd'
import BodyMd from '../components/BodyMd'

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

  /**
   * List Item
   * @param props
   * @returns jsx
   */
  const renderItem = ({ item, index }) => (
    <ListItem
      onPress={() => onListPress(item)}
      title={`${index + 1}: ${item.title} `}
      description={createDescription(item.description)}
    />
  )

  /**
   * Modal Footer
   */

  const Footer = () => (
    <View style={styles.footerContainer}>
      <Button
        style={styles.footerControl}
        onPress={() => deleteTaskPress()}
        status="danger"
        appearance="outline"
        accessoryLeft={<Icon name="trash" />}
      />
      <Button
        style={styles.footerControl}
        onPress={() => closeModal()}
        status="success"
        appearance="outline"
        accessoryLeft={<Icon name="checkmark" />}
      />
    </View>
  )

  return (
    <View style={styles.container}>
      {/* List of Tasks  */}
      {tasks && <List data={tasks} renderItem={renderItem} />}

      {/* Edit / Delete model  */}
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => closeModal()}
        style={styles.modal}
      >
        <Card footer={Footer} style={styles.card}>
          <View style={styles.modal_close_wrapper}>
            <Button
              accessoryLeft={<Icon name="close" />}
              style={styles.modal_close_button}
              onPress={() => closeModal()}
              appearance="ghost"
              size="large"
            />
          </View>
          <HeadingMd style={styles.modal_title}>{task.title}</HeadingMd>
          <BodyMd>{task.description}</BodyMd>
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
  modal: {
    justifyContent: 'center',
    width: '100%',
  },
  modal_title: {
    marginBottom: 12,
  },
  modal_close_wrapper: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: 20,
  },
  modal_close_button: {
    position: 'absolute',
    top: -12,
    right: -20,
  },
  card: {
    flexGrow: 1,
    padding: 12,
    margin: 12,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
})
