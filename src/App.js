import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foods: [],
      order: [],
    }
  }

  componentDidMount() {
    let newRes;
    fetch('https://murraywilliams.co.za/eatz/wp-json/wp/v2/food')
      .then(res => res.json())
      .then(res => {
        newRes = res.map((data) => {
          return ({
            id: data.id,
            name: data.title.rendered,
            desc: data.acf.desc,
            price: data.acf.price,
            image: data.acf.image,
          })
        })
        this.setState ({
          foods: newRes
        });
      })
      console.log(newRes);
  }

  render() {

    let foods = this.state.foods.map((food, index) => {
      return <div key={index}>
        <h3>{food.name}</h3>
        <p><i>R{food.price}.00</i></p>
        <p>{food.desc}</p>
        <img width="120px" src={food.image} />
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
