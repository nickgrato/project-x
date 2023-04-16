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
import { Avatar, Text, Card, Input, Button, Icon } from '@ui-kitten/components'
import colors from '../constants/colors'
import Message from '../shared/Message'

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
    const body = {
      title: title,
      description: description,
      is_active: true,
    }

    const resp = (await fetch('https://serverx.fly.dev/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).catch((error) => {
      setIsFailure(true)
    })) as Response

    console.log('resp', resp)

    if (resp.status === 201) {
      clearForm()
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
      }, 8000)
    } else {
      setIsFailure(true)
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
            <Text style={[styles.h1, styles.header, styles.ml_10]}>
              Welcome home nick,
            </Text>
          </View>

          {/* HOME SCREEN CONTENTS  */}
          <ScrollView style={styles.body}>
            {quote && (
              <Card style={styles.mb_10}>
                <Text style={[styles.h3, styles.mb_10]}>Quote of the day</Text>
                <Text>"{quote.quote}"</Text>
                <Text>- {quote.author}</Text>
              </Card>
            )}

            <Card>
              <Text style={[styles.h3, styles.mb_10]}>New Task</Text>

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
                style={styles.mb_10}
                value={title}
                onChangeText={(text) => setTitle(text)}
              />

              <Input
                style={styles.mb_10}
                multiline={true}
                textStyle={{ minHeight: 64 }}
                placeholder="Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
              />

              <Button accessoryLeft={PlusIcon} onPress={handleSubmit}>
                Submit
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
  mr_10: {
    marginRight: 10,
  },
  ml_10: {
    marginLeft: 10,
  },
  mb_10: {
    marginBottom: 10,
  },
})
