import { StyleSheet, Text, View,  SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import Markdown from 'react-native-markdown-display';
import { selectRow, deleteRow } from '../db_logic';
import { Buffer } from 'buffer'
import styles from '../Style'

export function toBase64(input) {
  return Buffer.from(input, 'utf-8').toString('base64')
}

export function fromBase64(encoded) {
  return Buffer.from(encoded, 'base64').toString('utf8')
}

const view = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [noteHeader, setNoteHeader]  = useState(undefined);
  const [noteContact, setNoteContact]  = useState(undefined);
  const [noteDate, setNoteDate]  = useState(undefined);  
  const [noteText, setNoteText]  = useState(undefined);

  const deleteCall = async (currId) => {
    if(currId == 'new'){      
      return;
    }
    Alert.alert('Удалить запись?', 'Удаление записи', [
      {
        text: 'Отмена',
        onPress: () => console.log('Cancel Pressed')      
      },
      {text: 'Удалить', onPress: async () => {await deleteRow('noteTalking1.db', currId, (rows) => {        
        console.log(rows);
        router.replace({ pathname: `/` });  
      })}},
    ]);   
  }

  useEffect(() => {
    const fetchData = async () => {
      // Этот код будет выполняться каждый раз при загрузке пути `/view`
      const val = await selectRow('noteTalking1.db', id, (row) =>{
        console.log(row.header);      
        setNoteHeader(row.header);
        setNoteContact(row.contact);
        setNoteDate(row.date);        
        setNoteText(fromBase64(row.note));
        navigation.setOptions({
          title: row.header,
        }); 
      });        
    };  
    fetchData();           
  }, [navigation]);


  const toEdit = (id) => {        
    router.push({ pathname: `/edit/${id}` });     
  };
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>                        
        <Text style={styles.valueTextStyle}>Имя контакта: {noteContact}</Text>
        <Text style={styles.valueTextStyle}>Дата: {noteDate}</Text>
      </View>
      <ScrollView style={ styles.commonContainer}>
        <Markdown style={{ fontSize: 18 }}>{noteText}</Markdown>
      </ScrollView>         
      <View style={styles.bottom}>
        <TouchableOpacity onPress={() => deleteCall(id)}>
          <Image source={require('../../assets/delete.png')} style={styles.bottomButton}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toEdit(id)}>
          <Image source={require('../../assets/edit.png')} style={styles.bottomButton}/>
        </TouchableOpacity>      
      </View>      
    </SafeAreaView>
  )
}

export default view;