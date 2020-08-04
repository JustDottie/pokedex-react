import React, { Component } from 'react';
import axios from 'axios';

const TYPE_COLORS = {
  bug: 'A8B820',
  dark: '705848',
  dragon: '7038F8',
  electric: 'F8D030',
  fairy: 'EE99AC',
  fighting: 'C03028',
  fire: 'F08030',
  flying: 'A890F0',
  ghost: '705898',
  grass: '78C850',
  ground: 'E0C068',
  ice: '98D8D8',
  normal: 'A8A878',
  poison: 'A040A0',
  psychic: 'F85888',
  rock: 'B8A038',
  steel: 'B8B8D0',
  water: '6890F0',
};

export default class Pokemon extends Component {
  state = {
    name: '',
    pokemonIndex: '',
    imageUrl: '',
    types: [],
    description: '',
    stats: {
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      specialAttack: '',
      specialDefense: '',
    },
    height: '',
    weight: '',
    eggGroup: '',
    abilities: '',
    genderRatioMale: '',
    genderRatioFemale: '',
    evs: '',
    hatchSteps: '',
  };

  async componentDidMount() {
    const { pokemonIndex } = this.props.match.params;

    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    const pokemonRes = await axios.get(pokemonUrl);

    const name = pokemonRes.data.name;

    const imageUrl = `/images/pokemon/${pokemonIndex}.png`;
    console.log(pokemonIndex, name, imageUrl);

    let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

    pokemonRes.data.stats.map((stat) => {
      switch (stat.stat.name) {
        case 'hp':
          hp = stat['base_stat'];
          break;
        case 'attack':
          attack = stat['base_stat'];
          break;
        case 'defense':
          defense = stat['base_stat'];
          break;
        case 'speed':
          speed = stat['base_stat'];
          break;
        case 'special-attack':
          specialAttack = stat['base_stat'];
          break;
        case 'special-defense':
          specialDefense = stat['base_stat'];
          break;
        default:
          break;
      }
      return null;
    });

    const height = pokemonRes.data.height * 10;
    const weight = pokemonRes.data.weight / 10;

    const types = pokemonRes.data.types.map((type) => type.type.name);

    const abilities = pokemonRes.data.abilities.map((ability) => {
      return ability.ability.name;
    });

    const evs = pokemonRes.data.stats
      .filter((stat) => stat.effort > 0)
      .map((stat) =>
        `${stat.effort} ${stat.stat.name}`
          .toLowerCase()
          .split('-')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')
      )
      .join(', ');

    await axios.get(pokemonSpeciesUrl).then((res) => {
      let description = '';
      res.data.flavor_text_entries.some((flavor) => {
        if (flavor.language.name === 'en') {
          description = flavor.flavor_text;
        }
        return null;
      });
      const femaleRate = res.data['gender_rate'];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);

      const catchRate = Math.round((100 / 255) * res.data['capture_rate']);

      const eggGroups = res.data['egg_groups']
        .map((group) => {
          return group.name;
        })
        .join(', ');

      const hatchSteps = 255 * (res.data['hatch_counter'] + 1);

      this.setState({
        description,
        genderRatioFemale,
        genderRatioMale,
        catchRate,
        eggGroups,
        hatchSteps,
      });
    });

    this.setState({
      imageUrl,
      pokemonIndex,
      name,
      types,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense,
      },
      height,
      weight,
      abilities,
      evs,
    });
  }

  render() {
    return (
      <div className='col'>
        <div className='card single-card'>
          <div className='card-header'>
            <div className='row'>
              <div className='col-5'>
                <h5>#{this.state.pokemonIndex}</h5>
              </div>
              <div className='col-7'>
                <div className='float-right types'>
                  {this.state.types.map((type) => (
                    <span
                      key={type}
                      className='text-capitalize badge badge-primary badge-pill mr-1'
                      style={{
                        backgroundColor: `#${TYPE_COLORS[type]}`,
                        color: 'white',
                      }}>
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='card-body'>
            <div className='row align-items-center'>
              <div className='col-md-3'>
                <img
                  src={this.state.imageUrl}
                  alt='imageUrl'
                  className='card-img-top rounded mx-auto mt-2'
                />
              </div>
              <div className='col-md-9'>
                <h2 className='mx-auto text-capitalize'>{this.state.name}</h2>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3 stat-name'>HP</div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                      <div
                        className='progress-bar'
                        style={{
                          width: `${this.state.stats.hp}%`,
                          backgroundColor: 'red',
                          color: 'black',
                        }}
                        aria-valuemin='0'
                        aria-valuemax='100'>
                        <small>{this.state.stats.hp}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3 stat-name'>Attack</div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                      <div
                        className='progress-bar'
                        style={{
                          width: `${this.state.stats.attack}%`,
                          backgroundColor: 'orange',
                          color: 'black',
                        }}
                        aria-valuemin='0'
                        aria-valuemax='100'>
                        <small>{this.state.stats.attack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3 stat-name'>Defense</div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                      <div
                        className='progress-bar'
                        style={{
                          width: `${this.state.stats.defense}%`,
                          backgroundColor: 'yellow',
                          color: 'black',
                        }}
                        aria-valuemin='0'
                        aria-valuemax='100'>
                        <small>{this.state.stats.defense}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3 stat-name'>Speed</div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                      <div
                        className='progress-bar'
                        style={{
                          width: `${this.state.stats.speed}%`,
                          backgroundColor: 'pink',
                          color: 'black',
                        }}
                        aria-valuemin='0'
                        aria-valuemax='100'>
                        <small>{this.state.stats.speed}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3 stat-name'>Sp. Attack</div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                      <div
                        className='progress-bar'
                        style={{
                          width: `${this.state.stats.specialAttack}%`,
                          backgroundColor: 'aqua',
                          color: 'black',
                        }}
                        aria-valuemin='0'
                        aria-valuemax='100'>
                        <small>{this.state.stats.specialAttack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3 stat-name'>Sp. Defense</div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                      <div
                        className='progress-bar'
                        style={{
                          width: `${this.state.stats.specialDefense}%`,
                          backgroundColor: 'green',
                          color: 'black',
                        }}
                        aria-valuemin='0'
                        aria-valuemax='100'>
                        <small>{this.state.stats.specialDefense}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mt-1'>
                <div className='col'>
                  <p className='p-2'>{this.state.description}</p>
                </div>
              </div>
            </div>
            <hr />
            <div className='card-body'>
              <h4 className='card-title text-center'>Profile</h4>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='row'>
                    <div className='col-md-5'>
                      <h6 className='float-right'>Height: </h6>
                    </div>
                    <div className='col-md-7'>
                      <h6 className='float-left'>{this.state.height} cm</h6>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-5'>
                      <h6 className='float-right'>Weight: </h6>
                    </div>
                    <div className='col-md-7'>
                      <h6 className='float-left'>{this.state.weight} kg</h6>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-5'>
                      <h6 className='float-right'>Gender Ratio: </h6>
                    </div>
                    <div className='col-md-7'>
                      <div className='progress'>
                        <div
                          className='progress-bar'
                          role='progressbar'
                          style={{
                            width: `${this.state.genderRatioFemale}%`,
                            backgroundColor: '#C2185B',
                          }}
                          aria-valuemin='0'
                          aria-valuemax='100'>
                          {this.state.genderRatioFemale}
                        </div>
                        <div
                          className='progress-bar'
                          role='progressbar'
                          style={{
                            width: `${this.state.genderRatioMale}%`,
                            backgroundColor: '#1976D2',
                          }}
                          aria-valuemin='0'
                          aria-valuemax='100'>
                          {this.state.genderRatioMale}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-5'>
                      <h6 className='float-right'>Catch Rate: </h6>
                    </div>
                    <div className='col-md-7'>
                      <h6 className='float-left'>{this.state.catchRate}%</h6>
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='row'>
                    <div className='col-md-5'>
                      <h6 className='float-right'>Egg Groups:</h6>
                    </div>
                    <div className='col-md-7'>
                      <h6 className='float-left text-capitalize'>
                        {this.state.eggGroups}
                      </h6>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-5'>
                      <h6 className='float-right'>Hatch Steps: </h6>
                    </div>
                    <div className='col-md-7'>
                      <h6 className='float-left'>{this.state.hatchSteps}</h6>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-5'>
                      <h6 className='float-right'>Abilities: </h6>
                    </div>
                    <div className='col-md-7'>
                      <h6 className='float-left text-capitalize'>
                        {this.state.abilities.split}
                      </h6>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-5'>
                      <h6 className='float-right'>EVs: </h6>
                    </div>
                    <div className='col-md-7'>
                      <h6 className='float-left text-capitalize'>
                        {this.state.evs}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
