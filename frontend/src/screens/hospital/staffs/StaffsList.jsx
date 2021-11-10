import React,  {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { DeleteOutline, AddCircleOutline, Visibility} from "@material-ui/icons";
import {Link} from "react-router-dom";
import './staffList.css';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllStaff, getAllUsers, getUserLoadingStatus, loadUsers } from "../../../store/entities/users";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function StaffList() {
  const dispatch = useDispatch()

  const user = useSelector(getAllUsers)
  const usersLoading = useSelector(getUserLoadingStatus);

  const [data, setData] = useState(user)
  const classes = useStyles();

  const handleDelete = (staff_id)=>{
    setData(data.filter((item)=>item.staff_id !== staff_id));
  }

  useEffect(() => {
    dispatch(loadUsers())

},[dispatch, user])

  return (
    <TableContainer component={Paper}>
      <Link to="/hospital/addHospitalStaff"><button className="staffAddButton"><AddCircleOutline/> Add New Staff</button></Link>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
          .filter(row=>row.role === 'hospital user')
          .map(row => (
            <TableRow key={row._id}>
              <TableCell align="left">{row.name.firstName}</TableCell>
              <TableCell align="left">{row.name.lastName}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <>
              <TableCell align="left">
                <DeleteOutline className="staffListDelete" onclick={()=>handleDelete(data.staff_id)}/>
              </TableCell></>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}