import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { createTask } from '../services/task.service'
import { Avatar, Text, Card, Input, Button, Icon } from '@ui-kitten/components'
import colors from '../constants/colors'
import Message from '../shared/Message'
import {
  HeadingXl,
  HeadingMd,
  BodyMd,
  BodyMdBold,
} from '../components/typography'
import { utils } from '../styles/util'

const PlusIcon = (props) => <Icon {...props} name="plus-outline" />

type QuoteT = {
  quote: string
  author: string
  category: string
}

export default function Home() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFailure, setIsFailure] = useState(false)
  const [quote, setQuote] = useState<QuoteT | null>(null)

  useEffect(() => {
    async function getQuote() {
      const blob = await fetch('https://serverx.fly.dev/api/quotes')
      const { data } = await blob.json()
      return data as QuoteT[]
    }

    getQuote().then((resp) => {
      setQuote(resp[0])
    })
  }, [])

  const clearForm = () => {
    setTitle('')
    setDescription('')
  }

  const clearMessaging = () => {
    setIsError(false)
    setIsFailure(false)
    setIsSuccess(false)
  }

  /**
   * Handle Form Submit
   */
  const handleSubmit = () => {
    let foundError = false
    clearMessaging()

    if (!title) {
      foundError = true
      setIsError(true)
    }

    if (!description) {
      foundError = true
      setIsError(true)
    }

    if (foundError) return

    submitTask()
  }

  /**
   * Submit Post Request
   */
  const submitTask = async () => {
    const task = {
      title: title,
      description: description,
      is_active: true,
    }

    try {
      const resp = await createTask(task)
      if (resp.status === 201) {
        clearForm()
        setIsSuccess(true)
        setTimeout(() => {
          setIsSuccess(false)
        }, 8000)
      } else {
        setIsFailure(true)
      }
    } catch (error) {
      setIsFailure(true)
      console.error(error)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      contentContainerStyle={{ flex: 1 }}
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
          {/* HEADER  */}
          <View style={styles.header}>
            <Avatar size="giant" source={require('../assets/darth.png')} />
            <HeadingXl style={[styles.header, utils.ml_10]}>
              Welcome Nick,
            </HeadingXl>
          </View>

          {/* HOME SCREEN CONTENTS  */}
          <ScrollView style={styles.body}>
            {quote && (
              <Card style={utils.mb_10}>
                <HeadingMd style={utils.mb_10}>Quote of the day</HeadingMd>
                <BodyMd style={utils.mb_10}>{`"${quote.quote}"`}</BodyMd>
                <BodyMdBold>{`- ${quote.author}"`}</BodyMdBold>
              </Card>
            )}

            <Card>
              <HeadingMd style={utils.mb_10}>New Task</HeadingMd>

              {isError && (
                <Message
                  message="Your inputs are wrong"
                  type="error"
                  icon="close-circle-outline"
                />
              )}

              {isFailure && (
                <Message
                  message="Failed to save your task"
                  type="success"
                  icon="close-circle-outline"
                />
              )}

              {isSuccess && (
                <Message
                  message="Your note has been saved"
                  type="success"
                  icon="checkmark-circle-2-outline"
                />
              )}

              <Input
                size="large"
                placeholder="Title"
                style={utils.mb_10}
                value={title}
                onChangeText={(text) => setTitle(text)}
              />

              <Input
                style={utils.mb_10}
                multiline={true}
                textStyle={{ minHeight: 64 }}
                placeholder="Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
              />

              <Button accessoryLeft={PlusIcon} onPress={handleSubmit}>
                Add Task
              </Button>
            </Card>
          </ScrollView>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
  },
  h1: {
    fontSize: 30,
  },
  h2: {
    fontSize: 28,
  },
  h3: {
    fontSize: 26,
    fontWeight: '700',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  body: {
    padding: 10,
  },
})
