
const Infografia = ({meta2xko, titulo, version, logoMovilnet})=>{
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        overflow:"hidden",
        position:"relative",
        padding:"20px",
        boxSizing:"border-box",
        zIndex:0,
        top:0,
        left:0,
        aspectRatio:4/5
      }}
    >
      {/* Imagen Background */}
      <img 
      style={{
        zIndex:-1,
        display:"flex",
        position:"absolute",
        height:"100%",
        right:"50%",
        top:0,
        transform:"translate(50%,0%)",
        background:"#000000",
        


      }}
      src={"/2xko/fondos/Background_Red.png"} 
      alt={""}></img>

      {/* Header */}
      <div
        style={{
          display: "flex",
          height: "8%",
          position:"relative"
        }}
      >
        <span>{titulo}</span>
        <span>{version}</span>
      </div>

      {/* Contenido */}
      <div
      style={{
        height: "82%",
        gap: "50px",
        display: "flex",
        flexDirection: "column",
      }}
      >

      {
        Object.keys(meta2xko).map((tier, i)=>{
          return(
            <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "30px", 
              height: `calc((100% / 6) - 30px + (30px / 6))`
            }}
            >
              {/*imagen tier*/}
              <div
                style={{
                  width:`calc(100% / 6)`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                >
                <img
                  src={`/tiers/Tier-${tier}.webp`}
                  style={{
                    width: "100%"
                  }}
                  ></img> 
              </div>
              {
                meta2xko[tier].map((data, posicion)=>{
                  return (
                    <div
                    key={`infografia ${tier} ${posicion}`}
                    style={{
                      display: "flex",
                      gap: "0px",
                      width:`calc(100% / 6)`,
                      
                    }}
                    >
                      {/* Campeon Principal */}
                      <div
                        style={{
                          // backgroundColor: "red",
                          height:"auto",
                          display: "flex",
                          position: "relative",
                          flexDirection: "column",
                        }}
                        >
                        <img 
                          src={data.imagenPrincipal}
                          style={{
                            width: "100%"
                          }}
                          ></img>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            textAlign: "center",
                            fontFamily: "Fatal Fighter",  
                            fontSize: "14px",
                            textShadow: "1px 1px 2px black, 0 0 1px black, 0 0 5px black"
                          }}
                        >
                          {data.nombrePrincipal === "Blitzcrank" ? "Blitz" : data.nombrePrincipal}
                        </div>
                          {/* nombre del campeon absoluto debajo con fondo oscuro semitransparente con letras blancas*/}
                      </div>
                      {/* Campeon Secundario */}
                      <div
                       style={{
                        //  backgroundColor: "yellow",
                         display: "flex",
                         position: "relative",
                         flexDirection: "column",
                        }}
                        >
                          <div
                          style={{
                            position: "relative",
                            width: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            textAlign: "center",
                            fontFamily: "Fatal Fighter",  
                            fontSize: "14px",
                            textShadow: "1px 1px 2px black, 0 0 1px black, 0 0 5px black"
                          }}
                        >
                          {data.nombreSecundario  === "Blitzcrank" ? "Blitz" : data.nombreSecundario }
                        </div>
                        <img src={data.imagenSecundario}
                          style={{
                            width: "100%"
                          }}
                          ></img>
                      </div>
                      
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
      </div>
      

      {/* Footer */}
      <div
      style={{
          display: "flex",
          height: "10%",
          position:"relative"
        }}
      >
        
      </div>
    </div>
  )
}

export default Infografia;