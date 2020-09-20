import React, {useState} from 'react'
import css from './Slider.module.scss'
import ImgComp from './ImgComp'
import i1 from '../../imgs/care.jpg'
import i2 from '../../imgs/careHome.jpg'
import i3 from '../../imgs/carehome2.jpg'
import i4 from '../../imgs/patientCare.jpg'
import i5 from '../../imgs/care.jpg'

const Slider = () => {
    let sliderArr = [<ImgComp src={i1}/>,<ImgComp src={i2}/>,<ImgComp src={i3}/>,<ImgComp src={i4}/>]
    const [x, setX] = useState(0)
    const goRight = () => x === 0 ? setX(-100 * (sliderArr.length - 1)) : setX( x + 100)
    
    const goLeft = () => x === -100 * (sliderArr.length - 1) ? setX(0) : setX(x - 100)
    return (
        <div className={css.slider}>
            {
                sliderArr.map((item, index) => {
                    return (
                        <div key={index} className={css.slide} style={{transform: `translateX(${x}%)`}}>
                            {item}
                        </div>
                    )
                })
            }
            <div className={css.goLeft} onClick={goRight}>Left</div>
            <div className={css.goRight} onClick={goLeft}>Right</div>
        </div>
    )
}

export default Slider