import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import { AddCircleOutline} from "@material-ui/icons";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllHospitals, getHospitalLoadingStatus, loadHospitals} from '../../store/entities/hospitals';
import './hospitals.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function Hospitals() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth);
//  console.log(auth)

  const hospital = useSelector(getAllHospitals)
  const hospitalsLoading = useSelector(getHospitalLoadingStatus);

  const [data, setData] = useState(hospital);
  const [searchKey, setSearchKey] = useState('');
  const classes = useStyles();

  useEffect(() => {
    dispatch(loadHospitals())

},[dispatch, hospital])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
      <Link to="/healthMinistry/addHospital"><button className="wardAddButton"><AddCircleOutline/>Add New Hospital</button></Link>
      <TextField id="search" label="Search ................" variant="filled" type="text" 
      onChange= {(event) => {
        setSearchKey(event.target.value);
      }}
      />
    <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
            <TableCell align="left">NAME</TableCell>
            <TableCell align="left">CONTACT</TableCell>
            <TableCell align="left">DISTRICT</TableCell>
            <TableCell align="left">CITY</TableCell>
            <TableCell align="left">PROVINCE</TableCell>
            <TableCell align="left">ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
          .filter((row)=>{
            if (searchKey ==""){
              return row
            }else if(row.address.district.toLowerCase().includes(searchKey.toLowerCase())){
              return row
            }else if(row.address.province.toLowerCase().includes(searchKey.toLowerCase())){
              return row
            }else if(row.name.toLowerCase().includes(searchKey.toLowerCase())){
              return row
            }else if(row.address.city.toLowerCase().includes(searchKey.toLowerCase())){
              return row
          }})
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map(row => (
            <TableRow key={row._id}>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">0{row.Contact[0]}</TableCell>
              <TableCell align="left">{row.address.district}</TableCell>
              <TableCell align="left">{row.address.city}</TableCell>
              <TableCell align="left">{row.address.province}</TableCell>

              <>
              <TableCell align="left">
                <Link to={"addHospitalAdmin/"+row._id}>
                <button className="wardListEdit" aria-label="edit" >
                  <AddCircleOutline/>Add Hospital Admin 
                </button></Link>
              </TableCell></>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
