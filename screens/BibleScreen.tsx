import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import colors from '../constants/colors'

import { HeadingSm, HeadingMd } from '../components/typography'
import { Avatar, Text, Card, Input, Button } from '@ui-kitten/components'
import { utils } from '../styles/util'
import { getBiblePassages } from '../services/bible.service'
import {
  Icon,
  IconElement,
  Menu,
  MenuGroup,
  MenuItem,
  IndexPath,
  Select,
  SelectItem,
} from '@ui-kitten/components'
import { books } from '../const/books'

export default function Bible() {
  const [bibleData, setBibleData] = useState(null)
  const [currentBook, setCurrentBook] = useState(books[0])
  const [chapterVerse, setChapterVerse] = useState('1.1')

  const getData = async (q: string) => {
    try {
      const data = await getBiblePassages(q)
      console.log('data', data)
      setBibleData(data)
    } catch (error) {
      console.log('error', error)
    }
  }

  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(
    new IndexPath(0)
  )

  /**
   * Handle Form Submit
   */
  const onLookUp = () => {
    getData(`${currentBook}${chapterVerse}`)
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
          <Card style={utils.m_10}>
            <HeadingSm style={utils.mb_10}>{`Select Book`}</HeadingSm>
            <Select
              style={utils.mb_20}
              placeholder="Select Book"
              selectedIndex={selectedIndex}
              value={currentBook}
              onSelect={(index) => {
                const indexPath = index as IndexPath
                setSelectedIndex(index)
                setCurrentBook(books[indexPath.row])
              }}
            >
              {books.map((book, i) => (
                <SelectItem title={book} key={i} />
              ))}
            </Select>

            <HeadingSm style={utils.mb_10}>{`Select Chapter Verse`}</HeadingSm>
            <Input
              size="large"
              placeholder="Chapter & Verse"
              style={utils.mb_20}
              value={chapterVerse}
              onChangeText={(text) => setChapterVerse(text)}
            />

            <Button style={utils.mb_10} onPress={onLookUp}>
              Look Up
            </Button>
            <Button>Add to Memory</Button>
          </Card>
          <ScrollView>
            {bibleData && (
              <Card style={utils.m_10}>
                <HeadingSm style={[utils.mb_10]}>Response</HeadingSm>
                {bibleData.passages.map((passage, i) => {
                  return <Text key={i}>{passage}</Text>
                })}
              </Card>
            )}
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
})
