import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PokemonCard extends Component {
  state = {
    name: '',
    imagePath: '',
    pokemonIndex: '',
  };

  componentDidMount() {
    const { name, url } = this.props;
    const pokemonIndex = url.split('/')[url.split('/').length - 2];
    const imagePath = `/images/pokemon/${pokemonIndex}.png`;

    this.setState({
      name,
      imagePath,
      pokemonIndex,
    });
  }

  render() {
    return (
      <div className='col-md-3 col-sm-6 mb-5'>
        <Link className='styled-link' to={`pokemon/${this.state.pokemonIndex}`}>
          <div className='card card-effect'>
            <h5 className='card-header'>#{this.state.pokemonIndex}</h5>
            <img
              className='card-img-top rounded mx-auto d-block mt-2 sprite'
              src={this.state.imagePath}
              alt=''
            />
            <div className='card-body mx-auto'>
              <h4 className='card-title text-capitalize'>{this.state.name}</h4>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
