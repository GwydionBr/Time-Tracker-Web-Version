import React from "react";
import {DeleteSessionButton} from "./OverviewButtons";

function SessionContainer(props){
  const session = props.session;
  const {time_spent, money_earned, date, time} = session;
  return(
        <div className="session">
          <DeleteSessionButton id={session.id}/>
          <ul className="sessionList">
            <li>Time Spent: <strong>{time_spent}</strong></li>
            <li>Money Earned: <strong>{money_earned}</strong></li>
            <li>Date: <strong>{date}</strong></li>
            <li>Time: <strong>{time}</strong></li>
          </ul>
        </div>
  )
}

export default SessionContainer;