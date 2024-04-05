/* eslint-disable react/prop-types */
import style from '../styles/style.module.css'

export const Card = ({name, desc, value, category, image, status}) => {
  return(
      <div className={style.cardStyle}>
          <h1>{name}</h1>
          <h2>{desc}</h2>
          <p>{value}</p>
          <p>{category}</p>
          <img className={style.imgStyle} src={image} alt={name} width={150} height={"auto"}/>
          <div className={style.statusStyle} style={{backgroundColor: status ? 'lightgreen' : 'red'}}>{status}</div>
      </div>
  )
}