import React from 'react';
import {View, Text, Image} from 'react-native';

const Item = ({item: {id, image, title}}) => {
  // console.log('item', item)
  return (
    <View style={{flex: 0, marginTop: 20}}>
      <Text>{title}</Text>
      <Image style={{height: 400, width: 200, flex: 0}} source={{uri: image}} />
    </View>
  );
};

export default Item;
