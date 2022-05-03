import { View, Text, Button } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../navitagiton/AuthProvider'

const AlSatScreen = () => {
    const { signOut, user } = useContext(AuthContext)
    return (
        <View>
            <Text>AlSatScreen</Text>
            <View style={{ width: '50%', }}>
                
            </View>
        </View>
    )
}

export default AlSatScreen