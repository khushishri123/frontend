import React,{useEffect, useState} from 'react';
export default function StudentFrontend(){
    const [name,setName]=useState('');
    const [city,setCity]=useState('');
    const [percentage,setPercentage]=useState(0);
    const [rollNumber,setRollNumber]=useState(0);
    const [students,setStudents]=useState([]);
    function addStudent(form)
    {
form.preventDefault();
const student={name,city,percentage};
console.log(student);
fetch('http://localhost:8080/addStudent',{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(student)
}).then(()=>{
    console.log("New student Added");
})
    }

    function updateStudent(){
const student={rollNumber,name,city,percentage};
fetch("http://localhost:8080/updateStudent",{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(student)
}).then((result)=>result.json()).then((resp)=>{
    alert(resp.result);
})
}

function deleteStudent()
{
    var url="http://localhost:8080/deleteStudentById?rollNumber="+rollNumber;
    fetch(url,{
        method:"DELETE",
    }).then((result)=>result.json()).then((resp)=>{
        alert(resp.result);
    })
}

    useEffect(()=>{
    fetch("http://localhost:8080/studentsList").then((result=>result.json())).then((resp)=>{
        setStudents(resp);
        console.log(resp); 
    });
    },[]);

    return(
        <div>
          <h1>Add Student</h1><br></br>
<form>
          <div class="mb-3">
  <label class="form-label">Name: </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <input type="text" value={name} placeholder="Enter Name" onChange={(e)=> setName(e.target.value)}/>
</div>

<div class="mb-3">
  <label  class="form-label">City: </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <input type="text" value={city} placeholder="Enter City" onChange={(e)=> setCity(e.target.value)}/>
</div>

<div class="mb-3">
  <label  class="form-label">Percentage: </label>
  <input type="float" value={percentage} placeholder="Enter Percentage" onChange={(e)=> setPercentage(e.target.value)}/>
</div>

<button type='button' onClick={addStudent}>Save data</button>
</form>

<br></br>
<h1>Showing Students List:</h1>
<table border='1 px solid black'>
    <tr>
        <th>Roll Number</th>
        <th>Name</th>
        <th>City</th>
        <th>Percentage</th>
    </tr>
{students.map(item=>(
 <tr>
 <td>{item.rollNumber}</td>
 <td>{item.name}</td>
 <td>{item.city}</td>
 <td>{item.percentage}</td>
</tr>
))}
</table>

<br></br><br></br>

<h1>Update Student by providing roll number,name,city and percentage</h1>
<form>

<div class="mb-3">
  <label class="form-label">Roll Number: </label>
  <input type="text" value={rollNumber} placeholder="Enter Roll Number" onChange={(e)=> setRollNumber(e.target.value)}/>
</div>
          <div class="mb-3">
  <label class="form-label">Name: </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <input type="text" value={name} placeholder="Enter Name" onChange={(e)=> setName(e.target.value)}/>
</div>

<div class="mb-3">
  <label  class="form-label">City: </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <input type="text" value={city} placeholder="Enter City" onChange={(e)=> setCity(e.target.value)}/>
</div>

<div class="mb-3">
  <label  class="form-label">Percentage: </label>&nbsp;
  <input type="float" value={percentage} placeholder="Enter Percentage" onChange={(e)=> setPercentage(e.target.value)}/>
</div>

<button type='button' onClick={updateStudent}>Update</button>
</form>
<br></br><br></br>
<h1>Delete Student</h1>
<form>

<div class="mb-3">
  <label class="form-label">Roll Number: </label>
  <input type="text" value={rollNumber} placeholder="Enter Roll Number" onChange={(e)=> setRollNumber(e.target.value)}/>
</div>
<button type='button' onClick={deleteStudent}>Delete</button>
</form>
        </div>
    )
}