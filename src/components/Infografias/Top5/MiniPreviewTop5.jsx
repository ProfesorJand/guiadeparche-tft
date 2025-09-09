import Style from './InfografiaTop5.module.css';
const MiniPreviewTop5 = ({index, item, setInfografia})=>{
  const scaleX = item.miniPreviewRenderedWidth / item.renderedWidth;
  const scaleY = item.miniPreviewRenderedHeight / item.renderedHeight;
  return (
        <div
          className={Style.Top5Image}
          style={{ 
            width: item.widthFather,
            height:"45px",
            backgroundColor:"white"
          }}
          >
          {item.image ? (
            <img
              className={Style.image}
              src={item.image}
              alt={`Top ${index + 1}`}
              style={{
                transform: `translate(${parseInt(item.left) * scaleX}px,${parseInt(item.top) * scaleY}px) `,
                width: item.width,
                // height: item.height,
                objectFit: item.objectFit
              }}
              onLoad={(e) => {
                const rect = e.target.getBoundingClientRect();
                setInfografia(prev=>{
                  const newData = [...prev.Top5Data];
                  newData[index].miniPreviewRenderedWidth = rect.width;
                  newData[index].miniPreviewRenderedHeight = rect.height;
                  return { ...prev, Top5Data: newData };
                });
              }}
            />
          ) : (
            null
          )}
        </div>
  )
}

export default MiniPreviewTop5;