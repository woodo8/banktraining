import { useRef, useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { useControls } from "leva";
import './example.css'

export default function Example() {
    const calc = (x, y, rect) => [
        -(y - rect.top - rect.height / 2) / 5,
        (x - rect.left - rect.width / 2) / 5,
        1.2
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
        <div className="root">
            
            <div className="ccard-main" ref={ref}>
                <animated.div
                    className="ccard"
                    style={{ transform: props.xys.to(trans) }}
                    onMouseLeave={() => set([0, 0, 1])}
                    onMouseMove={(e) => {
                        const rect = ref.current.getBoundingClientRect();
                        set(calc(e.clientX, e.clientY, rect));
                    }}
                >
                    <h1>Hello world</h1>
                </animated.div>
                <animated.div
                    className="ccard"
                    style={{ transform: props.xys.to(trans) }}
                    onMouseLeave={() => set([0, 0, 1])}
                    onMouseMove={(e) => {
                        const rect = ref.current.getBoundingClientRect();
                        set(calc(e.clientX, e.clientY, rect));
                    }}
                >
                    <h1>Hello world</h1>
                </animated.div>
                <animated.div
                    className="ccard"
                    style={{ transform: props.xys.to(trans) }}
                    onMouseLeave={() => set([0, 0, 1])}
                    onMouseMove={(e) => {
                        const rect = ref.current.getBoundingClientRect();
                        set(calc(e.clientX, e.clientY, rect));
                    }}
                >
                    <h1>Hello world</h1>
                </animated.div>
            </div>
        </div>
    );
}
