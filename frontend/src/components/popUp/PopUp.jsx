import React from 'react'
import { Button } from 'react-bootstrap'
//import "./PopUp.css"

const PopUp = ({closePopUp}) => {
    return (
        <div className="popupBackground">
            <div className="popupContainer">
                <div className="titleCloseBtn">
                    <Button onClick={ () => closePopUp(false)}>X</Button>
                </div>

                <div className="popupTitle">
                    <h1>Are you sure want to continue?</h1>
                </div>
                <div className="popupBody">
                    <p>dfrgregerger</p>
                </div>
                <div className="popupFooter">
                    <Button onClick={ () => closePopUp(false)} id="cancelBtn">Cancel</Button>
                    <Button>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default PopUp
