/*import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';


export default function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <View style={styles.center}><Text>Cargando...</Text></View>
  }
  return (
    <View style={styles.container}>
      <FlatList 
        data={users}
        renderItem={ ({item}) => <Text style={styles.item}>{item.name}</Text>}
        keyExtractor={item => String(item.id)}
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
  center:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 22,
    height: 50,
    borderBottomColor: '#666',
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: 22,
  },
});


*/

/* Interactuar con el usuario */

import React, { useState, useEffect } from 'react';
import { StyleSheet, View , Text, Button} from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { Camera } from 'expo-camera'

export default function App() {
  const [permisos, setPermisos] = useState(null)
  const [tipo, setTipo] = useState(Camera.Constants.Type.back)

  const getPermisos = async () => {
    const {status} = await Camera.requestPermissionsAsync()
    setPermisos(status == 'granted')
    console.log(status)
  }

  useEffect(() => {
    getPermisos()
  })

  if(permisos === null){
    return <View><Text>Esperando permisos...</Text></View>
  }
  if (permisos === false){
    return <View><Text>No tenemos acceso a la cámara :(</Text></View>
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={tipo}>
        <Button title='Beto es gay' onPress={() => {
            const {front, back} = Camera.Constants.Type
            const nuevoTipo = tipo === back ? front : back
            setTipo(nuevoTipo)
          }} 
        />
      </Camera>
    </View>
  )
}



const styles = StyleSheet.create({
  camera:{
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: 22,
  },
});