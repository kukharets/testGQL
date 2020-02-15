import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { graphql } from 'react-apollo';
import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
const COMMENTS_SUBSCRIPTION = gql`
  subscription {
      betAdded {
        id,
        time
      }
}
`;
function DontReadTheComments({ }) {
    const { data: {betAdded} = {}, loading } = useSubscription(
        COMMENTS_SUBSCRIPTION
    );
    console.log(betAdded)
    return <h4>New comment: {!loading && betAdded.time}</h4>;
}

export default DontReadTheComments;