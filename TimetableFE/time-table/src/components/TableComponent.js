import React from 'react';
import './components.css'
import {Row,Col} from 'antd'

const Rows = (props)=>{
  return(
    < >
      {Object.keys(props.cname).map((obj,ind) => <td className= {props.main_json.times[ind]}>{props.cname[props.main_json.times[ind]].subject}</td>)}      
    </>
  );
}

//<Rows cname = {main_json[obj]}/>
const Table = (props) =>{ 
  if(props.main_json == undefined){
    return <div></div>
  }else{
return (
<div>
{Object.keys(props.main_json.time_table).map(obj =>  
  <table className={obj}>
    <tr>
      <td>{obj}</td>
      {props.main_json.times.map(time_period => <td>{time_period}</td>)}
    </tr> 
    {props.main_json.days.map(day => 
    <tr>
      <td>{day}</td> 
    <Rows main_json = {props.main_json} cname = {props.main_json.time_table[obj][day]}/></tr>)}
  </table>)}
</div>)}}
;
//let m = main_json.map((keys)=>{<div>{keys}</div>})
class TableComponent extends React.Component{
  super(props){
    this.props = props
    
  }
  render(){
      return (
          
        <div style={{left:"20%",position:"relative"}}>
        <Table main_json = {this.props.main_json}/>
        <br></br>
        </div>  
        );
    }
}
export default TableComponent