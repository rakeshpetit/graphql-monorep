import React, {useContext} from 'react';
import {TouchableOpacity, Text, Image} from 'react-native';
import {HomeStackContext} from './HomeStack';

const Item = ({item: {id, image, title}}) => {
  const {navigation, setDeleteItemId} = useContext(HomeStackContext);
  return (
    <TouchableOpacity
      onPress={() => {
        setDeleteItemId(id);
        navigation.navigate('DeleteItems');
      }}
      style={{flex: 0, marginTop: 20}}>
      <Text style={{flex: 0, alignItems: 'center'}}>{title}</Text>
      <Image
        style={{marginTop: 10, height: 400, width: 300, flex: 0}}
        source={{uri: image}}
      />
    </TouchableOpacity>
  );
};

export default Item;
