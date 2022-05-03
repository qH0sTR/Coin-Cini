import { View, Text, Button, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../navitagiton/AuthProvider'
import Loading from '../../utils/Loading'
import { ScrollView } from 'react-native-gesture-handler'

const PiyasaScreen = () => {
    const { signOut, user } = useContext(AuthContext)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const ItemSeparatorComponent = () => {
        return (
            <View style={{
                margin: 5,
                height: 1,
                width: '100%',
                backgroundColor: '#ccc'
            }}>
            </View>
        )
    }
    const renderItem = ({ item, index }) => {
        <TouchableOpacity style={{
            flexDirection: 'row',
            width: '90%',
            height: 60,
            borderColor: 'red',
            borderWidth: 1,
            margin: 10,
            borderRadius: 20,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
        }}>

        </TouchableOpacity>
    }
    const getData = async () => {
        try {
            setIsLoading(true)
            let response = await fetch('https://www.paribu.com/ticker')
            let responseData = await response.json()
            setData(responseData)
            setIsLoading(false)
        } catch (error) {
            alert(error)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getData()
        console.log('selam')
        console.log(data)
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, }}>
            {isLoading ? (<Loading />) : (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style= {{margin: 10}}>
                        <Text style={{ fontSize: 32, color: '#f00' }}>Piyasalar</Text>
                    </View>
                    <ScrollView style={{
                        flex: 1,
                        width: '100%',
                    }}>
                        {Object.keys(data).map((key, index) => (
                            <TouchableOpacity
                                key={index.toString()}
                                style={{
                                    flexDirection: 'row',
                                    width: '95%',
                                    height: 60,
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    margin: 10,
                                    padding: 10,
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ textAlign: 'left', fontSize: 18 }}>{key}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ textAlign: 'right', fontSize: 18 }}>{data[key].last}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{
                                        textAlign: 'right',
                                        fontSize: 18,
                                        color: (data[key].percentChange > 0) ? '#0f0' :
                                            (data[key].percentChange < 0) ? '#f00' : '#000',
                                    }}>{data[key].percentChange}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </SafeAreaView>
    )
}

export default PiyasaScreen