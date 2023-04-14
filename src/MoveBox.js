import { useState, useEffect , useRef} from "react"


const MoveBox = () => {

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

    checkCollition()
})

function checkCollition(){
    const top = heightBoxRef.current
    const left = widthBoxRef.current
    const badTop = evilHeightBoxRef.current
    const badLeft = evilWidthBoxRef.current
    // console.log(top-15<badTop && top+15>badTop)
    if(top-15<badTop && top+15>badTop && left-10<badLeft && left +10>badLeft){
        console.log('yarr')
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
            setEvilHeightBox((prevState) => prevState +5)
        }else{
            setEvilWidthBox((prevState) => prevState +5)
        }
        console.log(top-badTop+ ' Top value ')
        console.log(left-badLeft + ' left value ')
       }else{
        if(top-badTop<left-badLeft){
            setEvilHeightBox((prevState) => prevState -5)
        }else{
            setEvilWidthBox((prevState) => prevState -5)
        }
       }
    }else{
        if(left>badLeft){
            if(top+badTop>left-badLeft){
                setEvilHeightBox((prevState) => prevState -5)
            }else{
                setEvilWidthBox((prevState) => prevState +5)
            }
        }else{
            if(top-badTop<left-badLeft){
                setEvilHeightBox((prevState) => prevState +5)
            }else{
                setEvilWidthBox((prevState) => prevState -5)
            }
           }
    }

}

useEffect(()=>{
    console.log('gaming')
    setInterval(() => {
        moveBad()
    }, 500);
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
            <div className="evilBox" style={{ top: evilHeightBox + 'vh', left: evilWidthBox + '%' }}></div>
            <div className="box" style={{ top: heightBox + 'vh', left: widthBox + '%'}}>
                <p>FREDRIK</p>
            </div>
        </div>
     );
}
 
export default MoveBox;