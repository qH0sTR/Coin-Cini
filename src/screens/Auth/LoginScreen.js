import { View, Text, SafeAreaView, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../navitagiton/AuthProvider'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Formik } from 'formik'
import * as yup from 'yup'

const LoginScreen = ({ navigation }) => {
    const [isSecurePass, setIsSecurePass] = useState(true)
    const { login } = useContext(AuthContext)
    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .required('Boş geçilemez')
            .email('Geçerli Bir Email Adresi Giriniz'),
        password: yup
            .string()
            .required('Boş Geçilemez')
            .min(6, ({ min }) => 'Şifreniz en az ' + min + 'karakterden oluşmalıdır')
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
                <Text style={{ fontSize: 24 }}>Üye Girişi</Text>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={{ email: '', password: '' }}
                    onSubmit={values => login(values.email, values.password)}>
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
                            <View style={{ width: '50%', }}>
                                <Button
                                    color='#f00'
                                    onPress={handleSubmit}
                                    disabled={!isValid}
                                    title='Giriş'
                                />
                            </View>
                        </>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen