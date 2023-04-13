import React, {useEffect} from 'react';
import firstView from '../../assets/img/first-time-view.svg';
import './index.css';
import CustomizedProgressBars from "./progressbar";
import {readFromStorage} from "../../util/general-utils";
import {useNavigate} from 'react-router-dom'

function FirstView() {
    const navigate = useNavigate();
    useEffect(() => {
        if (readFromStorage('seenImage')) {
            navigate("/login");
        }
    }, [])

    return (
        <>
            <div className='first-view'>
                <img src={firstView} alt='firstView'/>
                <CustomizedProgressBars/>
            </div>
        </>
    );
}

export default FirstView;
