import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';

const CURRENT_USER_QUERY = gql
`query {
    me {
        id
        email
        name
        permissions
        }
  }`;

const User = (props) => {
    return (
        <Query {...props} query={CURRENT_USER_QUERY}>
            {payload => props.children(payload)}
        </Query>
    )
}


export { CURRENT_USER_QUERY }
export default User;
