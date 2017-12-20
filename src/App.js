import React, { Component } from 'react';
import './App.css';
import Menu from './Menu'
import Order from './Order'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foods: [],
      order: [],
      loaded:false
    }
    this.handleAddOrder = this.handleAddOrder.bind(this);
    this.handleDeleteOrder = this.handleDeleteOrder.bind(this);
  }

  componentDidMount() {
    let newRes;

    this.setState({
      loaded:false
    })
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
          foods: newRes,
          loaded:true
        });
      })
    }

    handleAddOrder(index) {
      const name = this.state.foods[index].name;
      const price = this.state.foods[index].price;

      // uses new React updater function
      this.setState(prevState => ({
        order: [...prevState.order, {name: name, price: price}]
      }));

    }

    handleDeleteOrder(index) {

      this.setState(prevState => ({
          order: prevState.order.filter((_,i)  => i !== index)
      }))

    }

  render() {

    if(this.state.loaded){
      return (
        <div className="App">
        <h1>EATZAMORE <span>version Alpha 0.1</span></h1>
        <Menu foods={this.state.foods} addOrder={this.handleAddOrder}/>
        <Order order={this.state.order} deleteOrder={this.handleDeleteOrder}/>
        </div>
      );
    }
    else {
      return "loading..."
    }
  }
}

export default App;
