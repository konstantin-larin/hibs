import "./style.scss";
import {Train} from "@services/exercises.js";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {v4 as uuidv4} from 'uuid';


class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// масштабирование происходит за счет изменения maxX, maxY, scaleX, scaleY
export default function ExerciseGraph({
                                          exercise,
                                          pointsOnX = 5,
                                          pointsOnY = 5,
                                      }) {


    // собираем данные с занятия, формируем точки
    const trains = exercise.parts.filter(part => part instanceof Train);
    const graph = [];
    for (let train of trains) {
        const hits = train.hitsRange;
        const energy = train.getEnergy();
        const point = graph.find(point => point.x === hits);
        if (point) {
            if (point.y < energy) {
                point.y = energy;
            }
        } else {
            graph.push(new Point(hits, energy));
        }
    }
    graph.sort((a, b) => a.x - b.x);

    // на основе данных считаем точки
    const maxY = Math.ceil(graph.at(-1).y / pointsOnY) * pointsOnY;
    const scaleY = maxY / pointsOnY;
    const maxX = Math.ceil(graph.at(-1).x / pointsOnX) * pointsOnX;
    const scaleX = maxX / pointsOnX;
    // на основе ширины блока и отношении pointsOnX кк pointsOnY вычисляем высоту
    const block = useRef(null);
    const [width, setWidth] = useState(0);
    const height = Math.floor(0.66 * width);

    useLayoutEffect(() => {
        if (block) {
            setWidth(block.current.offsetWidth);
        }
    }, [block]);

    function windowOnResize() {
        if (block) {
            setWidth(block.current.offsetWidth);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', windowOnResize);
        return () => {
            window.removeEventListener('resize', windowOnResize);
        }
    }, []);


    return (
        <div className={'exercise-graph__container'}>
            <div className={'exercise-graph'} style={{
                height: height + 'px',
            }} ref={block}
            >
                <table >
                    <tbody>
                    {Array.from({length: pointsOnY}).map((_, i) => {
                        const numY = (pointsOnY - (i + 1)) * scaleY;
                        return (
                            <tr  key={uuidv4()}>
                                {Array.from({length: pointsOnX}).map((_, i) => {
                                    const numX = (i + 1) * scaleX;
                                    return (
                                        <td data-x={numX} data-y={numY} data-max={maxY} key={uuidv4()}></td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <svg width={width} height={height}>
                    {graph.map(point => {
                        const x = Math.floor((point.x / maxX) * width) - 5;
                        const y = height -  Math.floor((point.y / maxY) * height);
                       return (
                           <line x1={x} y1={height - 3} x2={x} y2={y}></line>
                       )
                    })}
                </svg>
            </div>
        </div>
    )
}