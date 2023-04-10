import React from 'react'
import { Link } from 'react-router-dom'
import WarriorImg from "../assets/warrior.jpg";
import MageImg from "../assets/mage.jpg";
import RougeImg from "../assets/rouge.jpg";
import "../style/Card.css"
const Card = (props) =>  {
  const classes = [
    { id: 1, name: "Warrior", image: WarriorImg },
    { id: 2, name: "Mage", image: MageImg },
    { id: 3, name: "Rogue", image: RougeImg },
  ];
  const selectedClassObj = classes.find((classObj) => classObj.name === props.class);
  return (
      <div className="Card">
          <Link to={'/edit/'+ props.id}>
            <img src={selectedClassObj.image} alt={props.name} height= "250px" width="200px"/>
            <h2 className="name">{props.name}</h2>
            <h3 className="class">{props.class}</h3>
            <div className='stats'>
              <p>Strength: {props.strength}</p>
              <p>Dexterity: {props.dexterity}</p>
              <p>Intelligence: {props.intelligence}</p>
            </div>
          </Link>
      </div>
  );
};

export default Card;