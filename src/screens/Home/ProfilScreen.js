import { View, Text, Button, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Image, ImageBackground, TextInput, Modal, ActivityIndicator } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../navitagiton/AuthProvider'
import firestore from '@react-native-firebase/firestore'
import { Formik } from 'formik'
import * as yup from 'yup'
import Loading from '../../utils/Loading'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconAnt from 'react-native-vector-icons/AntDesign'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'

const ProfilScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [downloadURL, setDownloadURL] = useState(false)
  const [uploadTask, setUploadTask] = useState()
  const [uploadTaskSnapshot, setUploadTaskSnapshot] = useState({})
  const { signOut, user } = useContext(AuthContext)
  const [currentUser, setCurrentUser] = useState({})
  const [showModal, setShowModal] = useState(false)

  const usersColl = firestore().collection('users')
  const updateCurrentUser = async (name) => {
    setIsLoading(true);
    await usersColl.doc(user.uid).update({
      Name: name,
    })
    await user.updateProfile({
      displayName: name
    })
    setCurrentUser({
      currentUser,
      Name: 'name'
    })
    setIsLoading(false);
  }

  const getCurrentUser = async () => {
    usersColl.doc(user.uid)
      .get()
      .then(result => {
        setCurrentUser(result.data())
      })
  }

  useEffect(() => {
    setIsLoading(true);
    getCurrentUser()
    setIsLoading(false)
  }, [])

  const onMediaSelect = async media => {
    if (!media.didCancel) {
      setIsUploading(true)
      const ref = storage().ref("Uploads/Users/" + media.assets[0].fileName)
      const task = ref.putFile(media.assets[0].uri)
      setUploadTask(task)
      task.on('state_changed', (uploadTask) => {
        setUploadTaskSnapshot(uploadTask)
      })

      task.then(async () => {
        const downloadURL = await ref.getDownloadURL()
        setDownloadURL(downloadURL)
        await usersColl.doc(user.uid).update({
          ImageUrl: downloadURL
        })
        getCurrentUser()
        setIsUploading(false)
        setUploadTaskSnapshot({})
        setShowModal(false)
      })
    }
  }

  const onTakePhoto = () => {
    launchCamera({
      mediaType: 'photo'
    }, onMediaSelect)
  }


  const onSelectImagePress = () => {
    launchImageLibrary({
      mediaType: 'photo'
    }, onMediaSelect)
  }

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Boş geçilemez')
      .min(3, ({ min }) => 'Adınız en az ' + min + ' karakterden oluşmalıdır.')
  })

  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {isLoading ? (<Loading />) :
        (

          <View style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Modal
              animationType='slide'
              transparent={false}
              visible={showModal}
              onRequestClose={() => {
                alert(2)
              }}>
              <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#eee',
                padding: 10,
                margin: 20
              }}>
                <TouchableOpacity
                  onPress={onTakePhoto}
                  style={{
                    marginBottom: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: '#000',
                    width: '80%'
                  }}>
                  <Text style={{ fontSize: 20 }}>Fotoğraf Çek</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={onSelectImagePress}
                  style={{
                    marginBottom: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: '#000',
                    width: '80%'
                  }}>
                  <Text style={{ fontSize: 20 }}>Kütüphaneden Seç</Text>
                </TouchableOpacity>
                {isUploading && (
                  <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 50,
                    marginBottom: 20
                  }}>
                    <ActivityIndicator
                      size={50}
                      color='#f00'
                    />
                    <Text style={{ fontSize: 20, margin: 20 }}>Uploading..</Text>
                    <Text style={{ fontSize: 20, margin: 20 }}>
                      {((uploadTaskSnapshot.bytesTransferred / uploadTaskSnapshot.totalByte) * 100).toFixed(2)
                        + " / 100"}
                    </Text>
                  </View>
                )}
                <Button
                  title='Kapat'
                  onPress={() => setShowModal(!showModal)}
                />
              </View>
            </Modal>
            <TouchableOpacity
              onPress={() => setShowModal(!showModal)}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: '#f00',
                margin: 10,
              }}>
              <ImageBackground
                source={{ uri: currentUser.ImageUrl }}
                imageStyle={{
                  borderRadius: 40
                }}
                style={{
                  resizeMode: 'cover',
                  flex: 1,
                }}
              />
              <View style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                backgroundColor: '#000',
                position: 'absolute',
                bottom: 0,
                right: 0,
                borderWidth: 2,
                borderColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon
                  name='camera'
                  size={12}
                  color='#fff'
                />
              </View>
            </TouchableOpacity>
            <Text style={{ fontSize: 28, }}>Profil İçerik2 {currentUser.Name}</Text>

            <Formik
              enableReinitialize
              validationSchema={validationSchema}
              initialValues={{ name: currentUser.Name }}
              onSubmit={values => updateCurrentUser(values.name)}>
              {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                <>
                  <TextInput
                    name='name'
                    placeholder='Adınız'
                    style={{
                      height: 50,
                      width: '90%',
                      margin: 10,
                      padding: 10,
                      borderColor: '#000',
                      borderWidth: 1,
                      borderRadius: 10,
                      fontSize: 14
                    }}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    keyboardType='email-address'
                  />
                  {errors.name && (<Text style={{ color: '#f00', fontSize: 13 }}>{errors.name}</Text>)}

                  <View style={{ width: '50%', }}>
                    <Button
                      color='#f00'
                      onPress={handleSubmit}
                      disabled={!isValid}
                      title='Güncelle'
                    />
                  </View>
                </>
              )}
            </Formik>
            <TouchableOpacity
              onPress={signOut}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 30,
                right: 30
              }}>
              <IconAnt
                name='logout'
                size= {32}
                color= '#f00'
              />
            </TouchableOpacity>
          </View>
        )}
    </SafeAreaView>
  )
}

export default ProfilScreen