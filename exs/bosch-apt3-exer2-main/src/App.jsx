import { api } from "./api/rmApi"
import style from './App.module.css'
import { useState, useEffect } from 'react'
import { Card } from './components/cards/Card'
import produtos from './constants/produtos.json'
import { CardApi } from './components/cards/CardApi'
import { MyModal } from "./components/itens/MyModal"

import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { Tilt } from 'react-tilt'

import Draggable, { DraggableCore } from 'react-draggable';

function App() {
  const [show, setShow] = useState("")
  const [data, setData] = useState([])
  const [page, setPage] = useState("")
  const [name, setName] = useState("")

  const position = [-25.424875613607593, -49.27230394687684]

  const defaultOptions = {
    reverse: false,  // reverse the tilt direction
    max: 35,     // max tilt rotation (degrees)
    perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1,    // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000,   // Speed of the enter/exit transition
    transition: true,   // Set a transition on enter/exit.
    axis: null,   // What axis should be disabled. Can be X or Y.
    reset: true,    // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
  }

  useEffect(() => {
    api.get(`/character/?page=${page}`).then((response) => {
      if (!response.data.results) {
        console.log("Vazio")
      }
      setData(response.data.results)
    }).catch((error) => {
      if (error.response.status === 404) {
        alert("Esta pagina nao contem este personagem")
      }
      console.error(error)
    })
  }, [page])

  useEffect(() => {
    api.get(`/character/?name=${name}`).then((response) => {
      if (!response.data.results) {
        console.log("Vazio")
      }
      setData(response.data.results)
    }).catch((error) => {
      if (error.response.status === 404) {
        console.log('Este personagem nao existe')
      }
      console.error(error)
    })
  }, [name])

  return (
    <>
      <div className={style.wrapBtns}>
        <button onClick={() => setShow("prod")}>Produtos</button>
        <button onClick={() => setShow("api")}>API</button>
        <button onClick={() => setShow("map")}>Mapa</button>
      </div>
      <div className={style.wrapPage}>
        <h1>Exercícios de manutenção</h1>
        {show === "prod" &&
          <>
            <h2>Showroom de produtos</h2>
            <div className={style.cardGrid}>
              {produtos.map((item) => {
                return (
                  <Tilt options={defaultOptions}>
                    <Card name={item.name} desc={item.desc} value={item.value} category={item.category} image={item.image} status={item.status} key={item.id} />
                  </Tilt>
                )
              })}
            </div>
          </>
        }
        {show === "api" &&
          <>
            <h2>Rick and Morty API</h2>
            <div className={style.inputs}>
              <input type="text" placeholder="1/43" value={page} onChange={(event) => setPage(event.target.value)} />
              <input type="text" placeholder="name" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div className={style.cardGridApi}>
              {data.map((item, index) => {
                return (
                  <Draggable>
                    <div key={item.id}>
                      <CardApi name={item.name} species={item.species} type={item.type} gender={item.gender} image={item.image} status={item.status} />
                      <MyModal index={index} item={item} />
                    </div>
                  </Draggable>
                )
              })}
            </div>
          </>
        }
        {show === "map" &&
          <>
            <h2>Mapa</h2>

            <MapContainer className={style.map} center={position} zoom={13} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  {position}
                </Popup>
              </Marker>
            </MapContainer>
          </>
        }
      </div>
    </>
  )
}

export default App
