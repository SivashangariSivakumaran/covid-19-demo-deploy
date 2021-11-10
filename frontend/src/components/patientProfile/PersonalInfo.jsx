import React from 'react'
import { useSelector } from 'react-redux';
import { Button, Card} from 'react-bootstrap'

const PersonalInfo = ({patients, currentHospital, userHospital, id}) => {
    console.log(patients)
    const userDetails = useSelector(state => state.auth);
    const { user } = userDetails.data.user
    const auth = user

    return (
            <Card  className="m-2" bg="#ffffff" text="black" style={{ width: '100%'}}>
                <ul className="profile-info-list mt-2">
                    <li className="title ">PERSONAL INFORMATION</li>
                    <li>
                        <div className="field">Name:</div>
                        <div className="value">{objectDestructure(patients, "name")}</div>
                     </li>
                    <li>
                        <div className="field">Age:</div>
                        <div className="value">{objectDestructure(patients, "age")}</div>
                    </li>
                    <li>
                        <div className="field">Birth of Date:</div>
                        <div className="value">{objectDestructure(patients, "birthday")}</div>
                    </li>
                    <li>
                        <div className="field">Tel Number:</div>
                        <div className="value">{patients.contactNo}</div>
                    </li>
                    <li>
                        <div className="field">Address:</div>
                        <div className="value">
                            <address className="m-b-0">
                                {objectDestructure(patients, "address")}
                            </address>
                        </div>
                    </li>
                        {currentHospital === userHospital && auth.role === "patient"? 
                        <div>
                            <Button 
                                type='submit'  
                                className='btn btn-primary' 
                                onClick={()=> window.location=`/hospital/editProfile/${patients._id}`}
                            >Edit Profile</Button>
                        </div>:''}
                </ul>
            </Card>
    )
}

export default PersonalInfo

function objectDestructure ( patients, type){
     let newList = ""
     if(typeof(patients) === 'undefined' || patients.length === 0){
         return newList
     } 
 
     const { name, address, birthday } = patients

        if(type === "name"){
            const { firstName , lastName } = name;
            const patientName = firstName + " " + lastName
            return patientName;
         }
        if(type === "address"){
            const { city, line1, line2, district } = address;
            return (city + "," + line1 + "," + line2 + "," + district)
        }
        if(type === "birthday"){
            const date = birthday.split("-")
            return date[0] +"-" + date[1] + "-" + (date[2][0] + date[2][1])
        }
        if(type === "age"){
            const date = new Date().getFullYear();
            const birthYear = birthday.split("-")[0]
            return (date - birthYear)
        }
 }
