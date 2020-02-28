import React from 'react'
import { View, Text } from 'react-native'

const DeleteItem = ({ deleteItemId }) => {
    console.log('deleteItemId', deleteItemId)
    return (
        <View>
            <Text>DeleteItem</Text>
        </View>
    )
}

export default DeleteItem
