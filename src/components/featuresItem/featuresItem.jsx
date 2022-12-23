import React, { useRef, useState } from 'react'
import Grid from "@mui/system/Unstable_Grid";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

import { useSpring, animated, config } from "@react-spring/web";
import { useControls } from "leva";
import { Fade } from "react-reveal";

export default function FeaturesItem() {
    const calc = (x, y, rect) => [
        -(y - rect.top - rect.height / 2) / 5,
        (x - rect.left - rect.width / 2) / 5,
        1.1
    ];
    const trans = (x, y, s) =>
        `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

    const configList = Object.keys(config);
    const ref = useRef(null);
    const [xys, set] = useState([0, 0, 1]);
    const { preset } = useControls({
        preset: { value: "default", options: configList }
    });
    const props = useSpring({ xys, config: config[preset] });

    return (
        <Grid ref={ref} item xs={12} md={6} lg={3} >
            <Fade top>
                <animated.div className="f-item" style={{ transform: props.xys.to(trans) }}
                    onMouseLeave={() => set([0, 0, 1])}
                    onMouseMove={(e) => {
                        const rect = ref.current.getBoundingClientRect();
                        set(calc(e.clientX, e.clientY, rect));
                    }}>
                    <div className="icon-box">
                        <AutoGraphIcon />
                    </div>
                    <h4 className='main'>Business solution</h4>
                    <p className='main'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </animated.div>
            </Fade>
        </Grid>
    )
}
