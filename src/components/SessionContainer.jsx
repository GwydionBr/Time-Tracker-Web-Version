import React, {useState} from "react";
import DeleteSessionButton from "./Buttons/DeleteSessionButton";
import {displayShortTimeFormat} from "../assets/logicFunctions";

export default function SessionContainer(props){
  const [isHovered, setIsHovered] = useState(false);
  const session = props.session;
  const {time_spent, money_earned, date, time} = session;

  return(
        <div className="session container"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}>
          <ul className="sessionList">
            <li>Time Spent: <strong>{displayShortTimeFormat(time_spent)}</strong></li>
            <li>Money Earned: <strong>{money_earned} $</strong></li>
            <li>Date: <strong>{date}</strong></li>
            <li>Time: <strong>{time}</strong></li>
          </ul>
          {isHovered && <DeleteSessionButton 
            session_id={session.id} 
            setProjects={props.setProjects}/>}
        </div>
  )
}
