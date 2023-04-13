import { useState, useEffect , useRef} from "react"


const MoveBox = () => {

const [heightBox, setheightBox] = useState(50)
const [widthBox, setWidthBox] = useState(50)

const requestRef = useRef();
const heightBoxRef = useRef(heightBox);
const widthBoxRef = useRef(widthBox);


useEffect(()=>{
    heightBoxRef.current = heightBox
    widthBoxRef.current = widthBox

})

useEffect(()=>{
    console.log('gaming')
    document.addEventListener('keydown', (e)=>{
        const top = heightBoxRef.current
        const left = widthBoxRef.current

        switch(e.key) {
            case 'ArrowUp':
                if(top>0){
                    setheightBox((prevState) => prevState - 3)
                }
              break;
            case 'ArrowDown':
                if(top<76){
                    setheightBox((prevState) => prevState + 3)
                }
              break;
            case 'ArrowLeft':
                if(left>0){
                    setWidthBox((prevState) => prevState - 3)
                }
              break;
            case 'ArrowRight':
                if(left<89){
                    setWidthBox((prevState) => prevState + 3)
                }              
                break;
            default:
              // code block
          }
    })
},[])

    return ( 
        <div className="Move-box">
            <h1> git@github.com:haroba2020/movebox.git </h1>
            <div className="box" style={{ top: heightBox + 'vh', left: widthBox + '%'}}>
                <p>FREDRIK</p>
            </div>
        </div>
     );
}
 
export default MoveBox;