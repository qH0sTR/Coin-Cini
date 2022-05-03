import { View, Text } from 'react-native'
import React from 'react'
import { AuthProvider } from './navitagiton/AuthProvider'
import Routes from './navitagiton/Routes'
const App = () => {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    )
}

export default App