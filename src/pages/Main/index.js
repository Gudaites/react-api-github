/* eslint-disable react/destructuring-assignment */

/* eslint-disable react/state-in-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

import { FaGithubAlt, FaPlus } from 'react-icons/fa';

import api from '../../servives/api';

import { Container, Form, SubmitButton } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
  };

  handleInputChange = (e) => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { newRepo, repositories } = this.state;

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
    });
  };

  render() {
    const { newRepo } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositorio"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton disable>
            <FaPlus color="#fff" size={14} />
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}
