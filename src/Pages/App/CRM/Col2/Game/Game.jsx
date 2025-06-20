import { SportsEsports, VideogameAssetOff } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React, { useState } from 'react'
import GameUnSub from './Model/GameUnSub'
import GameSubscri from './Model/GameSubscri'
import CancelGame from './Model/CancleGame'

function Game() {
    const [game, setGame] = useState(false)
    const [gameUn, setGameUn] = useState(false)
    const [gameSub, setGameSub] = useState(false)
    return (
        <>
            <Grid container>
                <Grid item xs={12} container className='link-box-pointer' onClick={() => setGameUn(true)}>
                    <Grid item xs={2}><SportsEsports /></Grid>
                    <Grid item xs={10}>ເກມ UnSubscribe</Grid>
                </Grid>

                <Grid item xs={12} container className='link-box-pointer' onClick={() => setGameSub(true)}>
                    <Grid item xs={2}><SportsEsports /></Grid>
                    <Grid item xs={10}>ເກມ Subscribe</Grid>
                </Grid>

                <Grid item xs={12} container className='link-box-pointer' onClick={() => setGame(true)}>
                    <Grid item xs={2}><VideogameAssetOff /></Grid>
                    <Grid item xs={10}>ຍົກເລີກບໍລິການເກມ</Grid>
                </Grid>
            </Grid>

            <CancelGame use={game} cb={(e) => setGame(e)} />
            <GameUnSub open={gameUn} cb={(e) => setGameUn(e)} />
            <GameSubscri open={gameSub} cb={(e) => setGameSub(e)} />
        </>
    )
}

export default Game