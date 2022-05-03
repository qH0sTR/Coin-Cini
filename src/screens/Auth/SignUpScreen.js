import { View, Text, SafeAreaView, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import { AuthContext } from '../../navitagiton/AuthProvider'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Formik } from 'formik'
import * as yup from 'yup'

const SignUpScreen = ({ navigation }) => {
  const [isSecurePass, setIsSecurePass] = useState(true)
  const { signUp } = useContext(AuthContext)
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Boş geçilemez')
      .min(3, ({min}) => 'Adınız en az ' + min + ' karakterden oluşmalıdır.'),
    phone: yup
      .string()
      .required('Boş geçilemez')
      .min(10, ({min}) => 'Telefon numaranız ' + min + ' karakterden oluşmalıdır.'),
    email: yup
      .string()
      .required('Boş geçilemez')
      .email('Geçerli Bir Email Adresi Giriniz'),
    password: yup
      .string()
      .required('Boş Geçilemez')
      .min(6, ({ min }) => 'Şifreniz en az ' + min + 'karakterden oluşmalıdır')
      .matches(/\w*[a-z]\w*/, 'En az 1 adet küçük harf kullanmalısınız')
      .matches(/\w*[A-Z]\w*/, 'En az 1 adet büyük harf kullanmalısınız')
      .matches(/\d/, 'En az 1 adet rakam kullanmalısınız')
      .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, 'En az 1 tane özel karakter kullanmalısınız'),
    passwordConfirm: yup
      .string()
      .required('Boş Geçilemez')
      .oneOf([yup.ref('password')], 'Şifreler uyumsuz')
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
        <Text style={{ fontSize: 24 }}>Üye Kayıt</Text>
        <Formik
          validationSchema={validationSchema}
          initialValues={{ email: '', password: '', passwordConfirm: '', name: '' }}
          onSubmit={values => signUp(values.email, values.password, values.name, values.phone, navigation)}>
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
              <TextInput
                name='phone'
                placeholder='Telefon Numaranız (5** *** ** **)'
                maxLength={10}
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
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                keyboardType='number-pad'
              />
              {errors.phone && (<Text style={{ color: '#f00', fontSize: 13 }}>{errors.phone}</Text>)}
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
              <View style={{
                width: '90%',
                borderColor: '#000',
                borderWidth: 1,
                borderRadius: 10,
                margin: 10,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 5,
                justifyContent: 'space-between',
              }}>
                <TextInput
                  name='password'
                  placeholder='Şifreniz'
                  style={{
                    height: 50,
                    borderWidth: 0,
                    fontSize: 14
                  }}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={isSecurePass}
                />
                <TouchableOpacity onPress={() => setIsSecurePass(!isSecurePass)}>
                  <Icon name={isSecurePass ? 'eye-slash' : 'eye'} size={20} color='#aaa' style={{ marginRight: 10 }} />
                </TouchableOpacity>
              </View>
              {errors.password && (<Text style={{ color: '#f00', fontSize: 13 }}>{errors.password}</Text>)}
              <TextInput
                name='passwordConfirm'
                placeholder='Şifreniz (Tekrar)'
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
                onChangeText={handleChange('passwordConfirm')}
                onBlur={handleBlur('passwordConfirm')}
                value={values.passwordConfirm}
                secureTextEntry={isSecurePass}
              />
              {errors.passwordConfirm && (<Text style={{ color: '#f00', fontSize: 13 }}>{errors.passwordConfirm}</Text>)}
              <View style={{ width: '50%', }}>
                <Button
                  color='#f00'
                  onPress={handleSubmit}
                  disabled={!isValid}
                  title='Kaydet'
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  )
}

export default SignUpScreen