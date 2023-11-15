import { createContext, useContext, useRef, useState } from "react";
import boxes from "../box/boxes";

export const BoxContext = createContext(null)

export const BoxProvider = (props) =>{
    const [box, setBox] = useState(boxes);
    const boxRef = useRef([]);
    const [winner, setWinner] = useState('');
    const [computerScore,setComputerScore] = useState(0);
    const [playerScore,setPlayerScore] = useState(0);

    const handleClick = (props,e) =>{
        const {id,on} = props.data
        const {play} = e.target.dataset
        const board = [...boxRef.current.children]
        if(play == ''){
            e.target.dataset.play = 'player'
            e.target.classList.add('player')
            console.log(winner)
            computer(id) 
        }else{
            return
        }
    }
    const computer = (id) =>{
        const board = [...boxRef.current.children]
        const boxBoard = {
            all:[],
            col1:[],
            col2:[],
            col3:[],
            row1:[],
            row3:[],
            row2:[],
            vertical1:[],
            vertical2:[]
        }
        const PlayerBoard = {
            col1:[],
            col2:[],
            col3:[],
            row1:[],
            row3:[],
            row2:[],
            vertical1:[],
            vertical2:[]
        }
        let pick = null
        for (let index of board) {
            if(index.dataset.play == ''){
                if(index.dataset.row == 'row1' ){
                    boxBoard.row1.push(index.id)
                }
                else if(index.dataset.row == 'row2'){
                    boxBoard.row2.push(index.id)
                }
                else if(index.dataset.row == 'row3'){
                    boxBoard.row3.push(index.id)
                }
                if(index.dataset.col == 'col1'){
                    boxBoard.col1.push(index.id)
                }
                else if(index.dataset.col == 'col2'){
                    boxBoard.col2.push(index.id)
                }
                else if(index.dataset.col == 'col3'){
                    boxBoard.col3.push(index.id)
                }
                if(index.dataset.vertical == 'vertical1' || index.dataset.vertical == 'center'){
                    boxBoard.vertical1.push(index.id)
                }
                if(index.dataset.vertical == 'vertical2' || index.dataset.vertical == 'center'){
                    boxBoard.vertical2.push(index.id)
                }
                if(index.dataset.play == ''){
                    boxBoard.all.push(index.id)
                }
            }
            if(index.dataset.play == 'player'){
                if(index.dataset.row == 'row1' ){
                    PlayerBoard.row1.push(index.id)
                }
                else if(index.dataset.row == 'row2'){
                    PlayerBoard.row2.push(index.id)
                }
                else if(index.dataset.row == 'row3'){
                    PlayerBoard.row3.push(index.id)
                }
                if(index.dataset.col == 'col1'){
                    PlayerBoard.col1.push(index.id)
                }
                else if(index.dataset.col == 'col2'){
                    PlayerBoard.col2.push(index.id)
                }
                else if(index.dataset.col == 'col3'){
                    PlayerBoard.col3.push(index.id)
                }
                if(index.dataset.vertical == 'vertical1' || index.dataset.vertical == 'center'){
                    PlayerBoard.vertical1.push(index.id)
                }
                if(index.dataset.vertical == 'vertical2' || index.dataset.vertical == 'center'){
                    PlayerBoard.vertical2.push(index.id)
                }
            }
        }
        if(winner==''){
            computerPlays(CPH(boxBoard,board,PlayerBoard),board)
            checkWinner(board)
        }
    }
    //CPH checking player hand
    const CPH = (boxBoard,board,PlayerBoard)=>{

        let pick ;
        if(boxBoard.all.length == 0){
            setWinner('draw')
        }
        if(boxBoard.col1.length == 1 && PlayerBoard.col1.length == 2){
            pick = boxBoard.col1[0]
        }
        else if(boxBoard.col2.length == 1 && PlayerBoard.col2.length == 2){
            pick = boxBoard.col2[0]
        }
        else if(boxBoard.col3.length == 1 && PlayerBoard.col3.length == 2){
            pick = boxBoard.col3[0]
        }
        else if(boxBoard.row1.length == 1 && PlayerBoard.row1.length == 2){
            pick = boxBoard.row1[0]
        }
        else if(boxBoard.row2.length == 1 && PlayerBoard.row2.length == 2){
            pick = boxBoard.row2[0]
        }
        else if(boxBoard.row3.length == 1 && PlayerBoard.row3.length == 2){
            pick = boxBoard.row3[0]
        }
        else if(boxBoard.vertical1.length == 1 && PlayerBoard.vertical1.length == 2){
            pick = boxBoard.vertical1[0]
        }
        else if(boxBoard.vertical2.length == 1 && PlayerBoard.vertical2.length == 2){
            pick = boxBoard.vertical2[0]
        }
        else{
            pick = Math.floor(Math.random()*boxBoard.all.length)
            console.log(boxBoard.all)
        }
        return pick
    }
    const computerPlays = (pick,board) =>{
        const comPicked = board[pick]
        if(comPicked.dataset.play == ''){
                // const random = Math.floor(Math.random()*(10 - 2 + 1))+2
                comPicked.dataset.play = 'com'
                setTimeout(()=>{
                    comPicked.classList.add('com')
                },1000) 
        }
    }
        const checkWinner = (board) =>{
            const playerCheck = {
                col1:[],
                col2:[],
                col3:[],
                row1:[],
                row3:[],
                row2:[],
                vertical1:[],
                vertical2:[]
            }
            const computerCheck = {
                col1:[],
                col2:[],
                col3:[],
                row1:[],
                row3:[],
                row2:[],
                vertical1:[],
                vertical2:[]
            }
            for(let index of board){
                // checking winnig match for player
                if(index.dataset.play == 'player'){
                    if(index.dataset.row == 'row1' && index.dataset.play == 'player'){
                        playerCheck.row1.push(index.id)
                    }
                    else if(index.dataset.row == 'row2' && index.dataset.play == 'player'){
                        playerCheck.row2.push(index.id)
                    }
                    else if(index.dataset.row == 'row3' && index.dataset.play == 'player'){
                        playerCheck.row3.push(index.id)
                    }
                    if(index.dataset.col == 'col1' && index.dataset.play == 'player'){
                        playerCheck.col1.push(index.id)
                    }
                    else if(index.dataset.col == 'col2' && index.dataset.play == 'player'){
                        playerCheck.col2.push(index.id)
                    }
                    else if(index.dataset.col == 'col3' && index.dataset.play == 'player'){
                        playerCheck.col3.push(index.id)
                    }
                    if(index.dataset.vertical == 'vertical1' || index.dataset.vertical == 'center'  && index.dataset.play == 'player'){
                        playerCheck.vertical1.push(index.id)
                    }
                    if(index.dataset.vertical == 'vertical2' || index.dataset.vertical == 'center' && index.dataset.play == 'player'){
                        playerCheck.vertical2.push(index.id)
                    }
                }
                // checking winnig match for computer
                if(index.dataset.play == 'com'){
                    if(index.dataset.row == 'row1' && index.dataset.play == 'com'){
                        computerCheck.row1.push(index.id)
                    }
                    else if(index.dataset.row == 'row2' && index.dataset.play == 'com'){
                        computerCheck.row2.push(index.id)
                    }
                    else if(index.dataset.row == 'row3' && index.dataset.play == 'com'){
                        computerCheck.row3.push(index.id)
                    }
                    if(index.dataset.col == 'col1' && index.dataset.play == 'com'){
                        computerCheck.col1.push(index.id)
                    }
                    else if(index.dataset.col == 'col2' && index.dataset.play == 'com'){
                        computerCheck.col2.push(index.id)
                    }
                    else if(index.dataset.col == 'col3' && index.dataset.play == 'com'){
                        computerCheck.col3.push(index.id)
                    }
                    if(index.dataset.vertical == 'vertical1' || index.dataset.vertical == 'center'  && index.dataset.play == 'com'){
                        computerCheck.vertical1.push(index.id)
                    }
                    if(index.dataset.vertical == 'vertical2' || index.dataset.vertical == 'center' && index.dataset.play == 'com'){
                        computerCheck.vertical2.push(index.id)
                    }
                }
                }
            getWinner(playerCheck,computerCheck)
        }
        const getWinner = (player,computer) =>{
        let outcome = null
        if(player.col1.length == 3 || player.col2.length == 3 || player.col3.length == 3 || player.row1.length == 3 || player.row2.length == 3 || player.row3.length == 3 || player.vertical1.length == 3 || player.vertical2.length == 3){
            setTimeout(() => {
                setWinner('player')
                setPlayerScore(prev=>prev +1)
            }, 1000);

        }
        else if(computer.col1.length == 3 || computer.col2.length == 3 || computer.col3.length == 3 || computer.row1.length == 3 || computer.row2.length == 3 || computer.row3.length == 3 || computer.vertical1.length == 3 || computer.vertical2.length == 3){
            setTimeout(() => {
                setWinner('computer')
                setComputerScore(prev=>prev +1)
            }, 1000);

        }
    }
    const clearBoard = () =>{
        
    };
    const emptyBoard = () =>{
        const board = [...boxRef.current.children]
        for(const boards of board){
            boards.dataset.play = '';
            if(boards.classList.contains('player')){
                boards.classList.remove('player')
            }
            else if(boards.classList.contains('com')){
                boards.classList.remove('com')
            }
        }
        console.log('remove')
    };
    if(winner){
        setTimeout(() => {
            // clearBoard()
            setWinner('')
            emptyBoard() 
        }, 1500);
    }
    const handleBoxChange = (id,on,play) =>{
        const newBox = []
        let updateBox = {};
        setBox((prev)=>{
            for(let i = 0; i<prev.length; i++){
                const currentBox = prev[i];
                if(currentBox.id === id){
                     updateBox = {
                        ...currentBox,
                        on:play
                    }
                    // console.log(newBox)
                    newBox.push(updateBox)
                }else{
                    newBox.push(currentBox)
                }
            }
            computer(updateBox,newBox)
            return newBox
        })
    }
    const context ={
        box,
        handleClick,
        boxRef,
        winner,
        computerScore,
        playerScore,
    }
    return(
        <BoxContext.Provider value={context}>
            {props.children}
        </BoxContext.Provider>
    )
}