import { View, Text, SafeAreaView, TextInput, Button } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../navitagiton/AuthProvider'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Formik } from 'formik'
import * as yup from 'yup'

const ResetPasswordScreen = ({ navigation }) => {
  const { resetPassword } = useContext(AuthContext)
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Boş geçilemez')
      .email('Geçerli Bir Email Adresi Giriniz'),
  })
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <View style={{
        width: '80%',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 30
      }}>
        <Text style={{ fontSize: 24 }}>Şifre Sıfırlama</Text>
        <Formik
          validationSchema={validationSchema}
          initialValues={{ email: '' }}
          onSubmit={values => resetPassword(values.email)}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
            <>
              <TextInput
                name='email'
                placeholder='Email Adresiniz'
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
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType='email-address'
              />
              {errors.email && (<Text style={{ color: '#f00', fontSize: 13 }}>{errors.email}</Text>)}

              <View style={{ width: '50%', }}>
                <Button
                  color='#f00'
                  onPress={handleSubmit}
                  disabled={!isValid}
                  title='Sıfırla'
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  )
}

export default ResetPasswordScreen