import { View, Text, Button, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../navitagiton/AuthProvider'
import { deviceHeight, deviceWidth } from '../../utils/Dimensions'
import firestore from '@react-native-firebase/firestore'
import Loading from '../../utils/Loading'

const HomeScreen = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { signOut, user } = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState({})
    const [userCoinList, setUserCoinList] = useState([])
    const [coinList, setCoinList] = useState([])

    const usersColl = firestore().collection('users')
    const coinsColl = firestore().collection('coins')
    const userCoinsColl = firestore().collection('userCoins')

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                key={item.id}
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
                    <Text style={{ textAlign: 'left', fontSize: 18, color: '#000' }}>{
                        item.coinName
                    }</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: 'right', fontSize: 18 }}>{item.value}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        setIsLoading(true);
        usersColl
            .get()
            .then(result => {
                setCurrentUser(result.docs[0].data())

                userCoinsColl.onSnapshot((querySnapshot) => {
                    let list = []
                    querySnapshot.forEach(doc => {
                        const { userID, coinID, value } = doc.data()
                        if (userID == user.uid) {
                            list.push({
                                id: doc.id,
                                userID,
                                coinID,
                                value
                            })
                        }
                    })
                    coinsColl.get().then(result => {
                        result.docs.forEach((coin, i) => {
                            list[i].coinName = coin.data().name
                        })
                    })
                    setUserCoinList(list)
                })

                coinsColl.onSnapshot((querySnapshot) => {
                    let list = []
                    querySnapshot.forEach(doc => {
                        const { name } = doc.data()
                        list.push({
                            id: doc.id,
                            coinName: name
                        })
                    })

                    setCoinList(list)
                })
            })
            setIsLoading(false)
            
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {isLoading ? (<Loading />) :
                (
                    <View style= {{flex:1, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                        <View style={{
                            margin: 20,
                            padding: 20,
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 5,
                            width: deviceWidth / 2,
                            height: deviceWidth / 2,
                            borderRadius: deviceWidth / 4
                        }}>
                            <Text>Merhaba</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
                                {user.displayName}
                            </Text>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>
                                    {currentUser.TRY}
                                </Text>
                                <View style={{ justifyContent: 'flex-end', marginBottom: 6, marginLeft: 5 }}><Text>TL</Text></View>
                            </View>
                        </View>

                        <View style={{ flex: 3, width: '90%' }}>
                            <FlatList
                                style={{ flex: 1, }}
                                data={userCoinList}
                                keyExtractor={item => item.id}
                                renderItem={renderItem}
                            />
                        </View>
                    </View>
                )}
        </SafeAreaView>
    )
}

export default HomeScreen