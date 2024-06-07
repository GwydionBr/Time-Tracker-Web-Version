function TimerInput(props){
  

  return(
    <form className="startForm">
      <label>Project:</label><br/>
      <input type="text" value={props.timerProject} onChange={props.handleProjectChange} id="project"/><br/>
      <label>$/hour</label><br/>
      <input type="number" value={props.timerSalary} onChange={props.handleSalaryChange} id="salary" step="0.1"/>
    </form>
  )
}


export default TimerInput;