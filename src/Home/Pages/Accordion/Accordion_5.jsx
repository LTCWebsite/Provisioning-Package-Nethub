import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import {
  Close,
  SportsEsports,
  VideogameAsset, VideogameAssetOff
} from '@mui/icons-material'
import { Dialog, Grid, Slide, IconButton } from '@mui/material';
import GameUnsub from '../../../Pages/MiniCRM/page/GameUnsub'
import CancelGame from './More/CancelGame'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Accordion_5() {
  const expanded = false
  const [open, setOpen] = React.useState({ sub: false, unsub: false, cancle: false })


  return (
    <div className="box-accordion">

      <Accordion expanded={expanded === 'panel4'}>
        <AccordionSummary>
          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            <VideogameAsset className="n-icon" /><u className="nav-text">ເກມ Subscribe</u>
          </Typography>
        </AccordionSummary>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onClick={() => setOpen({ ...open, unsub: true })}>
        <AccordionSummary>
          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            <SportsEsports className="n-icon" /><u className="nav-text">ເກມ UnSubscribe</u>
          </Typography>
        </AccordionSummary>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onClick={() => setOpen({ ...open, cancle: true })}>
        <AccordionSummary>
          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            <VideogameAssetOff className="n-icon" /><u className="nav-text">ຍົກເລີກເກມ</u>
          </Typography>
        </AccordionSummary>
      </Accordion>

      <Dialog
        maxWidth="xl"
        fullWidth={true}
        open={open.unsub}
        onClose={() => setOpen({ ...open, unsub: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
      >
        <Grid container>
          <Grid item container xs={12}>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={10}><div className="center"><h1>ເກມ UnSubscribe</h1></div></Grid>
            <Grid item xs={1}>
              <div className="right">
                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, unsub: false })}>
                  <Close />
                </IconButton>
              </div>
            </Grid>
            <Grid item xs={12} style={{ marginBottom: 20 }}>
              <GameUnsub />
            </Grid>
          </Grid>
        </Grid>
      </Dialog>

      <CancelGame use={open.cancle} cb={(e) => setOpen({ ...open, cancle: e })} />

    </div>
  )
}
