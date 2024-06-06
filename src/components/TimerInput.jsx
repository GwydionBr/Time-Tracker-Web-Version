function TimerInput(props){
  

  return(
    <form className="startForm">
      <label>Project:</label><br/>
      <input type="text" value={props.timerProject} onChange={props.handleProjectChange} id="project"/><br/>
      <label>$/hour</label><br/>
      <input type="text" value={props.timerSalary} onChange={props.handleSalaryChange} id="salary"/>
    </form>
  )
}


export default TimerInput;