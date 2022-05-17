import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { AppRegistration, Edit, EditLocationAlt, AccountBalanceWallet, WifiCalling, RemoveModerator, Apps, More, MonetizationOn, EditNotifications } from '@mui/icons-material';

// import Bss from './Pages/TopNav/Bss'
import Register3Gab from './Pages/TopNav/Register3Gab'
import Ocs from './Pages/TopNav/Ocs'
import BAD from './Pages/TopNav/BAD'
import Call from './Pages/TopNav/Call'
import BlackList from './Pages/TopNav/BlackList'
import Application from './Pages/TopNav/Application'
import ValueAddedService from '../Pages/MiniCRM/components/ValueAddedService';
import FaDao from '../Pages/MiniCRM/components/Fadao';
import Ftth from './Pages/Card/Ftth';
import FtthPhone from './Pages/Card/FtthPhone';
// import { Grid } from '@mui/material';
// import Package from './Pages/TopNav/Package';

export default function Nav({ kyc, ocs, bad, call, bl, application, network_code, ftth, ftthPhone }) {
  const [open, setOpen] = React.useState({ bss: false, kyc: false, ocs: false, bad: true, call: false, bl: false, application: false, pk: false, vas: false, fd: false, ftth: false, ftthPhone: false })
  // console.log({bl})
  return (
    <>
      <List
        sx={{ width: '100%', maxWidth: 350 }}
        component="nav"
      >
        <ListItemButton onClick={() => setOpen({ ...open, bad: !open.bad })}>
          <ListItemIcon>
            <AccountBalanceWallet />
          </ListItemIcon>
          <ListItemText primary={<u><b>Balance And Data</b> {bad.st === '' ? '' : <b className={bad.st === 'loading' ? 'nav-loading' : bad.st === 'Yes' ? 'nav-active' : 'nav-err'}>{bad.st}</b>}</u>} />
          {open.bad ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open.bad} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {bad.fc && <BAD allData={bad} />}
          </List>
        </Collapse>

        {network_code === "F" ? <>


          <ListItemButton onClick={() => setOpen({ ...open, ftth: !open.ftth })}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary={<u><b>ຂໍ້ມູນ FTTH</b> {ftth.st === '' ? '' : <b className={ftth.st === 'loading' ? 'nav-loading' : ftth.st === 'Yes' ? 'nav-active' : 'nav-err'}>{ftth.st}</b>}</u>} />
            {open.ftth ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open.ftth} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {ftth.fc && <Ftth allData={ftth} />}
            </List>
          </Collapse>

          {/* <ListItemButton onClick={() => setOpen({ ...open, ftthPhone: !open.ftthPhone })}>
            <ListItemIcon>
              <EditNotifications />
            </ListItemIcon>
            <ListItemText primary={<u><b>ຂໍ້ມູນ FTTH ຜູກເບີໂທ</b> {ftthPhone.st === '' ? '' : <b className={ftthPhone.st === 'loading' ? 'nav-loading' : ftthPhone.st === 'Yes' ? 'nav-active' : 'nav-err'}>{ftthPhone.st}</b>}</u>} />
            {open.ftthPhone ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open.ftthPhone} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {ftthPhone.fc && <FtthPhone allData={ftthPhone} />}
            </List>
          </Collapse> */}

        </> : <>


          <ListItemButton onClick={() => setOpen({ ...open, kyc: !open.kyc })}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary={<u><b>ລົງທະບຽນ 3 ແກັບ</b> {kyc.st === '' ? '' : <b className={kyc.st === 'loading' ? 'nav-loading' : kyc.st === 'Yes' ? 'nav-active' : 'nav-err'}>{kyc.st}</b>}</u>} />
            {open.kyc ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open.kyc} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {kyc.fc && <Register3Gab allData={kyc} />}
            </List>
          </Collapse>

          {/* <ListItemButton onClick={() => setOpen({ ...open, bss: !open.bss })}>
          <ListItemIcon>
            <AppRegistration />
          </ListItemIcon>
          <ListItemText primary={<u><b>BSS Status: </b> {nbss.st === '' ? '' : <b className={nbss.st === 'loading' ? 'nav-loading' : nbss.st === "Activated" ? 'nav-active' : 'nav-err'}>{nbss.st}</b>}</u>} />
          {open.bss ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open.bss} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {nbss.fc && <Bss allData={nbss} />}
          </List>
        </Collapse> */}

          <ListItemButton onClick={() => setOpen({ ...open, ocs: !open.ocs })}>
            <ListItemIcon>
              <EditLocationAlt />
            </ListItemIcon>
            <ListItemText primary={<u><b>OCS Status: </b> {ocs.st === '' ? '' : <b className={ocs.st === 'loading' ? 'nav-loading' : ocs.st === "active" ? 'nav-active' : 'nav-err'}>{ocs.st}</b>}</u>} />
            {open.ocs ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open.ocs} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {ocs.fc && <Ocs allData={ocs} />}
            </List>
          </Collapse>

          {
          network_code === "M" && 
          <>
            <ListItemButton onClick={() => setOpen({ ...open, bl: !open.bl })}>
              <ListItemIcon>
                <RemoveModerator />
              </ListItemIcon>
              {/* {bl.st+""} */}
              <ListItemText primary={<u><b>Blacklist Status: </b> {bl.st === '' ? '' : bl.st === 'loading' ? <b className="nav-loading">{bl.st}</b> : bl.st ? <BlackList st={bl.st} /> : <b className="nav-active">No</b>}</u>} />
            </ListItemButton>
          </>}

          <ListItemButton onClick={() => setOpen({ ...open, call: !open.call })}>
            <ListItemIcon>
              <WifiCalling />
            </ListItemIcon>
            <ListItemText primary={<u><b>ຂໍ້ມູນເບີໂທ </b> {call.st === '' ? '' : <b className={call.st === 'loading' ? 'nav-loading' : call.st === "done" ? 'nav-active' : 'nav-err'}>{call.st}</b>}</u>} />
            {open.call ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open.call} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {call.fc && <Call allData={call} />}
            </List>
          </Collapse>

          <ListItemButton onClick={() => setOpen({ ...open, application: !open.application })}>
            <ListItemIcon>
              <Apps />
            </ListItemIcon>
            <ListItemText primary={<u><b>Application </b> {application.st === '' ? '' : <b className={application.st === 'loading' ? 'nav-loading' : application.st === "done" ? 'nav-active' : 'nav-err'}>{application.st}</b>}</u>} />
            {open.application ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open.application} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {application.fc && <Application allData={application} />}
            </List>
          </Collapse>

          <ListItemButton onClick={() => setOpen({ ...open, vas: !open.vas })}>
            <ListItemIcon>
              <More />
            </ListItemIcon>
            <ListItemText primary={<u><b>Value Add Service </b></u>} />
            {open.vas ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open.vas} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ValueAddedService />
            </List>
          </Collapse>

          <ListItemButton onClick={() => setOpen({ ...open, fd: !open.fd })}>
            <ListItemIcon>
              <MonetizationOn />
            </ListItemIcon>
            <ListItemText primary={<u><b>ຢືມ ແລະ ຕັດເງິນ ຟ້າດາວ </b></u>} />
            {open.fd ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open.fd} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <FaDao />
            </List>
          </Collapse>

        </>}


      </List>

    </>
  );
}
