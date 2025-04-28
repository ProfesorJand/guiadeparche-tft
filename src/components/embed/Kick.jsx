import React from "react";

const Kick = ()=>{
  return (
    <div id="kick-embed"><iframe src="https://player.kick.com/reliclol" height="auto" width="100%" frameborder="0" scrolling="no" allowfullscreen="true"></iframe>
    <style>{`
      #kick-embed {
        display: flex;
        position: relative;
        box-sizing: border-box;
        width: 100%;
        aspect-ratio: 16/9;
        padding: calc(9rem / 16) 1rem;
      }
      `}
    </style>
    </div>
  )
}

export default Kick;