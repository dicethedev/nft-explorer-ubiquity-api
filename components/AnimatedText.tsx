import React from 'react'

const AnimatedText = ({ text }: any) => {

      const words = text.split(" ");
     //  console.log(words)

     return (
          <>
          <div>
             {words.map((word, index) => {
               <span key={index}>
               {word}
               </span>
             })}
          </div>
           
          </>
     )
}

export default AnimatedText
