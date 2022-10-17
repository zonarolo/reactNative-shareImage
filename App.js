import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import * as ImageManipulator from 'expo-image-manipulator';


const App = () => {

  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Please select a media library permission.')
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled) {
      return;
    }

    setSelectedImage({
      localUri: pickerResult.uri
    })
  }

  const openSharingDialogAsync = async () => {
    const isAvailable = await Sharing.isAvailableAsync();

    if (!isAvailable) {
      alert('Sharing is not available in your platform.');
      return;
    }

    const image = await ImageManipulator.manipulateAsync(selectedImage.localUri);

    if (!image) {
      alert('No image available.');
    }

    await Sharing.shareAsync(image.uri)
  }

  return (
    <View style={style.container}>
      <Text style={style.title}>Hello World!!!</Text>
      <TouchableOpacity onPress={openImagePickerAsync}>
        <Image
          source={{uri: selectedImage !== null
            ? selectedImage.localUri : 'https://picsum.photos/200/200'
          }}
          style={style.image}
        />
      </TouchableOpacity>
      {selectedImage ? <TouchableOpacity style={style.button} onPress={openSharingDialogAsync}>
        <Text style={style.buttonText}>Share</Text>
      </TouchableOpacity> : null}
      
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292929'
  },
  title: {
    fontSize: 25,
    color: 'white',
    margin: 10
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 20,
    resizeMode: 'contain'
  },
  button: {
    backgroundColor: 'gray',
    padding: 15,
    margin: 10,
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 15
  }
})

export default App;