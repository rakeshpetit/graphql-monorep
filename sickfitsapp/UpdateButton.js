import React, {useContext} from 'react';
import {View, Button} from 'react-native';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {ALL_ITEMS_QUERY} from './Home';
import {HomeStackContext} from './HomeStack';

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

const UpdateButton = ({deleteItemId}) => {
  const {navigation} = useContext(HomeStackContext);
  const update = (cache, {data: {item}}) => {
    navigation.navigate('Home');
  };
  return (
    <Mutation
      mutation={UPDATE_ITEM_MUTATION}
      variables={{id: deleteItemId}}
      update={update}
      refetchQueries={() => {
        // console.log("refetchQueries", product.id)
        return [
          {
            query: ALL_ITEMS_QUERY,
          },
        ];
      }}>
      {(deleteItem, {error}) => (
        <Button
          title="Update"
          onPress={() => {
            deleteItem();
          }}
        />
      )}
    </Mutation>
  );
};

export default UpdateButton;
