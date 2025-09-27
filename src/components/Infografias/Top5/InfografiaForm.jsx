import Style from './InfografiaTop5.module.css';
import { useState } from 'react';
import { hexToRgba, exportInfografia, importInfografia } from './utils';
import MiniPreviewTop5 from './MiniPreviewTop5';
const InfografiaForm = ({infografia, setInfografia, onButtonClick}) => {
  const [pestana, setPestana] = useState({
    titulo:false,
    background:false,
    top5:true,
    footer:false,
    numero:false,
  });
  return (
    <div className={Style.Formulario}>
      <span>Formulario de Infografía Top 5</span>
      <div className={Style.Pestanas}>
        <div 
          className={pestana.titulo ? Style.PestanaActiva : Style.Pestana}  
          onClick={()=>setPestana({titulo:true, background:false, top5:false, logos:false, footer:false, numero:false})}
        >
          Titulo
        </div>
        <div 
          className={pestana.background ? Style.PestanaActiva : Style.Pestana}  
          onClick={()=>setPestana({titulo:false, background:true, top5:false, logos:false, footer:false, numero:false})}
        >
          Background
        </div>
        <div 
          className={pestana.top5 ? Style.PestanaActiva : Style.Pestana}  
          onClick={()=>setPestana({titulo:false, background:false, top5:true, logos:false, footer:false, numero:false})}
        >
          Top 5
        </div>
        <div 
          className={pestana.footer ? Style.PestanaActiva : Style.Pestana}
          onClick={()=>setPestana({titulo:false, background:false, top5:false, logos:false, footer:true, numero:false})}
        >
          Footer
        </div>
        <div 
          className={pestana.numero ? Style.PestanaActiva : Style.Pestana}
          onClick={()=>setPestana({titulo:false, background:false, top5:false, logos:false, footer:false, numero:true})}  
        >
          Número
        </div>
      </div>

        <div className={Style.FormularioHeader}>
          {pestana.titulo && 
          <div className={Style.ContainerTituloController}>
            <div 
              style={{
                display:"flex",
                flexDirection:"column"  
              }}
            >
              <label>
                centrar titulo Vertical:
              </label>
              <input 
                onChange={(e)=>setInfografia(prev=>({...prev, tituloContainerAling: e.target.checked, tituloHorizontal:null }))}
                type="checkbox" name="" id="" 
                checked={infografia.tituloContainerAling }/>
                <label>
                centrar titulo Horizontal:
              </label>
              <input 
                onChange={(e)=>setInfografia(prev=>({...prev, tituloContainerJustify: e.target.checked, tituloVertical:null }))}
                type="checkbox" name="" id="" 
                checked={infografia.tituloContainerJustify }/>
              
            </div>
            <div style={{
                display:"flex",
                flexDirection:"column"  
              }}>
            <textarea  
              className={Style.InputTitulo}
              rows="3"
              type="text" 
              value={infografia.titulo} 
              onChange={(e)=>setInfografia(prev => ({...prev, titulo: e.target.value}))}
              placeholder="Título de la Infografía" 
            />
            <label 
              for={"tamañoTextoTitulo"} 
              onClick={()=>{
                setInfografia(prev=> ({...prev, tituloSize: prev.defaultTituloSize}))
              }}
            >
              Tamaño de letra: {infografia.tituloSize}
            </label>
            <input 
              id={"tamañoTextoTitulo"} 
              type="number"
              min={0}
              max={150}
              value={parseInt(infografia.tituloSize)}
              onChange={(e)=>{
                setInfografia(prev=> ({...prev, tituloSize: e.target.value + "px"}))
              }}
              />
              <label for={"horizontalTitulo"}
                onClick={()=>{
                  setInfografia(prev=> ({...prev, tituloHorizontal: prev.defaultTituloHorizontal}))
                }}
              >Horizontal: {infografia.tituloHorizontal}</label>
              <input
                id={"horizontalTitulo"}
                type="range"
                min={0}
                max={infografia.widthContainerTitulo}
                step={0.01}
                value={parseInt(infografia.tituloHorizontal)|| 0}
                onChange={(e)=>{
                  setInfografia(prev=>({...prev, tituloHorizontal: e.target.value+"px"}));
                }}
              />
              <label for={"verticalTitulo"}
                onClick={()=>{
                  setInfografia(prev=> ({...prev, tituloVertical: prev.defaultTituloVertical}))
                }}
              >Vertical: {infografia.tituloVertical}</label>
              <input
                id={"verticalTitulo"}
                type="range"
                min={0}
                max={infografia.heightContainerTitulo}
                step={0.01}
                value={parseInt(infografia.tituloVertical)|| 0}
                onChange={(e)=>{
                  setInfografia(prev=>({...prev, tituloVertical: e.target.value+"px"}));
                }}
              />
              <label for={"textAlingTitulo"}>Aliniamieto: {infografia.tituloTextAling}</label>
              <select 
                value={infografia.tituloTextAling || "center"} 
                onChange={(e)=>{
                  setInfografia(prev=>({...prev, tituloTextAling: e.target.value}));
                }}
              >
                <option value="center">center</option>
                <option value="start">start</option>
                <option value="end">end</option>
                <option value="left">left</option>
                <option value="right">right</option>
                <option value="justify">justify</option>
              </select>

              <label onClick={()=>setInfografia(prev=>({...prev, colorTitulo: "rgba(255, 255, 255,1)"}))}>Color Titulo</label>
              <input
                type="color"
                value={infografia.colorTitulo || "rgba(255, 255, 255,1)"}
                onChange={(e)=>setInfografia(prev=>({...prev, colorTitulo: e.target.value}))}
              />
              </div>
              <div style={{
                display:"flex",
                flexDirection:"column"  
              }}>
                <label>
                  Activar Minileyenda
                </label>
                <input 
                  onChange={(e)=>setInfografia(prev=>({...prev, hasMiniLeyenda: e.target.checked }))}
                  type="checkbox" name="" id="" 
                  checked={infografia.hasMiniLeyenda }/>
                  {
                    infografia.hasMiniLeyenda && <>
                    
                <textarea  
                  className={Style.InputMinileyenda}
                  rows="3"
                  type="text" 
                  value={infografia.miniLeyenda} 
                  onChange={(e)=>setInfografia(prev => ({...prev, miniLeyenda: e.target.value}))}
                  placeholder="miniLeyenda" 
                />
                <label 
                  for={"tamañoTextoMinileyenda"} 
                  onClick={()=>{
                    setInfografia(prev=> ({...prev, miniLeyendaSize: prev.defaultMiniLeyendaSize}))
                  }}
                >
                  Tamaño de letra: {infografia.miniLeyendaSize}
                </label>
                <input 
                  id={"tamañoTextoMinileyenda"} 
                  type="number"
                  min={0}
                  max={150}
                  value={parseInt(infografia.miniLeyendaSize)}
                  onChange={(e)=>{
                    setInfografia(prev=> ({...prev, miniLeyendaSize: e.target.value + "px"}))
                  }}
                  />

                <label for={"horizontalMinileyenda"}
                  onClick={()=>{
                    setInfografia(prev=>({...prev, miniLeyendaHorizontal: infografia.defaultMiniLeyendaHorizontal}));
                  }}
                >Horizontal: {infografia.miniLeyendaHorizontal}</label>
                <input
                  id={"horizontalMinileyenda"}
                  type="range"
                  min={0}
                  max={infografia.widthContainerTitulo}
                  step={0.01}
                  value={parseInt(infografia.miniLeyendaHorizontal)|| 0}
                  onChange={(e)=>{
                    setInfografia(prev=>({...prev, miniLeyendaHorizontal: e.target.value+"px"}));
                  }}
                />
                <label for={"verticalMinileyenda"} 
                  onClick={()=>{
                    setInfografia(prev=>({...prev, miniLeyendaVertical: infografia.defaultMiniLeyendaVertical}));
                  }}>
                  Vertical: {infografia.miniLeyendaVertical}</label>
                <input
                  id={"verticalMinileyenda"}
                  type="range"
                  min={0}
                  max={infografia.heightContainerTitulo *2}
                  step={0.01}
                  value={parseInt(infografia.miniLeyendaVertical)|| 0}
                  onChange={(e)=>{
                    setInfografia(prev=>({...prev, miniLeyendaVertical: e.target.value+"px"}));
                  }}
                />
                <label>
                  Color Texto Minileyenda
                </label>
                <input
                  type="color"
                  value={infografia.minileyendaTextoColor}
                  onChange={(e)=>{
                    setInfografia((prev)=>({
                      ...prev, 
                      minileyendaTextoColor: e.target.value,
                    }))
                  }}
                />
                <label>
                  Color Background Minileyenda
                </label>
                <input
                  type="color"
                  value={infografia.minileyendaBackgroundColor}
                  onChange={(e)=>{
                    setInfografia((prev)=>({
                      ...prev, 
                      minileyendaBackgroundColorBase: e.target.value,
                      minileyendaBackgroundColor: hexToRgba(e.target.value, prev.minileyendaBackgroundAlpha)
                    }))
                  }}
                />
                <label>
                  Transparencia Bakground Minileyenda
                </label>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={infografia.minileyendaBackgroundAlpha || 1 }
                  onChange={(e)=>{
                    setInfografia((prev)=>({
                      ...prev,
                      minileyendaBackgroundAlpha: e.target.value,
                      minileyendaBackgroundColor: hexToRgba(prev.minileyendaBackgroundColorBase, e.target.value)
                    }))
                  }}
                />
                </>
                }
              </div>
              <div>
                <label>Agregar imagen:</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setInfografia(prev => ({ ...prev, imgTitulo: reader.result }));
                    };
                    reader.readAsDataURL(file);
                  }} 
                />
              </div>
          </div>
          }
          {pestana.background &&
            <>
              <label>Cambiar Fondo:</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setInfografia(prev => ({ ...prev, imgBackground: reader.result }));
                  };
                  reader.readAsDataURL(file);
                }} 
              />
              <label>Oscurecer Fondo:</label>
              <input 
                type="number" 
                min={0}
                max={2}
                step={0.1}
                value={infografia.brilloBackground}
                onChange={(e) => {
                  setInfografia((prev)=>({
                    ...prev,
                    brilloBackground: e.target.value
                  }))
                }} 
              />
            </>
          }
        </div>

        {/* 🔹 Formulario Top 5 */}
        {pestana.top5 && 
        <div className={Style.Top5Form}>
          {infografia.Top5Data.map((item, index) => (
            <div key={index} className={Style.Top5FormItem}>
              <span>Top {index + 1}</span>
              <div className={Style.Top5FormItemData}>
                <div className={Style.Top5FormItemInputs}>
                  <input 
                    type="text" 
                    value={item.info} 
                    placeholder="Información" 
                    onChange={(e)=>{
                      setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].info = e.target.value;
                        return { ...prev, Top5Data: newData };
                      });
                    }}
                  />
                  <label
                    onClick={()=>(setInfografia(prev=>{
                      const newData = [...prev.Top5Data];
                        newData[index].infoSize = prev.defaultTextInfo;
                        return { ...prev, Top5Data: newData };
                    }))}
                  >
                    Tamaño Info
                  </label>
                  <input 
                    type="number" 
                    min={0}
                    max={50}
                    value={parseInt(item.infoSize || item.defaultTextInfo)} 
                    placeholder={parseInt(item.defaultTextInfo)} 
                    onChange={(e)=>{
                      setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].infoSize = e.target.value +'px';
                        return { ...prev, Top5Data: newData };
                      });
                    }}
                  />
                  <label
                    onClick={()=>(setInfografia(prev=>{
                      const newData = [...prev.Top5Data];
                        newData[index].infoWeightSize = prev.defaultTextWeightInfo;
                        return { ...prev, Top5Data: newData };
                    }))}
                  >
                    Font Weight Info
                  </label>
                  <input 
                    type="number" 
                    min={0}
                    max={50}
                    value={parseInt(item.infoWeightSize || item.defaultTextWeightInfo)} 
                    placeholder={parseInt(item.defaultTextWeightInfo)} 
                    onChange={(e)=>{
                      setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].infoWeightSize = e.target.value;
                        return { ...prev, Top5Data: newData };
                      });
                    }}
                  />
                  <label>
                    Horizontal Info
                  <input 
                    type="number" 
                    min={0}
                    max={parseInt(item.heightItemsContainer)}
                    value={parseInt(item.infoHorizontal || item.defaultHorizontalInfo)} 
                    placeholder={"max: "+ parseInt(infografia.heightItemsContainer)} 
                    onChange={(e)=>{
                      setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].infoHorizontal = e.target.value +'px';
                        return { ...prev, Top5Data: newData };
                      });
                    }}
                  />
                  </label>

                  <label onClick={()=>
                    setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].infoColor = item.defaultColorInfo;
                        return { ...prev, Top5Data: newData };
                      })
                  }>Color Info</label>
                  <input
                    type="color"
                    value={item.infoColor || item.defaultColorInfo}
                    onChange={(e)=>
                      setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].infoColor = e.target.value;
                        return { ...prev, Top5Data: newData };
                      })
                    }
                  />
                  <label onClick={()=>
                    setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].backgroundColorInfo = item.defaultInfoBackgroundColor;
                        return { ...prev, Top5Data: newData };
                      })
                  }>Background Color Info</label>
                  <input
                    type="color"
                    value={item.backgroundColorInfo || item.defaultInfoBackgroundColor}
                    onChange={(e) =>
                    {
                      setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].infoBackgroundColorBase = e.target.value;
                        newData[index].infoBackgroundColor = hexToRgba(e.target.value, item.backgroundColorAlphaInfo || 0.5);
                        return { ...prev, Top5Data: newData };
                      })
                    }
                    }
                  />
                  <label onClick={()=>
                    setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].backgroundColorAlphaInfo = 1;
                        return { ...prev, Top5Data: newData };
                      })
                  }
                  >Transparencia Fondo: {item.backgroundColorAlphaInfo}</label>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={item.backgroundColorAlphaInfo || 1}
                    onChange={(e) =>
                      {setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].backgroundColorAlphaInfo = e.target.value;
                        newData[index].infoBackgroundColor = hexToRgba(item.infoBackgroundColorBase , parseFloat(e.target.value));
                        return { ...prev, Top5Data: newData };
                      })
                    }}
                  />
                    {/* VALUE */}
                  <input 
                    type="text" 
                    value={item.value} 
                    placeholder="Valor"
                    onChange={(e)=>{
                      setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].value = e.target.value;
                        return { ...prev, Top5Data: newData };
                      });
                    }}
                  />
                  <label
                    onClick={()=>(setInfografia(prev=>{
                      const newData = [...prev.Top5Data];
                        newData[index].valueSize = prev.defaultTextSize;
                        return { ...prev, Top5Data: newData };
                    }))}
                  >
                    Tamaño Value
                  </label>
                  <input 
                    type="number" 
                    min={0}
                    max={50}
                    value={parseInt(item.valueSize || item.defaultTextSize)} 
                    placeholder={parseInt(item.defaultTextSize)} 
                    onChange={(e)=>{
                      setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].valueSize = e.target.value +'px';
                        return { ...prev, Top5Data: newData };
                      });
                    }}
                  />
                  <label
                    onClick={()=>(setInfografia(prev=>{
                      const newData = [...prev.Top5Data];
                        newData[index].valueWeightSize = prev.defaultTextWeightSize;
                        return { ...prev, Top5Data: newData };
                    }))}
                  >
                    Font Weight Value
                  </label>
                  <input 
                    type="number" 
                    min={0}
                    max={50}
                    value={parseInt(item.valueWeightSize || item.defaultTextWeightSize)} 
                    placeholder={parseInt(item.defaultTextWeightSize)} 
                    onChange={(e)=>{
                      setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].valueWeightSize = e.target.value;
                        return { ...prev, Top5Data: newData };
                      });
                    }}
                  />
                  <label>
                    Horizontal Value
                  <input 
                    type="number" 
                    min={0}
                    max={parseInt(item.heightItemsContainer)}
                    value={parseInt(item.valueHorizontal || item.defaultHorizontalSize)} 
                    placeholder={"max: "+ parseInt(infografia.heightItemsContainer)} 
                    onChange={(e)=>{
                      setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].valueHorizontal = e.target.value +'px';
                        return { ...prev, Top5Data: newData };
                      });
                    }}
                  />
                  </label>

                  <label onClick={()=>
                    setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].valueColor = item.defaultColorValue;
                        return { ...prev, Top5Data: newData };
                      })
                  }>Color Value</label>
                  <input
                    type="color"
                    value={item.valueColor || item.defaultColorValue}
                    onChange={(e)=>
                      setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].valueColor = e.target.value;
                        return { ...prev, Top5Data: newData };
                      })
                    }
                  />
                  <label onClick={()=>
                    setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].valueColor = item.defaultValueBackgroundColor;
                        return { ...prev, Top5Data: newData };
                      })
                  }>Background Color Value</label>
                  <input
                    type="color"
                    value={item.backgroundColorValue || item.defaultValueBackgroundColor}
                    onChange={(e) =>
                    {
                      setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].valueBackgroundColorBase = e.target.value;
                        newData[index].valueBackgroundColor = hexToRgba(e.target.value, item.backgroundColorAlpha || 0.5);
                        return { ...prev, Top5Data: newData };
                      })
                    }
                    }
                  />
                  <label onClick={()=>setInfografia(prev=>({...prev, backgroundColorAlpha: 0.5}))}>Transparencia Fondo: {infografia.backgroundColorAlpha}</label>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={item.backgroundColorAlpha || 0.5}
                    onChange={(e) =>
                      {setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].backgroundColorAlpha = e.target.value;
                        newData[index].valueBackgroundColor = hexToRgba(item.valueBackgroundColorBase , parseFloat(e.target.value));
                        return { ...prev, Top5Data: newData };
                      })
                    }}
                  />
                  <input 
                    type="text" 
                    value={item.image || ""} 
                    placeholder="URL de la Imagen"
                    onChange={(e)=>{
                      setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].image = e.target.value;
                        return { ...prev, Top5Data: newData };
                      });
                    }} 
                  />
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setInfografia(prev => {
                          const newData = [...prev.Top5Data];
                          newData[index].image = reader.result;
                          return { ...prev, Top5Data: newData };
                        });
                      };
                      reader.readAsDataURL(file);
                    }} 
                  />
                </div>

                {/* 🔹 Sliders */}
                <div className={Style.ImageStyleContainer}>
                  <label onClick={()=>reset(index, "top",setInfografia)}>Vertical: {item.top}</label>
                  <input
                    type="range"
                    min={-item.renderedHeight || -500}
                    max={0}
                    step={0.01}
                    value={parseInt(item.top)|| 0}
                    onChange={(e)=>{
                      setInfografia(prev=>{
                        const newData = [...prev.Top5Data];
                        newData[index].top = e.target.value + "px";
                        return { ...prev, Top5Data: newData };
                      });
                    }}
                  />

                  <label onClick={()=>reset(index, "left", setInfografia)}>Horizontal: {item.left}</label>
                  <input
                    type="range"
                    min={-item.renderedWidth || -500}
                    max={item.renderedWidth || 500}
                    step={0.01}
                    value={parseInt(item.left) || 0}
                    onChange={(e)=>{
                      setInfografia(prev=>{
                        const newData = [...prev.Top5Data];
                        newData[index].left = e.target.value + "px";
                        return { ...prev, Top5Data: newData };
                      });
                    }}
                  />

                  <label onClick={()=>reset(index, "width", setInfografia)}>Ancho: {item.width}</label>
                  <input
                    type="range"
                    min={0}
                    max={200}
                    step={0.01}
                    value={item.width.replace("%","") || 0}
                    onChange={(e)=>{
                      setInfografia(prev=>{
                        const newData = [...prev.Top5Data];
                        newData[index].width = e.target.value + "%";
                        return { ...prev, Top5Data: newData };
                      });
                    }}
                  />

                  <label onClick={()=>reset(index, "height", setInfografia)}>Ancho Componente: {item.widthFather}</label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={0.01}
                    value={item.widthFather.replace("%","") || 0}
                    onChange={(e)=>{
                      setInfografia(prev=>{
                        const newData = [...prev.Top5Data];
                        newData[index].widthFather = e.target.value + "%";
                        return { ...prev, Top5Data: newData };
                      });
                    }}
                  />

                  <select 
                    value={item.objectFit} 
                    onChange={(e)=>{
                      setInfografia(prev=>{
                        const newData = [...prev.Top5Data];
                        newData[index].objectFit = e.target.value;
                        return { ...prev, Top5Data: newData };
                      });
                    }}
                  >
                    <option value="cover">cover</option>
                    <option value="contain">contain</option>
                    <option value="fill">fill</option>
                    <option value="none">none</option>
                    <option value="scale-down">scale-down</option>
                  </select>
                  <MiniPreviewTop5 index={index} item={item} setInfografia={setInfografia}/>
                </div>
                <div style={{
                  display:"flex",
                  flexDirection:"column"
                }}>
                  <label>IMG de Logos</label>
                  <input 
                    type="text" 
                    value={item.imageLogo || ""} 
                    placeholder="URL de la Imagen"
                    onChange={(e)=>{
                      setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].imageLogo = e.target.value;
                        return { ...prev, Top5Data: newData };
                      });
                    }} 
                  />
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setInfografia(prev => {
                          const newData = [...prev.Top5Data];
                          newData[index].imageLogo = reader.result;
                          return { ...prev, Top5Data: newData };
                        });
                      };
                      reader.readAsDataURL(file);
                    }} 
                  />
                  <label
                   onClick={()=>{
                      setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].horizontalLogo = 0+"px";
                        return { ...prev, Top5Data: newData };
                      });
                    }}
                  >
                    horizontal Logo
                  </label>
                  <input
                    type={"range"}
                    min={-infografia.widthItemsContainer}
                    max={infografia.widthItemsContainer}
                    value={parseInt(item.horizontalLogo) || 0}
                    onChange={(e)=>{
                      setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].horizontalLogo = e.target.value+"px";
                        return { ...prev, Top5Data: newData };
                      });
                    }}
                  />
                  <label
                    onClick={()=>{
                      setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].verticalLogo = 0+"px";
                        return { ...prev, Top5Data: newData };
                      });
                    }}
                  >
                    vertical Logo
                  </label>
                  <input
                    type={"range"}
                    min={-infografia.heightItemsContainer}
                    max={infografia.heightItemsContainer}
                    value={parseInt(item.verticalLogo) || 1}
                    onChange={(e)=>{
                      setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].verticalLogo = e.target.value+"px";
                        return { ...prev, Top5Data: newData };
                      });
                    }}
                  />
                  <label>
                    Scale Logo
                  </label>
                  <input
                    type={"range"}
                    min={0}
                    max={1}
                    value={item.scaleLogoContainer || 0}
                    step={0.1}
                    onChange={(e)=>{
                      setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].scaleLogoContainer = e.target.value;
                        return { ...prev, Top5Data: newData };
                      });
                    }}
                  />
                  <label>
                    Color Borde en logo "png"
                  </label>
                  <input
                    type={"color"}
                    value={item.colorBorderBaseLogo || 0}
                    onChange={(e)=>{
                      setInfografia(prev => {
                        const newData = [...prev.Top5Data];
                        newData[index].colorBorderBaseLogo = e.target.value;
                        newData[index].colorBorderLogo = hexToRgba(e.target.value, prev.alphaBorderLogo)
                        return { ...prev, Top5Data: newData };
                      });
                    }}
                  />
                  <label>
                    Transparencia Color Borde en logo "png"
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={item.alphaBorderLogo}
                    onChange={(e) => {
                      const newAlpha = parseFloat(e.target.value);
                      setInfografia((prev) => {
                        const updatedTop5 = [...prev.Top5Data];
                        updatedTop5[index] = {
                          ...updatedTop5[index],
                          alphaBorderLogo: newAlpha,
                          colorBorderLogo: hexToRgba(updatedTop5[index].colorBorderBaseLogo, newAlpha)
                        };
                        return { ...prev, Top5Data: updatedTop5 };
                      });
                    }}
                  />
                  <label>
                    Brillo Logo
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={item.brilloLogo}
                    onChange={(e) => {
                      const newAlpha = parseFloat(e.target.value);
                      setInfografia((prev) => {
                        const updatedTop5 = [...prev.Top5Data];
                        updatedTop5[index] = {
                          ...updatedTop5[index],
                          brilloLogo: newAlpha,
                        };
                        return { ...prev, Top5Data: updatedTop5 };
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
          </div>}

          {pestana.footer &&
          
          <div className={Style.FooterControl}>
            <div className={Style.ContainerLogoController}>

          <input type="button" className={Style.inputVersion} onClick={()=>setInfografia(prev => ({...prev, logoJupeson: !prev.logoJupeson}))} value="Logo Jupeson" />
          <label 
            for={"rangeScaleLogoJupeson"}
            onClick={()=>setInfografia(prev=>({...prev, scaleLogoJupeson: prev.defaultScaleLogoJupeson}))}
          >
            Escala1: {infografia.scaleLogoJupeson}
          </label>
          <input
            id={"rangeScaleLogoJupeson"}
            type="range" 
            className={Style.inputVersion} 
            min={0.1} max={2} step={0.01} 
            value={Math.round(Number(infografia.scaleLogoJupeson) * 100)}  // 👈 nada de parseInt
            onChange={
              (e)=>setInfografia(prev => (
                {...prev, scaleLogoJupeson: e.target.value}
              ))
            } 
            />
          
          <label 
            for={"AnchoLogoJupeson"}
            onClick={()=>setInfografia(
              prev=>({...prev, scaleLogoJupeson: prev.defaultScaleLogoJupeson}))
            }>
            Ancho: {infografia.widthLogoJupeson}
          </label>
          <input 
            id={"AnchoLogoJupeson"} 
            type="range" 
            className={Style.inputVersion} 
            min={0} max={100} step={1} 
            value={parseInt(infografia.widthLogoJupeson)} 
            onChange={
              (e)=>setInfografia(
                prev => ({...prev, widthLogoJupeson: e.target.value+"%"}))
              } 
              />

          <label for={"HorizontalLogoJupeson"} onClick={()=>setInfografia(prev=>({...prev, logoLeftJupeson: prev.defaultLeftLogoJupeson}))}>Desplazamiento X: {infografia.leftLogoJupeson}</label>
          <input
            id={"HorizontalLogoJupeson"}
            type="range"
            min={0}
            max={100}
            step={1}
            value={parseInt(infografia.leftLogoJupeson)}
            onChange={(e)=>setInfografia(prev=>({...prev, leftLogoJupeson: e.target.value+"%"}))}
            />

          <label for={"TransparenciaLogoJupeson"} onClick={()=>setInfografia(prev=>({...prev, logoJupesonAlpha: prev.defaultLogoJupesonAlpha}))}>Transparencia Jupeson: {infografia.logoJupesonAlpha}</label>
          <input
            id={"TransparenciaLogoJupeson"}
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={infografia.logoJupesonAlpha}
            onChange={(e)=>setInfografia(prev=>({...prev, logoJupesonAlpha: e.target.value}))}
            />
            <label for={"BrilloLogoJupeson"} onClick={()=>setInfografia(prev=>({...prev, BrilloLogoJupeson: 1}))}>Brillo Movilnet: {infografia.BrilloLogoJupeson}</label>
            <input
              id={"BrilloLogoJupeson"}
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={infografia.BrilloLogoJupeson}
              onChange={(e)=>setInfografia(prev=>({...prev, BrilloLogoJupeson: e.target.value}))}
              />
          
          </div>
          <div className={Style.ContainerLogoController}>

          <input type="button" className={Style.inputVersion} onClick={()=>setInfografia(prev => ({...prev, logoMovilnet: !prev.logoMovilnet}))} value="Logo Movilnet" />
          <label
            for={"ScaleLogoMovilnet"}
            onClick={()=>setInfografia(
              prev=>({...prev, scaleLogoMovilnet: defaultScaleLogoMovilnet}))
            }
            >Escala: {infografia.scaleLogoMovilnet}</label>
          <input
            id="ScaleLogoMovilnet"
            type="range"
            className={Style.inputVersion}
            min={0}
            max={200}
            step={1}
            value={Math.round(Number(infografia.scaleLogoMovilnet) * 100)}  // 👈 nada de parseInt
            onChange={(e) =>
              setInfografia(prev => ({
                ...prev,
                scaleLogoMovilnet: Number(e.target.value) / 100,           // 👈 asegurá número
              }))
            }
            />
          <label 
            for={"AnchoLogoMovilnet"}
            onClick={()=>setInfografia(
              prev=>({...prev, widthLogoMovilnet: prev.defaultWidthLogoMovilnet}))
            }
          >Ancho: {infografia.widthLogoMovilnet}</label>
          <input 
            id={"AnchoLogoMovilnet"}
            type="range" 
            className={Style.inputVersion} 
            min={0} max={100} step={1} value={parseInt(infografia.widthLogoMovilnet)} 
            onChange={
              (e)=>setInfografia(prev => ({
                ...prev, widthLogoMovilnet: e.target.value+"%"}))
              } 
          />
            <label for={"HorizontalLogoMovilnet"} onClick={()=>setInfografia(prev=>({...prev, leftLogoMovilnet: prev.defaultLeftLogoMovilnet}))}>Desplazamiento X: {infografia.leftLogoMovilnet}</label>
            <input
              id={"HorizontalLogoMovilnet"}
              type="range"
              min={0}
              max={100}
              step={1}
              value={parseInt(infografia.leftLogoMovilnet)}
              onChange={(e)=>setInfografia(prev=>({...prev, leftLogoMovilnet: e.target.value+"%" }))}
            />
          <label for={"TransparenciaLogoMovilnet"} onClick={()=>setInfografia(prev=>({...prev, logoMovilnetAlpha: prev.defaultLogoMovilnetAlpha}))}>Transparencia Movilnet: {infografia.logoMovilnetAlpha}</label>
          <input
            id={"TransparenciaLogoMovilnet"}
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={infografia.logoMovilnetAlpha}
            onChange={(e)=>setInfografia(prev=>({...prev, logoMovilnetAlpha: e.target.value}))}
            />
            <label for={"BrilloLogoMovilnet"} onClick={()=>setInfografia(prev=>({...prev, BrilloLogoMovilnet: 1}))}>Brillo Movilnet: {infografia.BrilloLogoMovilnet}</label>
            <input
              id={"BrilloLogoMovilnet"}
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={infografia.BrilloLogoMovilnet}
              onChange={(e)=>setInfografia(prev=>({...prev, BrilloLogoMovilnet: e.target.value}))}
              />
            </div>
            <select
              value={infografia.justifyContentFooter}
              onChange={(e) => setInfografia(prev => ({ ...prev, justifyContentFooter: e.target.value }))}
              >
              <option value="flex-start">Justify Left</option>
              <option value="center">Justify Center</option>
              <option value="flex-end">Justify Right</option>
              <option value="space-between">Justify Space Between</option>
              <option value="space-around">Justify Space Around</option>
              <option value="space-evenly">Justify Space Evenly</option>
            </select>

            {/* Asterisco */}
            <div>
              <input 
              type='button' 
              value={infografia.tieneAsterisco ? "Eliminar Asterisco":"Agregar Asterisco"}
              onClick={()=>setInfografia((prev)=>(
                {...prev, tieneAsterisco:!prev.tieneAsterisco}
              ))}
              
              />
              <textarea  
                className={Style.InputTitulo}
                rows="3"
                type="text" 
                value={infografia.textoAsterisco} 
                onChange={(e)=>setInfografia(prev => ({...prev, textoAsterisco: e.target.value}))}
                placeholder="Texto asterisco" 
              />

            </div>
          </div>
        }

        {pestana.numero && <div className={Style.NumberTopEdition}>
          <label>Ocultar Numero {infografia.hideNumber}</label>
          <input  
            type="checkbox" 
            value={infografia.hideNumber} 
            onClick={(e)=>setInfografia(prev=>({...prev, hideNumber: e.target.checked}))} 
          />
          <label onClick={()=>setInfografia(prev=>({...prev, fontSizeNumber: "48px"}))}>Tamaño Número: {infografia.fontSizeNumber}</label>
          <input  
            type="range" 
            min={10} 
            max={200}
            step={1}
            value={parseInt(infografia.fontSizeNumber)} 
            onChange={(e)=>setInfografia(prev=>({...prev, fontSizeNumber: e.target.value+"px"}))} 
          />
          
          <label onClick={()=>setInfografia(prev=>({...prev, backgroundColorAlpha: 0.5}))}>Transparencia Fondo: {infografia.backgroundColorAlpha}</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={infografia.backgroundColorAlpha}
            onChange={(e) =>
              setInfografia((prev) => ({
                ...prev,
                backgroundColorAlpha: parseFloat(e.target.value),
                backgroundColorNumber: hexToRgba(prev.backgroundColorBase, parseFloat(e.target.value))
              }))
            }
          />
          <label onClick={()=>setInfografia(prev=>({...prev, borderRadiusNumber: "50%"}))}>Border Radius Número: {infografia.borderRadiusNumber}</label>
          <input
            type="range"  
            min={0}
            max={50}
            step={1}
            value={parseInt(infografia.borderRadiusNumber)}
            onChange={(e)=>setInfografia(prev=>({...prev, borderRadiusNumber: e.target.value+"%"}))}
          />
          <label onClick={()=>setInfografia(prev=>({...prev, widthNumber: "80px"}))}>Ancho Número: {infografia.widthNumber}</label>
          <input
            type="range"
            min={20}
            max={200}
            step={1}
            value={parseInt(infografia.widthNumber)}
            onChange={(e)=>setInfografia(prev=>({...prev, widthNumber: e.target.value+"px"}))}
          />
          <label onClick={()=>setInfografia(prev=>({...prev, heightNumber: "80px"}))}>Alto Número: {infografia.heightNumber}</label>
          <input
            type="range"
            min={20}
            max={200}
            step={1}
            value={parseInt(infografia.heightNumber)}
            onChange={(e)=>setInfografia(prev=>({...prev, heightNumber: e.target.value+"px"}))}
          />
          <label onClick={()=>setInfografia(prev=>({...prev, colorNumber: "rgba(255, 255, 255,1)"}))}>Color Numero</label>
          <input
            type="color"
            value={infografia.colorNumber}
            onChange={(e)=>setInfografia(prev=>({...prev, colorNumber: e.target.value}))}
          />
          <label onClick={()=>setInfografia(prev=>({...prev, backgroundColorNumber: "rgba(0,0,0,0.5)"}))}>Color Fondo</label>
          <input
            type="color"
            value={infografia.backgroundColorNumber}
            onChange={(e) =>
              setInfografia((prev) => ({
                ...prev,
                backgroundColorBase: e.target.value,
                backgroundColorNumber: hexToRgba(e.target.value, prev.backgroundColorAlpha)
              }))
            }
          />
        </div>}
        <input type="button" className={Style.inputVersion} onClick={onButtonClick} value="Capturar imagen" />
        
        <button onClick={()=>exportInfografia(infografia)}>💾 Guardar Datos</button>
        <label for="importFile">📂 Importar JSON :
        <input 
          id="importFile"
          type="file" 
          accept="application/json" 
          onChange={(e)=>importInfografia(e,setInfografia)} 
          />
        </label>
      </div>
  )
}

export default InfografiaForm;