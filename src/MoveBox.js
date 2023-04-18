import { useState, useEffect , useRef} from "react"


const MoveBox = () => {

//useState to change speed of enemy
const [speed, setSpeed] = useState(5)
//UseState to set the score
const [score, setScore] = useState(0)
//UseState that renders html element when true
const [loss, setLoss] =useState(false)
//sets y and x axis for player box
const [heightBox, setheightBox] = useState(50)
const [widthBox, setWidthBox] = useState(50)
//sets y and x axis for enemy box
const [evilHeightBox, setEvilHeightBox] = useState(20)
const [evilWidthBox, setEvilWidthBox] = useState(20)

//Refs for useStates that need to be able to get changed values
const heightBoxRef = useRef(heightBox);
const widthBoxRef = useRef(widthBox);
const evilHeightBoxRef = useRef(evilHeightBox);
const evilWidthBoxRef = useRef(evilWidthBox);
const speedRef = useRef(speed);




useEffect(()=>{
    //changes current for refs so that you can always get updated values
    heightBoxRef.current = heightBox
    widthBoxRef.current = widthBox
    evilHeightBoxRef.current = evilHeightBox
    evilWidthBoxRef.current = evilWidthBox
    speedRef.current = speed
    checkCollition()
})

//checks collition with use of y and x axis for both enemy and player
function checkCollition(){
    //gets current values of states
    const top = heightBoxRef.current
    const left = widthBoxRef.current
    const badTop = evilHeightBoxRef.current
    const badLeft = evilWidthBoxRef.current
    // console.log(top-15<badTop && top+15>badTop)
    //checks if y and x axis of player is inside y and x axis of enemy
    if(top-15<badTop && top+15>badTop && left-10<badLeft && left +10>badLeft){
        setScore((prevState) => prevState -10)
        setLoss(true)
    }
}

//function that moves the enemy to where the player is
function moveBad(){
    //gets current values of states
    const top = heightBoxRef.current
    const left = widthBoxRef.current
    const badTop = evilHeightBoxRef.current
    const badLeft = evilWidthBoxRef.current
    const funnySpeed = speedRef.current

    //checks if the player is either over or under the enemy
    if(top>badTop){
        // checks if player is either to the right or left and 
       if(left>badLeft){
        //check if going down is better than going right
        if(top-badTop>left-badLeft){
            setEvilHeightBox((prevState) => prevState +funnySpeed)
        }else{
            setEvilWidthBox((prevState) => prevState +funnySpeed)
        }
       }else{
        //check if going down is better than going left
        if(top-badTop<left-badLeft){
            setEvilHeightBox((prevState) => prevState -funnySpeed)
        }else{
            setEvilWidthBox((prevState) => prevState -funnySpeed)
        }
       }
       //The same but with up instead of down
    }else{
        if(left>badLeft){
            if(top+badTop>left-badLeft){
                setEvilHeightBox((prevState) => prevState -funnySpeed)
            }else{
                setEvilWidthBox((prevState) => prevState +funnySpeed)
            }
        }else{
            if(top-badTop<left-badLeft){
                setEvilHeightBox((prevState) => prevState -funnySpeed)
            }else{
                setEvilWidthBox((prevState) => prevState -funnySpeed)
            }
           }
    }

}

//Use effect To initialize event listener and set intervals 
useEffect(()=>{
    console.log('gaming')
    setInterval(() => {
        //Moves the box and checks the collition each half second
        moveBad()
        checkCollition()
    }, 500);
    //adding score each second
    setInterval(() => {
        setScore((prevState) => prevState +1)
    }, 1000);
    //increase speed each 10th of a second
    setInterval(() => {
        setSpeed((prevState) => prevState +2)
    }, 10000);
    //Event listener to move box
    document.addEventListener('keydown', (e)=>{
        //gets current values of y and x axis
        const top = heightBoxRef.current
        const left = widthBoxRef.current


        //switch case statement that moves you box and checks boundaries 
        switch(e.key) {
            //checks arrowkey
            case 'ArrowUp':
                //checks if position is in playarea
                if(top>0){
                    //sets position based on previous value
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
          }
    })
},[])


    return ( 
        <div className="Move-box">
            <h1> git@github.com:haroba2020/movebox.git </h1>
            {/* when UseState is true render component */}
            { loss && <h1> U lost lmao</h1>}
            <h1> {score}</h1>
                            {/* Makes different box that cheses the enemy */}
            <div className="evilBox" style={{ top: evilHeightBox + 'vh', left: evilWidthBox + '%' }}></div>
                                {/* Styles top and left to move the box with useStates */}
            <div className="box" style={{ top: heightBox + 'vh', left: widthBox + '%'}}>
                {/* to get name inside box */}
                <p>FREDRIK</p>
            </div>
        </div>
     );
}
 
export default MoveBox;