import { createContext, useContext, useRef, useState } from "react";
import boxes from "../box/boxes";

export const BoxContext = createContext(null)

export const BoxProvider = (props) =>{
    const [box, setBox] = useState(boxes);
    const boxRef = useRef([]);
    const [winner, setWinner] = useState('');
    const [computerScore,setComputerScore] = useState(0);
    const [playerScore,setPlayerScore] = useState(0);
    const [firstPlay,setFirstPlay] = useState('')
    const [gameEnd,setGameEnd] = useState(true)
    const [comPlaying,setComPlaying] = useState(false)

    const forAllLoops = () =>{
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
        const computerBoard = {
            col1:[],
            col2:[],
            col3:[],
            row1:[],
            row3:[],
            row2:[],
            vertical1:[],
            vertical2:[]
        }
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
            if(index.dataset.play == 'com'){
                if(index.dataset.row == 'row1' ){
                    computerBoard.row1.push(index.id)
                }
                else if(index.dataset.row == 'row2' ){
                    computerBoard.row2.push(index.id)
                }
                else if(index.dataset.row == 'row3' ){
                    computerBoard.row3.push(index.id)
                }
                if(index.dataset.col == 'col1' ){
                    computerBoard.col1.push(index.id)
                }
                else if(index.dataset.col == 'col2' ){
                    computerBoard.col2.push(index.id)
                }
                else if(index.dataset.col == 'col3' ){
                    computerBoard.col3.push(index.id)
                }
                if(index.dataset.vertical == 'vertical1' || index.dataset.vertical == 'center'  ){
                    computerBoard.vertical1.push(index.id)
                }
                if(index.dataset.vertical == 'vertical2' || index.dataset.vertical == 'center' ){
                    computerBoard.vertical2.push(index.id)
                }
            }
        }
        return {'boxBoard':boxBoard,'PlayerBoard':PlayerBoard,'computerBoard':computerBoard,'board':board}
    }
    const handleClick = (props,e) =>{

        const {id,on} = props.data
        const {play} = e.target.dataset
        const board = [...boxRef.current.children]
        if(play == '' && winner == '' && !comPlaying){
            e.target.dataset.play = 'player'
            e.target.classList.add('player')
            computer();
        }
        else{
            return
        }

    }
    const computer = () =>{
        setTimeout(() => {
            computerPlays(CPH(forAllLoops().boxBoard,forAllLoops().board,forAllLoops().PlayerBoard),forAllLoops().board)
        }, 1000);
    }
    //CPH checking player hand
    const CPH = (boxBoard,board,PlayerBoard)=>{

        let pick ;
        if(boxBoard.all.length == 0){
            setWinner('draw')
        }
        if(boxBoard.col1.length == 1 && forAllLoops().computerBoard.col1.length == 2){
            pick = boxBoard.col1[0]
        }
        else if(boxBoard.col2.length == 1 && forAllLoops().computerBoard.col2.length == 2){
            pick = boxBoard.col2[0]
        }
        else if(boxBoard.col3.length == 1 && forAllLoops().computerBoard.col3.length == 2){
            pick = boxBoard.col3[0]
        }
        else if(boxBoard.row1.length == 1 && forAllLoops().computerBoard.row1.length == 2){
            pick = boxBoard.row1[0]
        }
        else if(boxBoard.row2.length == 1 && forAllLoops().computerBoard.row2.length == 2){
            pick = boxBoard.row2[0]
        }
        else if(boxBoard.row3.length == 1 && forAllLoops().computerBoard.row3.length == 2){
            pick = boxBoard.row3[0]
        }
        else if(boxBoard.vertical1.length == 1 && forAllLoops().computerBoard.vertical1.length == 2){
            pick = boxBoard.vertical1[0]
        }
        else if(boxBoard.vertical2.length == 1 && forAllLoops().computerBoard.vertical2.length == 2){
            pick = boxBoard.vertical2[0]
        }
        else if(boxBoard.col1.length == 1 && PlayerBoard.col1.length == 2){
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
            const random = Math.floor(Math.random()*boxBoard.all.length)
            pick = boxBoard.all[random]
            console.log(boxBoard.all)
        }
        return pick
    }
    const computerPlays = (pick,board) =>{
        const comPicked = board[pick]
        const player = getWinner(forAllLoops())
        if( player!= 'player' || winner == null ){
            if(comPicked.dataset.play == ''){
                // const random = Math.floor(Math.random()*(10 - 2 + 1))+2
                comPicked.dataset.play = 'com'
                setTimeout(()=>{
                    comPicked.classList.add('com')
                },1000) 
            }
            else{
                const all = forAllLoops().boxBoard.all
                const random = Math.floor(Math.random()*all.length)
                const select = all[random]
                const comPicked = board[select]
                setTimeout(()=>{
                    comPicked.classList.add('com')
                },1000)
            }
        }
        getWinner(forAllLoops())
        if(getWinner(forAllLoops()) == 'player'){
            setPlayerScore(prev=>prev+1)
        }else if(getWinner(forAllLoops()) == 'computer'){
            setComputerScore(prev=>prev+1)
        }
    }
    // const checkWinner = () =>{
    //     getWinner(forAllLoops().computerBoard,forAllLoops().PlayerBoard)
    // }
    const getWinner = (data) =>{
        const {computerBoard,PlayerBoard} = data
        const player = PlayerBoard;
        const computer = computerBoard
        let winner = null
        if(player.col1.length == 3 || player.col2.length == 3 || player.col3.length == 3 || player.row1.length == 3 || player.row2.length == 3 || player.row3.length == 3 || player.vertical1.length == 3 || player.vertical2.length == 3){
            setTimeout(() => {
            }, 100);
            setWinner('player')
            setFirstPlay('computer')
            winner = 'player'
        }
        else if(computer.col1.length == 3 || computer.col2.length == 3 || computer.col3.length == 3 || computer.row1.length == 3 || computer.row2.length == 3 || computer.row3.length == 3 || computer.vertical1.length == 3 || computer.vertical2.length == 3){
            setTimeout(() => {
                // setComputerScore(prev=>prev +1)
            }, 100);
            setFirstPlay('')
            setWinner('computer')
            winner = 'computer'
        }
        else if(forAllLoops().boxBoard.all.length == 0 && winner == ''){
            setWinner('draw')
            winner = 'draw'
        }
        return winner
    }
    const clearBoard = () =>{
       
    };
    
    const emptyBoard = () =>{
        if(winner){
            const board = [...boxRef.current.children]
            const all = []
            setWinner('');
            for(const boards of board){
                boards.dataset.play = '';
                if(boards.classList.contains('player')){
                    boards.classList.remove('player')
                }
                else if(boards.classList.contains('com')){
                    boards.classList.remove('com')
                }
            }
            setGameEnd(true)
        }
        // console.log(forAllLoops().boxBoard.all)
    };
    const computerPlaysFirst = (firstPlay) =>{
        if(firstPlay && forAllLoops().boxBoard.all.length > 7 || winner == 'draw'){
            computer()
        }
    };
    const Attack = () =>{
    
    }
    if(firstPlay){
        computerPlaysFirst(firstPlay);
    }
    if(winner){
        setTimeout(() => {
            emptyBoard()
        }, 2000);
    }


    const context ={
        box,
        handleClick,
        boxRef,
        winner,
        computerScore,
        playerScore,
        emptyBoard,
    }
    return(
        <BoxContext.Provider value={context}>
            {props.children}
        </BoxContext.Provider>
    )
}