import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, {linearProgressClasses} from '@mui/material/LinearProgress';
import {saveToStorage} from "../../util/general-utils";

const BorderLinearProgress = styled(LinearProgress)(({theme}) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: '#fff',
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: '#EC2B59',
    },
}));


export default function CustomizedProgressBars() {

    const Ref = useRef(null);

    const [progressValue,setProgressValue]=useState<number>(0)
    const startTimer = (e: any) => {
        let {total, hours, minutes, seconds}
            = getTimeRemaining(e);
        if (total >= 0) {
            // update the timer
            // check if less than 10 then we need to
            // add '0' at the beginning of the variable

            setProgressValue(100-(seconds)*20)
        }
        if(seconds===0) {
            saveToStorage('seenImage', true);
        }
    }
    const getTimeRemaining = (e: string) => {
        // @ts-ignore
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }

    const clearTimer = (e: Date) => {

        // If you try to remove this line the
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) {
            clearInterval(Ref.current);
        }
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        // @ts-ignore
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();
        // This is where you need to adjust if
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + 5);
        return deadline;
    }

    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);


    return (
        <Box sx={{flexGrow: 1}}>
            <BorderLinearProgress variant="determinate" value={progressValue}/>
        </Box>
    );
}
