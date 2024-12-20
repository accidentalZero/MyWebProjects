import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { router } from 'expo-router'
import { LogBox } from 'react-native'; //Не выводить в приложение
import { select, deleteDB, createDatabase } from './db_logic';
import styles from './Style';
import * as Sharing from 'expo-sharing';
import * as Filesystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

LogBox.ignoreLogs(['new NativeEventEmitter']);// Expo-router не обновлен до актуальной версии react native, приходится игнорировать сообщения об "ошибках"
LogBox.ignoreAllLogs(); 


const home = () => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    const exportDb = async (dbName) => {
      await Sharing.shareAsync(Filesystem.documentDirectory + 'SQLite/' + dbName);
    }

    const importDb = async (dbName) => {
      
      let result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true
      });

      if(!result.canceled){        
        
        if(!(await Filesystem.getInfoAsync(Filesystem.documentDirectory + 'SQLite')).exists){
          await FileSystem.makeDirectoryAsync(Filesystem.documentDirectory + 'SQLite');
        }

        const base64 = await Filesystem.readAsStringAsync(
          result.assets[0].uri,
          {
            encoding: Filesystem.EncodingType.Base64
          }
        );

        await Filesystem.writeAsStringAsync(Filesystem.documentDirectory + 'SQLite/' + dbName, base64, {encoding: Filesystem.EncodingType.Base64});
        await fetchData(dbName);
      }      
    }

    const fetchData = async (dbName) => {
      const val = await select(dbName, (rows) =>{
        setMasterDataSource(rows),
        setFilteredDataSource(rows),
        console.log(rows)
      });        
    };
        
    useEffect(() => {        
      fetchData('noteTalking1.db');           
    }, []);
  
    const searchFilterFunction = (text) => {    
      if (text) {      
        // Если поисковая строка не пустая, то выполняем фильтрацию
        // masterDataSource и обновляем FilteredDataSource
        const newData = masterDataSource.filter(function (item) {       
          const itemData = item.header
            ? item.header.toUpperCase()
            : ''.toUpperCase(); //Или лучше выполнять поиск по содержимому?
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setFilteredDataSource(newData);
        setSearch(text);
      } else {      
        setFilteredDataSource(masterDataSource);
        setSearch(text);
      }
    };
  
    const ItemView = ({ item }) => {
      return (      
        <View style={styles.card}>
          <View style={styles.cardContainer}>
            <View>
              <Text style={styles.cardHeader} >
                {item.header}
              </Text>
              <Text>{item.contact} от {item.date}</Text>
            </View>
            <View style={styles.cardButtonContainer}>
              <TouchableOpacity onPress={() => toEdit(item)}>
                <Image source={require('../assets/edit.png')} style={styles.cardButton}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toView(item)}>
                <Image source={require('../assets/view.png')} style={styles.cardButton}/>
              </TouchableOpacity>           
            </View>
          </View>
        </View>
      );
    };

    const toView = (item) => {        
        router.push({ pathname: `/view/${item.id}` });     
    };

    const toEdit = (item) => {        
        router.push({ pathname: `/edit/${item.id}` });     
    }; 

    const toNewEdit = async () => {
      //deleteDB('noteTalking1.db');
      createDatabase('noteTalking1.db');
      router.push({ pathname: '/edit/new'});     
    };

    const refreshScreen = async () => {
      fetchData('noteTalking1.db');
    };    

    return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <View style={{ marginLeft: 10}}>
              <Image source={require('../assets/search.png')} style={styles.bottomButton}/>
            </View>        
            <TextInput
              style={styles.textInputStyle}
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
              placeholder="Введите текст для поиска"
            />
          </View>          
          <View style={styles.commonContainer}>        
            <FlatList
              data={filteredDataSource}
              keyExtractor={(item, index) => index.toString()}
              renderItem={ItemView}
            />
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity onPress={() => refreshScreen()}>
              <Image source={require('../assets/refresh.png')} style={styles.bottomButton}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => exportDb('noteTalking1.db')}>
              <Image source={require('../assets/upload.png')} style={styles.bottomButton}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              Alert.alert('Импортировать заметки?', 'Если вы ранее выполняли экспорт - данные будут утеряны.', [
                {
                  text: 'Отмена',
                  onPress: () => {console.log('Cancel Pressed');}  
                },
                {
                  text: 'Импорт',
                  onPress: async () => { importDb('noteTalking1.db'); }
                },
              ]);
              }}>
              <Image source={require('../assets/download.png')} style={styles.bottomButton}/>
            </TouchableOpacity>         
            <TouchableOpacity onPress={() => toNewEdit()}>
              <Image source={require('../assets/add.png')} style={styles.bottomButton}/>
            </TouchableOpacity>                   
          </View> 
        </SafeAreaView>
      );
    };

export default home;