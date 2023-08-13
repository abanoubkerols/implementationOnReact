import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';





const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];


function App() {
  return (
    <div className='container'>
      <Header />
      <Menu />
      <Footer />
    </div>

  );
}
function Header() {
  return (<header className='header'><h1>Fast Pizza Company</h1></header>)
}

function Menu() {
  const pizzas = pizzaData
  const numPizzas = pizzas.length

  return <main className='menu'>

    <h2>our Menu </h2>
    {numPizzas > 0 ? (
      <React.Fragment key='normal'>
        <p>
          Authentic Italian cuisine. 6 creative dishes to choose from. All
          from our stone oven, all organic, all delicious.
        </p>
        <ul className='pizzas'>
          {pizzas.map((pizza) => (<Pizza pizzaObj={pizza} key={pizza.name} />))}
        </ul>
      </React.Fragment>
    ) : <p> we are working on it </p>}


  </main>
}

function Pizza(props) {
  return (
    <li className={`pizza ${props.pizzaObj.soldOut ? 'sold-out' : ''}`}>
      <img src={props.pizzaObj.photoName} alt="" />
      <div>
        <h3>{props.pizzaObj.name}</h3>
        <p>{props.pizzaObj.ingredients}</p>
        <span>{props.pizzaObj.soldOut ? "Sold Out" :  props.pizzaObj.price}</span>
      </div>
    </li>
  )
}



function Footer() {
  const hour = new Date().getHours()
  const openHour = 10
  const closeHour = 22
  const isOpen = hour >= openHour && hour <= closeHour


  return (
    <footer className='footer'>
      {isOpen ? <Order closeHour={closeHour} /> : <p>we are open {openHour}:00 to {closeHour}:00</p>}
    </footer>
  )
}

function Order(props) {
  return (
    <div className='order'>
      <p>We are open until {props.closeHour}:00</p>
      <button className='btn'>
        order
      </button>
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

