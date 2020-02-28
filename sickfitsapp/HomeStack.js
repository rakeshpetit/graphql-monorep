import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import DeleteItem from './DeleteItem';

const Stack = createStackNavigator();
export const HomeStackContext = React.createContext();

const HomeStack = () => {
    const [deleteItemId, setDeleteItemId ] = useState(20)
    return (
        <HomeStackContext.Provider value={{ setDeleteItemId }}>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="DeleteItems">
                {props => <DeleteItem {...props} deleteItemId={deleteItemId} />}
            </Stack.Screen>
        </Stack.Navigator>
        </HomeStackContext.Provider>
    )
}

export default HomeStack
