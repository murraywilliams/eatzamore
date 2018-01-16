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
      filteredFoods: [],
      foodCategories: [],
      order: [],
      orderComments:'',
      loaded:false
    }
  }

  componentDidMount() {
    // console.log("The environment variable is: ",process.env);
    //Add CRUD operations to the REST API
    this.wp = new WPAPI({
      endpoint: process.env.REACT_APP_API_URL,
      username: process.env.REACT_APP_USERNAME,
      password: process.env.REACT_APP_PASSWORD});

    this.wp.orders = this.wp.registerRoute( 'wp/v2', '/orders/' );

    //fetch all the food items from the Wordpress REST API
    let newRes, foodCategories;

    this.setState({
      loaded:false
    })
    fetch(`${process.env.REACT_APP_API_URL}/wp/v2/food?_embed`)
      .then(res => res.json())
      .then(res => {
        newRes = res.map((data) => {
          return ({
            id: data.id,
            name: data.title.rendered,
            desc: data.acf.desc,
            price: data.acf.price,
            image: data.acf.image,
            category: data._embedded["wp:term"][0][0].name
          })
        })
        foodCategories = newRes.map((item)=>{
          return item.category;
        }).filter(function(elem, index, self) {
          return index === self.indexOf(elem);
        });
        foodCategories.unshift("all");

        this.setState ({
          foods: newRes,
          loaded:true,
          foodCategories,
          filteredFoods:newRes 
        });
      })
    }

    //The below adds the order list into the WP database via the REST API
    handleConfirmOrder = () => {

      this.wp.orders().create({
        // "title" and "content" are the only required properties
        title: 'Ord#201',
        fields: {
            orders: this.state.order,
            order_comments: this.state.orderComments
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
    handleAddOrder = (foodName) =>{

      const index = this.state.foods.findIndex(val=> val.name===foodName);
      const name = this.state.foods[index].name;
      const price = this.state.foods[index].price;
      // uses new React updater function
      this.setState(prevState => ({
        order: [...prevState.order, {name: name, price: price}]
      }));

    }

    //Delete an item from the order list
    handleDeleteOrder = (index) => {

      this.setState(prevState => ({
          order: prevState.order.filter((_,i)  => i !== index)
      }))

    }

    handleCommentChange = (event) => {
      this.setState({orderComments: event.target.value});
    }

    handleFilterMenu = (activeCategory) =>{

      let filteredFoods = this.state.foods.slice();
      
      if(activeCategory!=="all"){
        filteredFoods = filteredFoods.filter((food) => food.category === activeCategory);
      }
      
      this.setState({filteredFoods});
      
    }

  render() {

    if(this.state.loaded){
      return (
        <div className="App">
        <h1>EATZAMORE version Alpha 0.1</h1>
        <h2>Foods</h2>
        <Menu 
          foods={this.state.filteredFoods}
          categories={this.state.foodCategories}
          filterMenu={this.handleFilterMenu}
          addOrder={this.handleAddOrder}
        />
        <Order 
          order={this.state.order}
          deleteOrder={this.handleDeleteOrder}
        />
        <textarea 
          onChange={this.handleCommentChange}
          value={this.state.orderComments}
          placeholder="Special comments for Order">
        </textarea>
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
