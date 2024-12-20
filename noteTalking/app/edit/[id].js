import { Pressable, StyleSheet, Text, TextInput, ScrollView, View, Alert, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from "react";
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Buffer } from 'buffer'
import { deleteRow, insertInto, select, selectRow, updateData } from '../db_logic';
import styles from '../Style';

export function toBase64(input) {
  return Buffer.from(input, 'utf-8').toString('base64')
}

export function fromBase64(encoded) {
  return Buffer.from(encoded, 'base64').toString('utf8')
}

const edit = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const [currId, setCurrId] = useState('new');

  useEffect(() => {
    // Этот код будет выполняться каждый раз при загрузке пути `/edit`    
    if(id != 'new'){
      const fetchData = async () => {       
        const val = await selectRow('noteTalking1.db', id, (row) =>{
          console.log(row.header);      
          setNoteHeader(row.header);
          setNoteContact(row.contact);
          setNoteDate(row.date);
          setNoteText(fromBase64(row.note));
        });        
      };  
      fetchData();
      // Требует время на выполнение, поэтому сперва работаем с параметром
      setCurrId(id);
    }
    else{
      navigation.setOptions({
        title: 'Добавление новой',
      });     
    }
  }, [navigation]); 

  const CheckAll = async () => {
    const val = await select('noteTalking1.db', (rows) => {        
        console.log(rows);
      });    
  }

  const deleteCall = async () => {
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

  const toView = (id) => {        
    router.push({ pathname: `/view/${id}` });     
  };
  
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let formattedDate = new Date(date);    
    hideDatePicker();
    setNoteDate(formattedDate.toLocaleString("es-CL"));
  };

  const [noteHeader, setNoteHeader]  = useState(undefined);
  const [noteContact, setNoteContact]  = useState(undefined);
  const [noteDate, setNoteDate]  = useState(undefined);  
  const [noteText, setNoteText]  = useState(undefined);

  function currDateForDB(){
    function toString(number, padLength) {
        return number.toString().padStart(padLength, '0');
    }

    let date = new Date();

    let dateTimeNow =
                  toString( date.getFullYear(), 4)
          + '-'  + toString( date.getMonth() + 1, 2)
          + '-'  + toString( date.getDate(), 2)
          + ' ' + toString( date.getHours(), 2)
          + ':'  + toString( date.getMinutes(), 2)
          + ':'  + toString( date.getSeconds(), 2)         
    ;

    return dateTimeNow;
}


  const addCall = () => {  
    if(!noteHeader){
      Alert.alert('Нет заголовка', 'Пожалуйста введите заголовок', [        
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);      
      return;
    }
    if(!noteContact){
      Alert.alert('Не указан контакт', 'Пожалуйста укажите контакт', [        
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);      
      return;
    }
    if(!noteText){
      Alert.alert('Пустая заметка', 'Пожалуйста введите текст заметки', [        
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);      
      return;
    }
    // Необходимо форматировать даты в корректном для SQLITE формате
    currDate = undefined;  
    if(!noteDate){
      currDate = currDateForDB();
      console.log(currDate);
    }
    else{
      currDate = noteDate;
    }
    if(currId != 'new'){
      // Обновление значений
      updateData('noteTalking1.db', currId, noteHeader, currDate, noteContact, toBase64(noteText), (res) => { console.log(res); });      
    }
    else{
      // Устанавливаем CurrId Для избежания двойного добавления записи
      insertInto('noteTalking1.db', noteHeader, currDate, noteContact, toBase64(noteText), (res) => { setCurrId(res.insertId); });
      navigation.setOptions({
        title: 'Редактирование',
      });     
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <TextInput
          value={noteHeader}
          placeholder='Заголовок'
          editable           
          maxLength={150}
          onChangeText={setNoteHeader}
          style={styles.valueInputStyle}>
        </TextInput>
        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>
          <TextInput
            value={noteContact}
            placeholder='Контакт'
            editable           
            maxLength={150}
            onChangeText={setNoteContact}
            style={styles.valueInputStyle}>         
          </TextInput>
          <TouchableOpacity onPress={() => showDatePicker()} style={styles.calendarStyle}>
            <Image source={!noteDate ? require( '../../assets/date.png') : require( '../../assets/datePicked.png')} style={styles.bottomButton}/>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              value={noteDate}
            />
          </TouchableOpacity>    
        </View>
      </View>  
        <ScrollView style={ styles.commonContainer}>
          <TextInput
            value={noteText}
            placeholder='Текст конспекта'
            editable
            multiline          
            maxLength={1500}
            onChangeText={setNoteText}
            style={{ fontSize: 18 }}>
          </TextInput>    
        </ScrollView>          
      <View style={styles.bottom}>
        {
          currId != 'new' ?
          <>          
            <TouchableOpacity onPress={() => addCall()}>
              <Image source={require('../../assets/update.png')} style={styles.bottomButton}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteCall()}>
              <Image source={require('../../assets/delete.png')} style={styles.bottomButton}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toView(currId)}>
              <Image source={require('../../assets/toview.png')} style={styles.bottomButton}/>
            </TouchableOpacity>         
          </> 
          : <>
            <TouchableOpacity onPress={() => addCall()}>
              <Image source={require('../../assets/add.png')} style={styles.bottomButton}/>
            </TouchableOpacity>  
          </>              
        }
      </View>    
    </SafeAreaView>
  )
}

export default edit;
