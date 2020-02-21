import React from 'react';
import {SafeAreaView, Text, ScrollView} from 'react-native';
import {AppContext} from './App';
import Item from './Item';

const Items = ({data}) => {
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          flex: 0,
          alignItems: 'center',
        }}>
        <Text>Items</Text>
        {data.items.length > 0 &&
          data.items.map(item => <Item key={item.id} item={item} />)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Items;
