import React, { useState, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  List,
  ListItem,
  Modal,
  Button,
  Card,
  Icon,
} from '@ui-kitten/components'
import { useFocusEffect } from '@react-navigation/native'
import { HeadingMd, BodyMd } from '../components/typography'
import {
  getTasks,
  TaskT,
  deleteTask,
  updateTask,
} from '../services/task.service'
// https://akveo.github.io/eva-icons/#/

export default function ListScreen() {
  const [tasks, setTasks] = useState<any[]>([])
  const [task, setTask] = useState<TaskT>({} as TaskT)
  const [visible, setVisible] = useState<boolean>(false)
  const [showActive, setShowActive] = useState<boolean>(true)
  console.log('tasks')
  // This hook runs everytime the screen gets routed to
  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        const tasks = await getTasks()
        console.log('tasks', tasks)
        setTasks(tasks)
      }
      getData()
    }, [])
  )

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

  const deleteTaskPress = async () => {
    try {
      await deleteTask(task.id)
      closeModal()

      // Refresh tasks
      const tasks = await getTasks()
      setTasks(tasks)
    } catch (error) {
      console.error(error)
    }
  }

  const deactivateTaskPress = async () => {
    try {
      await updateTask({
        ...task,

        is_active: false,
      })
      closeModal()

      // Refresh tasks
      const tasks = await getTasks()
      setTasks(tasks)
    } catch (error) {
      console.error(error)
    }
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
        onPress={() => deactivateTaskPress()}
        status="primary"
        appearance="outline"
        accessoryLeft={<Icon name="checkmark-circle-2-outline" />}
      />
      <Button
        style={styles.footerControl}
        onPress={() => deleteTaskPress()}
        status="danger"
        appearance="outline"
        accessoryLeft={<Icon name="trash" />}
      />
      {/* <Button
        style={styles.footerControl}
        onPress={() => closeModal()}
        status="success"
        appearance="outline"
        accessoryLeft={<Icon name="checkmark" />}
      /> */}
    </View>
  )

  return (
    <View style={styles.container}>
      <Button
        onPress={() => setShowActive((state) => !state)}
        appearance="outline"
      >
        {showActive ? 'View Completed Tasks' : 'View Active Tasks'}
      </Button>
      {/* List of Tasks  */}
      {tasks && showActive && (
        <List
          data={tasks.filter((task) => task.is_active === true)}
          renderItem={renderItem}
        />
      )}

      {tasks && !showActive && (
        <List
          data={tasks.filter((task) => task.is_active === false)}
          renderItem={renderItem}
        />
      )}

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
