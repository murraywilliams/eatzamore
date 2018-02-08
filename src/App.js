import React, { Component } from 'react';
import './App.css';
import Menu from './Menu'
import Order from './Order'
import WPAPI from 'wpapi';
import axios from 'axios';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import * as Images from './Images';
global.jQuery = require('jquery');



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foods: [],
      filteredFoods: [],
      foodCategories: [],
      order: [],
      orderComments: '',
      loaded: false,
      sendingData: false
    }
  }

  componentDidMount() {
    // console.log("The environment variable is: ", process.env);
    //Add CRUD operations to the REST API
    this.wp = new WPAPI({
      endpoint: process.env.REACT_APP_API_URL,
      username: process.env.REACT_APP_USERNAME,
      password: process.env.REACT_APP_PASSWORD
    });

    this.wp.orders = this.wp.registerRoute('wp/v2', '/orders/');

    // Combined fetch request using async/await
    let newRes, foodCategories;
    async function fetchData () {
      try {
        const fetchFood = axios(`${process.env.REACT_APP_API_URL}/wp/v2/food?_embed`);
        const fetchCategories = axios(`${process.env.REACT_APP_API_URL}/wp/v2/categories`);
        // await both promises to come back and destructure the result into their own variables
        const [food, cat] = await Promise.all([fetchFood, fetchCategories]);
        // console.log(food.data, cat.data); // poes cool

        //Save all the foods to state
        newRes = food.data.map((data) => {
          return ({
            id: data.id,
            name: data.title.rendered,
            desc: data.acf.desc,
            price: data.acf.price,
            image: data.acf.image,
            // categories: this.loopCategories(data._embedded["wp:term"][0])
            category: data._embedded["wp:term"][0][0].name
          })
        })
        console.log(newRes);
        this.setState({
          foods: newRes,
          filteredFoods: newRes
        });

        foodCategories = cat.data.map((category)=>{
          return category.name
        })
        console.log(foodCategories);
        this.setState({foodCategories})

        // Set loaded state to true
      } catch (err) {
        console.log('Eish, something wnt wrong ' + err);
      }
    }

    this.setState({
      loaded: true
    })
    fetchData();
  }

  //The below adds the order list into the WP database via the REST API
  handleConfirmOrder = () => {
    // Grab current time in seconds to serve as order number
    const timestamp = 'Ord-' + String(Math.round(new Date().getTime() / 1000));
    this.setState({ sendingData: true });
    this.wp.orders().create({
      // "title" and "content" are the only required properties
      title: timestamp,
      fields: {
        orders: this.state.order,
        order_comments: this.state.orderComments,
        order_number: this.state.timestamp
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
    }).then(function (response) {
      // "response" will hold all properties of your newly-created post,
      // including the unique `id` the post was assigned on creation
      console.log(response.id);
      alert('Order has been sent!');
      this.setState({ sendingData: false });
    })
  }

  // add an item to the order list
  handleAddOrder = (foodName) => {

    const index = this.state.foods.findIndex(val => val.name === foodName);
    const name = this.state.foods[index].name;
    const price = this.state.foods[index].price;
    // grab current time and push to order
    const timestamp = Math.round(new Date().getTime() / 1000);
    // uses new React updater function
    this.setState(prevState => ({
      order: [...prevState.order, { name, price, timestamp }]
    }));

  }

  //Delete an item from the order list
  handleDeleteOrder = (index) => {

    this.setState(prevState => ({
      order: prevState.order.filter((_, i) => i !== index)
    }))

  }

  handleCommentChange = (event) => {
    this.setState({ orderComments: event.target.value });
  }

  handleFilterMenu = (activeCategory) => {

    let filteredFoods = this.state.foods.slice();

    if (activeCategory !== "All") {
      filteredFoods = filteredFoods.filter((food) => food.category === activeCategory);
    }

    this.setState({ filteredFoods });

  }

  loadingIcon = () => {
    return <p>Sending order to Kitchen...</p>
  }

  render() {

    if (this.state.loaded) {
      return (
        <AppContainer className="App">
          <Content>
            <LeftContainer>
              <Header>
                <img src={Images.Logo} alt="Eatzamore Logo" />
              </Header>
              <Menu
                foods={this.state.filteredFoods}
                categories={this.state.foodCategories}
                filterMenu={this.handleFilterMenu}
                addOrder={this.handleAddOrder}
              />
            </LeftContainer>
            <RightContainer>
              <Order
                order={this.state.order}
                deleteOrder={this.handleDeleteOrder}
              />
              <hr/>
              <p>Add your order comments:</p>
              <textarea
                onChange={this.handleCommentChange}
                value={this.state.orderComments}
                placeholder="Special comments for Order">
              </textarea>
              <Submit onClick={this.handleConfirmOrder}>Send order to kitchen</Submit>
              {this.state.sendingData ? this.loadingIcon() : ''}
            </RightContainer>
          </Content>
        </AppContainer>
      );
    }
    else {
      return "Loading...";
    }
  }
}

const AppContainer = styled.div`
  background: url(${Images.Background});
  background-repeat: no-repeat;
  background-size: cover;
  min-height:100vh;
`;

const Header = styled.div`
  width:100%;
  display:flex;
  justify-content:flex-start;
  padding:20px;
`;

const Content = styled.div`
  display:flex;
`;

const RightContainer = styled.div`
  width:30%;
  margin:0 7%;
  background:rgba(0,0,0,0.5);
  color:white;
  text-align:center;

  & hr {
    height:5px;
    background:white;
    width:80%;
  }
  & textarea {
    display:inline-block;
    border:0;
    width:80%;
    color: black;
  }
`;

const Submit = styled.button`
  background:#d85a41;
  color:white;
  border:0;
  padding:10px 20px;
`;

const LeftContainer = styled.div`
  width:54%;
  margin-left:2%;
`;

export default App;
