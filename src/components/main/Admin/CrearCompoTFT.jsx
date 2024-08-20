import React, {useState} from "react"
import style from "./css/CrearCompoTFT.module.css"
import Builder from "./Builder.jsx"
import Champions from "./ChampionsList.jsx"
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
    const [tips, setTips] = useState("")
    return (
        <form className={style.containerCrearCompo} onSubmit={()=>{}}>
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
            <input type="number" defaultValue={1}></input>
            </label>
            <label htmlFor="tiers">Dificulty:
            <select name="tiers" id="tiers">
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>
            </label>
            <label htmlFor="tiers">Title:
            <input type="text" value={titulo}></input>
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
            <Builder/>
            <Champions />
            <label htmlFor="gameplay">Gameplay:
                <input type="text" value={gameplay.toString()}></input>
            </label>
            <label htmlFor="tips">Tips:
                <input type="text" value={tips}></input>
            </label>

            <input type="submit" value="Crear Compo"/>
        </form>

    )
}

export default CrearCompoTFT