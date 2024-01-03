import { createContext, useContext, useEffect, useRef, useState } from "react";
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
    const [round,setRound] = useState(0)

    //connecting with the local storage to update the game
    useEffect(()=>{
        const getItems =  JSON.parse(localStorage.getItem('score'))
        const rounds =  JSON.parse(localStorage.getItem('round'))
        const getBoard = localStorage.getItem('board') 
        if(getItems == null)
        {
            saveState(playerScore,computerScore)
        }
        else
        {
            const {player,computer} = getItems;
            player?setPlayerScore(player):setPlayerScore(0)
            computer?setComputerScore(computer):setComputerScore(0)
        }
        if(!rounds)
        {
            localStorage.setItem('round',0)
        }
        else
        {
            setRound(rounds)
        }
        if(localStorage.getItem('firstPlay'))
        {
            const {play,winner} = JSON.parse(localStorage.getItem('firstPlay'))
            if(play && winner == 'player' || winner == 'draw'){
                computer()
            }
        }
        
    },[]);

    // forAllLoops for all loop in the app
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
        const playerId = []
        const computerId = []
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
                playerId.push(index.id)
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
                computerId.push(index.id) 
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
        return {
            'boxBoard':boxBoard,
            'PlayerBoard':PlayerBoard,
            'computerBoard':computerBoard,
            'board':board,
            'computerId':computerId,
            'playerId':playerId
        }
    };

    // handleClick players function
    const handleClick = (props,e) =>{
        const {play} = e.target.dataset
        setComPlaying(false)
        if(play == '' && winner == '')
        {
            e.target.dataset.play = 'player'
            e.target.classList.add('player')
            e.target.textContent='o'
            computer();
        }
        else
        {
            return
        }
    };

    // computer function
    const computer = () =>{
        setComPlaying(true)
        setTimeout(() => {
            computerPlays(CPH(forAllLoops().boxBoard,forAllLoops().board,forAllLoops().PlayerBoard),forAllLoops().board)
        }, 500)
    };

    //CPH checking player hand
    const CPH = (boxBoard,board,PlayerBoard)=>
    {
        let pick ;
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
        else if(boxBoard.all.length == 0){
            setWinner('draw')
        }
        else{
            const random = Math.floor(Math.random()*boxBoard.all.length)
            pick = boxBoard.all[random]
            // console.log(boxBoard.all)
        }
        return pick
    };

    // computerPlays() it plays the computer choice and runs addPlayersScores
    const computerPlays = (pick,board) =>
    {
        const comPicked = board[pick]
        const player = getWinner(forAllLoops())
        if( player!= 'player' || winner == null )
        {
            if(comPicked.dataset.play == '')
            {
                comPicked.dataset.play = 'com'
                comPicked.classList.add('com')
                comPicked.textContent='x'
            }
            else
            {
                const all = forAllLoops().boxBoard.all
                const random = Math.floor(Math.random()*all.length)
                const select = all[random]
                const comPicked = board[select]
                comPicked.classList.add('com')
                comPicked.textContent='x'
            }
        }
        const {playerId,computerId,boxBoard} = forAllLoops()
        getWinner(forAllLoops());
        addPlayersScores()
    };

    // getWinner(data) check the board for winner if there is
    const getWinner = (data) =>
    {
        const {computerBoard,PlayerBoard} = data
        const player = PlayerBoard;
        const computer = computerBoard
        let winner = null
        // if(forAllLoops().boxBoard.all.length == 0 || winner == ''){
        //     setWinner('draw')
        //     winner = 'draw'
        // }
         if(player.col1.length == 3 || player.col2.length == 3 || player.col3.length == 3 || player.row1.length == 3 || player.row2.length == 3 || player.row3.length == 3 || player.vertical1.length == 3 || player.vertical2.length == 3){
            setWinner('player')
            setFirstPlay('computer')
            localStorage.setItem('firstPlay',JSON.stringify({'play':true,'winner':'player'}))
            winner = 'player'
        }
        else if(computer.col1.length == 3 || computer.col2.length == 3 || computer.col3.length == 3 || computer.row1.length == 3 || computer.row2.length == 3 || computer.row3.length == 3 || computer.vertical1.length == 3 || computer.vertical2.length == 3){
            setFirstPlay('player')
            setWinner('computer')
            localStorage.setItem('firstPlay',JSON.stringify({'play':true,'winner':'computer'}))
            winner = 'computer'
        }
        return winner;
    };

    // clearBoard calls the emptyBoard 
    const clearBoard = () =>
    {
        if(winner == 'player' || winner == 'draw' && firstPlay)
        {
            setTimeout(() => {
                emptyBoard()
            }, 2000);
            setTimeout(() => {
                computerPlaysFirst(firstPlay);
                setWinner('')
            }, 2200);
        
        }
        else if(winner)
        {
            setTimeout(() => {
                emptyBoard()
            }, 2000);
        }
    };

    // this function empty the board
    const emptyBoard = () =>
    {
        if(firstPlay == '' && winner == 'draw'){
            setFirstPlay('')
        }
        if(winner){
            const board = [...boxRef.current.children]
            for(const boards of board)
            {
                boards.dataset.play = '';
                boards.textContent = null
                if(boards.classList.contains('player')){
                    boards.classList.remove('player')
                }
                else if(boards.classList.contains('com')){
                    boards.classList.remove('com')
                }
            }
            setWinner('');
            localStorage.setItem('board',JSON.stringify({'playerId':[],'computerId':[]})) 
        }
    };

    // this function checks if computer is to play first or not
    const computerPlaysFirst = (firstPlay) =>
    {
        if(firstPlay == 'computer' && forAllLoops().boxBoard.all.length > 7 || winner == 'draw'){
            computer()
        }
    };

    const addPlayersScores = () =>{

        if(forAllLoops().boxBoard.all.length == 0 || getWinner(forAllLoops()) == 'draw'){
            setWinner('draw')
            setRound((prev)=>{
                return prev+1
            })
            played(round+1)
        }
        if(getWinner(forAllLoops()) == 'player'){
            setPlayerScore(prev=>prev+1)
            setRound((prev)=>{
                return prev+1
            })
            saveState(playerScore+1,computerScore)
            played(round+1)
        }
        else if(getWinner(forAllLoops()) == 'computer'){
            setComputerScore(prev=>prev+1)
            setRound((prev)=>{
                return prev+1
            })
            saveState(playerScore,computerScore+1)
            played(round+1)
        }
    };

    // saveState save the state of the score to local storage
    const saveState = (playerScore,computerScore) =>
    {
        const getItems =  JSON.parse(localStorage.getItem('score'))
        try {
            const scores =  {'player':playerScore,'computer':computerScore,}
            localStorage.setItem('score',JSON.stringify(scores))
        }
        catch (error) 
        {
            console.log('error')
        }
        return getItems
    }

    const played = (data) =>{
         localStorage.setItem('round',data)
    }
    // const SaveBoard = () =>{
    //     const getBoard = localStorage.getItem('board')
    //     if(getBoard==null){
    //         localStorage.setItem('board',JSON.stringify({'playerId':[],'computerId':[]}))
    //     }
    //     else{
    //         const {playerId,computerId} = JSON.parse(getBoard)
    //         for (let board of forAllLoops().board) {
    //             for(let computerIds of computerId){
    //                 if(board.id == computerIds){
    //                     board.classList.add('com')
    //                 }
    //             }
    //             for(let playerIds of playerId){
    //                 if(board.id == playerIds){
    //                     board.classList.add('player')
    //                 }
    //             }
    //         }
    //     }
    // }
    // this function reset all the game state
    const reset =()=>{
        localStorage.setItem('board',JSON.stringify({'playerId':[],'computerId':[]}))
        localStorage.setItem('round',0)
        const scores =  {'player':0,'computer':0}
        localStorage.setItem('score',JSON.stringify(scores))
        localStorage.setItem('firstPlay',JSON.stringify({'play':false,'winner':''}))
        setPlayerScore(0)
        setComputerScore(0)
        setRound(0)
        const board = [...boxRef.current.children]
        for(const boards of board)
        {
            boards.dataset.play = '';
            boards.textContent = null;
            if(boards.classList.contains('player')){
                boards.classList.remove('player')
            }
            else if(boards.classList.contains('com')){
                boards.classList.remove('com')
            }
        }
        setWinner('');
        
    }
    // clearing the board after a winner occur
    clearBoard();
    const context ={
        box,
        handleClick,
        boxRef,
        winner,
        computerScore,
        playerScore,
        emptyBoard,
        round,
        reset,
    }
    return(
        <BoxContext.Provider value={context}>
            {props.children}
        </BoxContext.Provider>
    )
}