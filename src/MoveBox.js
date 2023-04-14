import { useState, useEffect , useRef} from "react"


const MoveBox = () => {

const [speed, setSpeed] = useState(5)
const [score, setScore] = useState(0)
const [loss, setLoss] =useState(false)
const [heightBox, setheightBox] = useState(50)
const [widthBox, setWidthBox] = useState(50)

const [evilHeightBox, setEvilHeightBox] = useState(20)
const [evilWidthBox, setEvilWidthBox] = useState(20)

const heightBoxRef = useRef(heightBox);
const widthBoxRef = useRef(widthBox);
const evilHeightBoxRef = useRef(evilHeightBox);
const evilWidthBoxRef = useRef(evilWidthBox);



useEffect(()=>{
    heightBoxRef.current = heightBox
    widthBoxRef.current = widthBox
    evilHeightBoxRef.current = evilHeightBox
    evilWidthBoxRef.current = evilWidthBox
})

function checkCollition(){
    const top = heightBoxRef.current
    const left = widthBoxRef.current
    const badTop = evilHeightBoxRef.current
    const badLeft = evilWidthBoxRef.current
    // console.log(top-15<badTop && top+15>badTop)
    if(top-15<badTop && top+15>badTop && left-10<badLeft && left +10>badLeft){
        setScore((prevState) => prevState -10)
        setLoss(true)
    }
}

function moveBad(){
    const top = heightBoxRef.current
    const left = widthBoxRef.current
    const badTop = evilHeightBoxRef.current
    const badLeft = evilWidthBoxRef.current

    if(top>badTop){
       if(left>badLeft){
        if(top-badTop>left-badLeft){
            setEvilHeightBox((prevState) => prevState +speed)
        }else{
            setEvilWidthBox((prevState) => prevState +speed)
        }
       }else{
        if(top-badTop<left-badLeft){
            setEvilHeightBox((prevState) => prevState -speed)
        }else{
            setEvilWidthBox((prevState) => prevState -speed)
        }
       }
    }else{
        if(left>badLeft){
            console.log('topright')
            if(top+badTop>left-badLeft){
                setEvilHeightBox((prevState) => prevState -speed)
            }else{
                setEvilWidthBox((prevState) => prevState +speed)
            }
        }else{

            console.log('topleft')

            if(top-badTop<left-badLeft){
                console.log('1')
                setEvilHeightBox((prevState) => prevState -speed)
            }else{
                console.log('2')

                setEvilWidthBox((prevState) => prevState -speed)
            }
           }
    }

}

useEffect(()=>{
    console.log('gaming')
    setInterval(() => {
        moveBad()
        checkCollition()
    }, 500);
    setInterval(() => {
        setScore((prevState) => prevState +1)
    }, 1000);
    setInterval(() => {
        setSpeed((prevState) => prevState +2)
    }, 10000);
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
            { loss && <h1> U lost lmao</h1>}
            <h1> {score}</h1>
            <div className="evilBox" style={{ top: evilHeightBox + 'vh', left: evilWidthBox + '%' }}></div>
            <div className="box" style={{ top: heightBox + 'vh', left: widthBox + '%'}}>
                <p>FREDRIK</p>
            </div>
        </div>
     );
}
 
export default MoveBox;