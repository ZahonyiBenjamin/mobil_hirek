import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Linking } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {
  const [adatok, setAdatok] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState();

  const letoltes = async(nyelv)=>
  {
    const x = await fetch(`https://newsapi.org/v2/top-headlines?country=${nyelv}&category=business&apiKey=3896d67f06394c548239d21610ab6841`)
    const y = await x.json()
    setAdatok(y.articles)
    //alert(JSON.stringify(y))
  }

  const valtoztat = (nyelv)=>
  {
    setSelectedLanguage(nyelv)
    letoltes(nyelv)
    //alert(nyelv)
  }

  useEffect(()=>{
    letoltes("us")
  }, [])

  return (
    <View style={styles.container}>
    
    <Picker
      style={styles.lista}
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) =>
        valtoztat(itemValue)
      }>
      <Picker.Item label="English" value="us" />
      <Picker.Item label="Hungarian" value="hu" />
    </Picker>

      <FlatList
        data={adatok}
        renderItem={({item}) => 
          <View style={styles.doboz}>
            <Image source={{uri:item.urlToImage}} style={{width: 200, height: 200, marginHorizontal: "auto"}}></Image>
            <Text style={styles.cim}>{item.title}</Text>
            <Text style={styles.leiras}>{item.description}</Text>
            <Text style={styles.tartalom}>{item.content}</Text>
            <Text style={styles.datum}>{item.publishedAt.split('T')[0]} {item.publishedAt.split('T')[1].split('Z')[0]}</Text>
            <Text style={styles.forras}>{item.source.name}</Text>

            <TouchableOpacity style={styles.button} onPress={()=>Linking.openURL(item.url)}>
              <Text style={{color: 'white'}}>Olvass tovább...</Text>
            </TouchableOpacity>
          </View>
        }
        keyExtractor={item => item.title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkblue',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  cim:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  leiras:{
    color: '#b3b3ff',
    fontSize: 14,
    textAlign: 'justify',
    marginBottom: 10
  },
  tartalom:{
    color: '#8080ff',
    fontSize: 14,
    textAlign: 'justify',
    marginBottom: 10
  },
  datum:{
    color: '#4545ff',
    fontStyle: 'italic',
    fontSize: 14,
    marginBottom: 10
  },
  forras:{
    color: 'darkred',
    fontStyle: 'italic',
    fontSize: 14,
    marginBottom: 20
  },
  doboz:{
    borderBottomColor: '#4545ff',
    borderBottomWidth: 5,
    marginBottom: 30,
  },
  button:
  {
    backgroundColor: 'blue',
    marginHorizontal: 'auto',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  lista:
  {
    color: 'blue',
    backgroundColor: 'white',
    width: 300,
    marginVertical: 20,
  }
});
