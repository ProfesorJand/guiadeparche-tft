import Footer from './Footer.jsx';
import Style from './InfografiaTop5.module.css';
import { Template } from './utils.js';

const Preview = ({infografia, backgroundRef, setInfografia, containerLogosRef, containerTituloRef, itemsRefs})=>{
  return (
    <div className={Style.Container} ref={backgroundRef}
    >
        <img className={Style.Background} src={infografia.imgBackground} alt="background"
          style={{
            filter:`brightness(${infografia.brilloBackground})`
          }}
        />
        <div 
          ref={containerTituloRef}
          className={Style.Titulo} 
          style={{
            textAlign: infografia.tituloTextAling || "center",
            color: infografia.colorTitulo || "white",
            alignItems: infografia.tituloContainerAling ? "center" : null,
            justifyContent: infografia.tituloContainerJustify ? "center" : null,
            height:Template.Top5.TituloHeight
          }}
        >
          <span
            style={{
              position:"absolute",
              fontSize:infografia.tituloSize,
              left:infografia.tituloHorizontal,
              top: infografia.tituloVertical,
              whiteSpace: "pre-line",
              // WebkitTextStroke: "1px rgba(0, 0, 0, 0.7)",
              filter: `drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.5)) drop-shadow(-5px -5px 5px rgba(0, 0, 0, 0.5))`
            }}>
            {infografia.titulo}
          </span>
          {
            infografia.hasMiniLeyenda && 
          <span
            style={{
              position:"absolute",
              fontSize:infografia.miniLeyendaSize,
              right:infografia.miniLeyendaHorizontal || "2%",
              top: infografia.miniLeyendaVertical || "60%",
              backgroundColor: infografia.minileyendaBackgroundColor,
              color: infografia.minileyendaTextoColor,
              whiteSpace: "pre-line",
              padding: infografia.paddingMiniLeyenda,
              width: infografia.widthMiniLeyenda || "22%",
              borderRadius: "5px",
              textAlign: "center",
              filter: `drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.5)) drop-shadow(-5px -5px 5px rgba(0, 0, 0, 0.5))`,
              fontWeight:800,
              WebkitTextStroke: "1px rgba(0, 0, 0, 0.7)",

            }}>
            {infografia.miniLeyenda}
          </span>
          }
          {infografia.imgTitulo && <img alt="imagen en titulo" src={infografia.imgTitulo}></img>}
        </div>
        <div className={Style.Top5Container}>
          {infografia.Top5Data.map((item, index) => (
            <div key={index} className={[Style.Top5Item, Style[`Top${index + 1}`]].join(" ")}
            ref={itemsRefs}
            >
              <div
                className={Style.Top5Image}
                style={{ 
                  width: item.widthFather }}
                >
                {item.image ? (
                  <img
                    className={Style.image}
                    src={item.image}
                    alt={`Top ${index + 1}`}
                    style={{
                      transform: `translate(${item.left}, ${item.top})`,
                      width: item.width,
                      // height: item.height,
                      objectFit: item.objectFit
                    }}
                    onLoad={(e) => {
                      const rect = e.target.getBoundingClientRect();
                      setInfografia(prev=>{
                        const newData = [...prev.Top5Data];
                        newData[index].renderedWidth = rect.width;
                        newData[index].renderedHeight = rect.height;
                        return { ...prev, Top5Data: newData };
                      });
                    }}
                  />
                ) : (
                  null
                )}
              </div>
              {/* Imagen de LOGOS TOP 5 */}
              <div
                className={Style.Top5ImageLogos}
                style={{ 
                  maxWidth: item.widthFather,
                  height:"100%",
                  maxHeight:"100%",
                  position:"absolute",
                  display:"flex",
                  overflow:"hidden",
                  top:item.verticalLogo || "0px",
                  left:item.horizontalLogo || "150px",
                  scale: item.scaleLogoContainer || 1
                 }}
                >
                {item.imageLogo ? (
                  <img
                    className={Style.imageLogoTop5}
                    src={item.imageLogo}
                    alt={`Top ${index + 1}`}
                    style={{
                      transform: `translate(${item.leftTop5Logo}, ${item.topTop5Logo})`,
                      width: item.widthTop5Logo,
                      // height: item.height,
                      objectFit: item.objectFitTop5Logo,
                      filter: `drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.5)) drop-shadow(-5px -5px 5px rgba(0, 0, 0, 0.5)) brightness(${item.brilloLogo || 1})`
                      
                    }}
                    onLoad={(e) => {
                      const rect = e.target.getBoundingClientRect();
                      setInfografia(prev=>{
                        const newData = [...prev.Top5Data];
                        newData[index].renderedWidth = rect.width;
                        newData[index].renderedHeight = rect.height;
                        return { ...prev, Top5Data: newData };
                      });
                    }}
                  />
                ) : (
                  null
                )}
              </div>
              <div className={Style.Info}
                style={{
                  fontSize:item.infoSize || item.defaultTextInfo,
                  top: item.infoHorizontal || item.defaultHorizontalInfo,
                  fontWeight: item.infoWeightSize || item.defaultTextWeightInfo,
                  // WebkitTextStroke: "1.5px rgba(226, 226, 226, 0.7)",
                  backgroundColor:item.infoBackgroundColor ||  item.defaultInfoBackgroundColor,
                  color:item.infoColor || item.defaultColorInfo,
                }}
              >{item.info}</div>
              <div className={Style.Value} style={{
                fontSize:item.valueSize || item.defaultTextSize,
                top: item.valueHorizontal || item.defaultHorizontalSize,
                fontWeight: item.valueWeightSize || item.defaultTextWeightSize,
                WebkitTextStroke: "1.5px rgba(0, 0, 0, 0.7)",
                color: item.valueColor || item.defaultColorValue, 
                backgroundColor:item.valueBackgroundColor ||  item.defaultValueBackgroundColor,
              }}>{item.value}</div>
              {!infografia?.hideNumber && <div 
                className={Style.NumberTop}
                style={{
                  fontSize: infografia.fontSizeNumber || "48px",
                  color: infografia.colorNumber || "white",
                  backgroundColor: infografia.backgroundColorNumber || "rgba(0,0,0,0.5)",
                  width: infografia.widthNumber || "80px",
                  height: infografia.heightNumber || "80px",
                  borderRadius: infografia.borderRadiusNumber || "50%",

                }}
              >{index+1}</div>}
            </div>
          ))}
        </div>
        <Footer infografia={infografia} containerLogosRef={containerLogosRef} Template={Template} />
      </div>
  )
}

export default Preview;