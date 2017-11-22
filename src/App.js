import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foods: [],
    }
  }

  componentDidMount() {

    fetch('https://murraywilliams.co.za/eatz/wp-json/wp/v2/food')
      .then(res => res.json())
      .then(res => {
        this.setState({
          foods: res
        })
      });
  }

  render() {

    let foods = this.state.foods.map((food, index) => {
      return <div key={index}>
        <h3>{food.title.rendered}</h3>
        <p>{food.acf.desc}</p>
        <img width="120px" src={food.acf.image} />
      </div>
    });
    return (
      <div className="App">
      <h1>Foods</h1>
      {foods}
      </div>
    );
  }
}

export default App;
