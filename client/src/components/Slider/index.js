import React, {useState} from 'react'
import css from './Slider.module.scss'

const Slider = ({children}) => {
    const [x, setX] = useState(0)
    const goRight = () => x === 0 ? setX(-100 * (children.length - 1)) : setX( x + 100)
    
    const goLeft = () => x === -100 * (children.length - 1) ? setX(0) : setX(x - 100)
    return (
        <div className={css.slider}>
            {
                children.map((item, index) => {
                    return (
                        <div key={index} className={css.slide} style={{transform: `translateX(${x}%)`}}>
                            {item}
                        </div>
                    )
                })
            }
            <div className={css.goLeft} onClick={goRight}><div className={css.arrowBoxCenterLeft} /></div>
            <div className={css.goRight} onClick={goLeft}><div className={css.arrowBoxCenterRight} /></div>
        </div>
    )
}

export default Slider