import React, { Component } from 'react';
import './App.css';
import Menu from './Menu'
import Order from './Order'
import WPAPI from 'wpapi';

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

    //Add CRUD operations to the REST API
    this.wp = new WPAPI({
      endpoint: 'https://murraywilliams.co.za/eatz/wp-json',
      username: 'adm',
      password: 'voBFt^Xm8&E&wx^BPM' });

    this.wp.orders = this.wp.registerRoute( 'wp/v2', '/orders/' );

    //fetch all the food items from the Wordpress REST API
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

    //The below adds the order list into the WP database via the REST API
    handleConfirmOrder = () => {

      this.wp.orders().create({
        // "title" and "content" are the only required properties
        title: 'Ord#201',
        fields: {
            orders: this.state.order
          // orders:[
          //   {
          //     food_item: "product name",
          //     price: 255,
          //   },
          //   {
          //     food_item: "product name",
          //     price: 255,
          //   }
          // ]
        },
        // Post will be created as a draft by default if a specific "status"
        // is not specified
        status: 'publish'
      }).then(function( response ) {
          // "response" will hold all properties of your newly-created post,
          // including the unique `id` the post was assigned on creation
          console.log( response.id );
          alert('Order has been sent!');
      })
    }

    // add an item to the order list
    handleAddOrder(index) {
      const name = this.state.foods[index].name;
      const price = this.state.foods[index].price;
      console.log(this.state);
      // uses new React updater function
      this.setState(prevState => ({
        order: [...prevState.order, {name: name, price: price}]
      }));

    }

    //Delete an item from the order list
    handleDeleteOrder(index) {

      this.setState(prevState => ({
          order: prevState.order.filter((_,i)  => i !== index)
      }))

    }

  render() {

    if(this.state.loaded){
      return (
        <div className="App">
        <h1>EATZAMORE version Alpha 0.1</h1>
        <Menu foods={this.state.foods} addOrder={this.handleAddOrder}/>
        <Order order={this.state.order} deleteOrder={this.handleDeleteOrder}/>
        <button onClick={this.handleConfirmOrder}>Send order to kitchen</button>
        </div>
      );
    }
    else {
      return "loading..."
    }
  }
}

export default App;
