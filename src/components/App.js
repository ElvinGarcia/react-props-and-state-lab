import React from 'react'
import Filters from './Filters'
import PetBrowser from './PetBrowser'


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }



  changeType = (type) => {
    this.setState(
      { filters: { type: type } })
  }


  fetchPets = () => {
    const query = this.state.filters.type;
    const url  = (query === "all") ? ('/api/pets') : ('/api/pets?type=' + query)
    fetch(url)
    .then((resp) => resp.json())
      .then((json) => {
        this.setState({ pets: json })
      })
      .catch(error => { throw (error) })
    }

  onAdoptPet = (petId) => {
    const pet = this.state.pets.map(pet => {
      return petId === pet.id ? { ...pet, isAdopted: true } : pet;
    });
    this.setState({ pets: pet });
}


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeType} onFindPetsClick={this.fetchPets }/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets }/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
