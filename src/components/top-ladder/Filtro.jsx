import { useStore } from '@nanostores/react';
import { plataforma, orden } from "../../store.js";
import { hydrateRoot } from 'react-dom/client';
// import Resultados from "./Resultados.jsx";

export default function Filtro(){
    
    const $plataforma = useStore(plataforma);
    const $orden = useStore(orden);
    console.log("$plataforma",$plataforma)
    console.log("$orden",$orden)
    const PLATAFORMA = [
        {
          value: 'todos',
          name: 'TODOS',
        },
        {
          value: 'la1',
          name: 'LAN',
        },
        {
          value: 'la2',
          name: 'LAS',
        },
        {
          value: 'euw1',
          name: 'EUW',
        },
        {
          value: 'na1',
          name: 'NA',
        },
      ];
      const ORDEN = [
        {
          value: 'asc',
          name: 'ASC',
        },
        {
          value: 'desc',
          name: 'DESC',
        },
      ]; 

    return (
        <>
        <select name="filtroPlataforma" id="filtroPlataforma"  value={$plataforma} onChange={(e) => {plataforma.set(e.target.value)}}>
            {PLATAFORMA.map((r)=>{
                return (
                    <option value={r.value} key={r.value}>{r.name}</option>
                )
            })}
            
        </select>
        <select name="filtroOrden" id="filtroOrden" value={$orden} onChange={e => orden.set(e.target.value)}>
        {ORDEN.map((r)=>{
                return (
                    <option value={r.value} key={r.value}>{r.name}</option>
                )
            })}
        </select>
        </>
    )
}