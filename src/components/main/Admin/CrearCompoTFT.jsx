import React, {useContext, useState} from "react"
import style from "./css/CrearCompoTFT.module.css"
import Builder from "./Builder.jsx"
import Champions from "./ChampionsList.jsx"
import Items from "./Items.jsx";

const CrearCompoTFT = () =>{
    const [tier, setTier] = useState("Oculto")
    const [posicion, setPosicion] = useState(1)
    const [dificultad, setDificultad] = useState("Easy")
    const [titulo, setTitulo] = useState("")
    const [categoria, setCategoria] = useState([])
    const [campeones, setCampeones] = useState([]) //[{},{}]
    const [earlyComp, setEarlyComp] = useState([]) //[{},{}]
    const [carousel, setCarousel] = useState([]) //[{},{}]
    const [traits, setTraits] = useState([]) //[{},{}]
    const [aumentos, setAumentos] = useState([]) //[{},{}]
    const [gameplay, setGameplay] = useState([])
    const [composiciones, setComposiciones] = useState([]) //[{},{}]
    const [tips, setTips] = useState("");
    const [infoChampsItems, setInfoChampsItems] = useState("items");

    function handleToogleInfo(button){
        setInfoChampsItems(button)
    }

    function mySubmit(e) { 
        e.preventDefault(); 
        
        return false;
      }
    return (
        <form className={style.containerCrearCompo} onSubmit={(e)=>mySubmit(e)}>
            <label htmlFor="tiers">Tier:
            <select name="tiers" id="tiers">
                <option value="S">S</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="MEME">MEME</option>
            </select>
            </label>
            <label htmlFor="tiers">Position:
            <input type="number" defaultValue={posicion}></input>
            </label>

            <label htmlFor="tiers">Dificulty:
            <select name="tiers" id="tiers">
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>
            </label>
            <label htmlFor="tiers">Title:
            <input type="text" defaultValue={titulo}></input>
            </label>
            <label htmlFor="tiers">Category:
            <select name="tiers" id="tiers">
                <option value="3 Stars | Roll Lv4-6">3 Stars | Roll Lv4-6</option>
                <option value="Legendary">Legendary</option>
                <option value="Augment">Augment</option>
            </select>
            </label>
            <label htmlFor="earlyComp">Early Comp:
                <input list="earlyComp" name="earlyComp" id="earlyComp"/>
                <datalist id="earlyComp">
                    <option value="Veigar"/>
                    <option value="Nunu"/>
                    <option value="Kogmaw"/>
                    <option value="Varus"/>
                    <option value="Nasus"/>
                </datalist>
            </label>
            <label htmlFor="aumentos">Aumentos:
                <input list="aumentos" name="aumentos" id="aumentos"/>
                <datalist id="aumentos">
                    <option value="Veigar"/>
                    <option value="Nunu"/>
                    <option value="Kogmaw"/>
                    <option value="Varus"/>
                    <option value="Nasus"/>
                </datalist>
            </label>
            <label htmlFor="gameplay">Gameplay:
                <input type="text" defaultValue={gameplay}></input>
            </label>
            <label htmlFor="tips">Tips:
                <input type="text" defaultValue={tips}></input>
            </label>
            <Builder/>
            <div>
                <button onClick={()=>{handleToogleInfo("campeones")}}>Campeones</button>
                <button onClick={()=>{handleToogleInfo("items")}}>Items</button>
                {infoChampsItems === "campeones" ? <Champions/> : <Items/>}

            </div>
            {/* <input type="submit" value="Crear Compo"/> */}
        </form>



    )
}

export default CrearCompoTFT