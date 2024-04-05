/* eslint-disable react/prop-types */
import style from '../styles/styleApi.module.css'

export const CardApi = ({ name, species, type, gender, image, status }) => {
    if (status == 'Alive') 
        status = true

    if (status == 'Dead') 
        status = false
    
    return (
        <div className={style.cardStyle}>
            <h1>{name}</h1>
            <h2>{species}</h2>
            <p>{type}</p>
            <p>{gender}</p>
            <img className={style.imgStyle} src={image} alt={name} width={150} height={"auto"} />
            <div className={style.statusStyle} style={{ backgroundColor: status ? 'lightgreen' : 'red' }}></div>
        </div>
    )
}
