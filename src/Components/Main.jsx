import Nav from './Nav'
import React, {Component} from 'react';


export default class Todo extends Component {
  constructor () {
    super ();
    this.state = {
      todo_array: [],
      task: '',
      department:'',
      edit_task: '',
    };
  }
  onChangeTask = e => {
    this.setState ({
      task: e.target.value,
    });
  };
  onChangeDepartment = e => {
    this.setState ({
      department: e.target.value,
    });
  };
  addTask = () => {
    let {todo_array, task,department} = this.state;
    let obj = {
      id: todo_array.length == 0 ? 1 : todo_array[todo_array.length - 1].id + 1,
      name: task,
      department:department,
      is_editing: false,
      is_done: false,
    };
    todo_array.push (obj);
    this.setState ({
      todo_array: todo_array,
      task: '',
      department:'',
    });
  };
 

  edit = object => {
    let {todo_array} = this.state;

    let i = todo_array.findIndex (task => task.id === object.id);
    let d = todo_array.findIndex (department => department.id === object.id);
    todo_array[i].is_editing = !todo_array[i].is_editing;
    todo_array[d].is_editing = !todo_array[d].is_editing;

    todo_array.map (task => {
      task.id !== object.id
        ? (task.is_editing = false)
        : (task.is_editing = task.is_editing);
      return task;
    });
    todo_array.map (department => {
      department.id !== object.id
        ? (department.is_editing = false)
        : (department.is_editing = department.is_editing);
      return department;
    });
    this.setState ({
      todo_array: todo_array,
      edit_task: object.name,
      edit_department: object.name,
    });
  };
  editTask = task => {
    this.setState ({
      edit_task: task,
    });
  };
  editDepartment = department => {
    this.setState ({
      edit_department: department,
    });
  };

  saveEditTask = object => {
    let {todo_array, edit_task,edit_department} = this.state;
    let i = todo_array.findIndex (task => task.id === object.id);
    let d = todo_array.findIndex (department => department.id === object.id);
    todo_array[i].name = edit_task;
    todo_array[d].department = edit_department;

    this.setState (
      {
        todo_array: todo_array,
        edit_task: '',
        edit_department:'',
      },
      e => {
        this.edit (object);
      }
    );
  };
  delete = object => {
    let {todo_array} = this.state;
    let i = todo_array.findIndex (task => task.id === object.id);
    let d = todo_array.findIndex (department => department.id === object.id);
    todo_array.splice (i, 1);
    todo_array.splice (d, 1);
    this.setState ({
      todo_array: todo_array,
    });
  };

  done = object => {
    let {todo_array} = this.state;
    let i = todo_array.findIndex (task => task.id === object.id);
    let d = todo_array.findIndex (department => department.id === object.id);
    todo_array[d].is_done = true;

    this.setState ({
      todo_array: todo_array,
    });
  };

render () {
  return (
    <div>
<div id="maindiv">
  <p>Available : 08</p>
  <p>Total : 50</p>
  <textarea
    id="standard-basic"
   autoComplete="off"
  value={this.state.task}
    onChange={this.onChangeTask}
   placeholder="Name"
     />
<textarea
    id="standard-basic"
   autoComplete="off"
  value={this.state.department}
    onChange={this.onChangeDepartment}
   placeholder="department"
     />
    <button
  style={{color:"white", padding:"6px 40px " ,fontSize:"20px", backgroundColor:"navy"}} 
     variant="contained"
     color="primary"
     size="small"
     disabled={this.state.task.department == ''}
     onClick={this.addTask}> Add Employee</button>
<table style={{marginTop:"50px", display: "flex"}}>
				<thead>
				<tr>
	<th >Name</th>
	<th >Department</th>
	<th >Available</th>
<th >View Details</th>
		</tr>
		</thead>
      </table>

{this.state.todo_array.length > 0
? <div>
  <table className="centerTable" style={{marginTop: 20}}>
    {this.state.todo_array.map ((object, i) => {
      return (
<tbody>

<tr>
<td>
{object.is_editing
? <textarea
id="standard-basic"
value={this.state.edit_task}
onChange={e => this.editTask (e.target.value)}
/>
: object.is_done
? <s>{object.name}</s>
: <span>{object.name}</span>}
</td>
<td>
  
{object.is_editing
  ? <div>
   <button style={{color:"blue", marginLeft:"500px", padding:"6px 40px " ,fontSize:"20px"}} 
     variant="outlined"
color="primary"
   size="small"
      disabled={this.state.edit_task == ''}
       onClick={e => this.saveEditTask (object)} > Save  </button>
     <button
     style={{color:"black", padding:"6px 40px " ,fontSize:"20px"}} 
       variant="outlined"
       color=""
       size="small"
       onClick={e => this.edit (object)}
     >
       Cancel
     </button>
   </div>
 : <div>
 <button style={{color:"green", marginLeft:"500px", padding:"6px 40px " ,fontSize:"20px"}} variant="outlined" color="primary" size="small" onClick={e => this.edit (object)} >
       Edit
     </button>
<button
 style={{color:"red", padding:"6px 40px " ,fontSize:"20px"}} 
variant="outlined"
size="small"
onClick={e => this.delete (object)}
>
Delete
</button>
</div>}
</td>
 </tr>
 </tbody>
      );
    })}
  </table>
</div>
: <h2></h2>}

</div>
    </div>
  )
}
}
