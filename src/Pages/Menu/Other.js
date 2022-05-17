import React from "react";
import { Grid, Card, CardContent, Button } from "@material-ui/core";
import { MusicNote, MenuBook, EventNote, Map, MeetingRoom, ControlPointDuplicate, BarChart, Poll, Games, SportsEsports, VideogameAsset } from '@material-ui/icons'

function Other() {
  const links = [
    { link: "http://10.0.6.26:8180/cs", name: "RBT", icon: <MusicNote className="danger" /> },
    { link: "http://172.28.12.62/sipcc", name: "ບັນທຶກ ການຂາຍ RBT", icon: <MenuBook className="danger" /> },
    { link: "http://10.30.3.14/maximo", name: "Trouble Ticket", icon: <EventNote className="danger" /> },
    { link: "http://www.sod.laotel.com/alarm_dashboard/V2/index.html", name: "SOD", icon: <Map className="danger" /> },
    { link: "http://172.28.16.100:5000/", name: "SignONE", icon: <MeetingRoom className="danger" /> }
  ]
  const links_1 = [
    { link: "http://10.30.6.98:3434/", name: "M-Topup Plus", icon: <ControlPointDuplicate className="danger" /> },
    { link: "http://10.30.6.98:9798/", name: "Monitor Topup", icon: <BarChart className="danger" /> },
    { link: "http://10.30.6.98:5152/", name: "FTTH Bundle", icon: <Poll className="danger" /> },
  ]
  const links_game = [
    { link: "https://online.codapayments.com/operator/", name: "Coda Payment", icon: <Games className="danger" /> },
    { link: "http://platform.linkit360.ru/main/login", name: "Game LinkIT360", icon: <SportsEsports className="danger" /> },
    { link: "https://secure.gameloft.com/supporttool/", name: "Gameloft", icon: <VideogameAsset className="danger" /> },
  ]

  return (
    <>
      <Grid container item xs={12}>
        {links.map((x) => {
          return (
            <Grid item xs={12} lg={3} onClick={() => window.open(x.link)} style={{ cursor: "pointer" }}>
              <Card elevation={0} className="box">
                <CardContent className="content-1" style={{ display: 'flex' }}>
                  {x?.icon}&nbsp;&nbsp;
                  <Grid container>{x.name}</Grid>
                </CardContent>
              </Card>
            </Grid>
          )

        })}
      </Grid>
      <Grid container item xs={12}>
        {links_1.map((x) => {
          return (
            <Grid item xs={12} lg={3} onClick={() => window.open(x.link)} style={{ cursor: "pointer" }}>
              <Card elevation={0} className="box">
                <CardContent className="content-1" style={{ display: 'flex' }}>
                  {x?.icon}&nbsp;&nbsp;
                  <Grid container>{x.name}</Grid>
                </CardContent>
              </Card>
            </Grid>
          )

        })}
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={12} lg={3} onClick={() => window.open("https://online.codapayments.com/operator/")} style={{ cursor: "pointer" }}>
          <Card elevation={0} className="box">
            <CardContent className="content-1" style={{ display: 'flex' }}>
              <Games className="danger" />&nbsp;&nbsp;
              <Grid container>Coda Payment</Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={3} style={{ cursor: "pointer" }}>
          <Card elevation={0} className="box">
            <form id="w0" action="http://platform.linkit360.ru/main/login" target="_blank" method="post">
              <input type="hidden" name="_csrf-frontend" value="eBSgcmk2VZQ7GuzGaJ8rVy7_ZQdwFp4LPSjSb-TS8J4_Vv85IVEa1UNcvJwupl4gHb5Ua0lfqHF-SusHtaO27Q==" />
              <div class="form-group field-loginform-username required has-success" style={{ display: 'none' }}>
                <label class="control-label" for="loginform-username">Username</label>
                <input type="text" id="loginform-username" class="form-control" name="LoginForm[username]" autofocus="" aria-required="true" aria-invalid="false" value="cs.ltc" />
                <div class="help-block"></div>
              </div>
              <div class="form-group field-loginform-password required has-success" style={{ display: 'none' }}>
                <label class="control-label" for="loginform-password">Password</label>
                <input type="password" id="loginform-password" class="form-control" name="LoginForm[password]" aria-required="true" aria-invalid="false" value="123456" />
                <div class="help-block"></div>
              </div>
              <Button
                color="default"
                fullWidth
                type="submit"
                className="btn-padd"
                style={{ textTransform: 'none' }}
                startIcon={<SportsEsports className="danger" />}
              >
                Game LinkIT360
              </Button>
            </form>
            {/* <CardContent className="content-1" style={{ display: 'flex' }}>
              <SportsEsports className="danger" />&nbsp;&nbsp;
              <Grid container>Game LinkIT360</Grid>
            </CardContent> */}
          </Card>
        </Grid>
        <Grid item xs={12} lg={3} onClick={() => window.open("https://secure.gameloft.com/supporttool/")} style={{ cursor: "pointer" }}>
          <Card elevation={0} className="box">
            <CardContent className="content-1" style={{ display: 'flex' }}>
              <VideogameAsset className="danger" />&nbsp;&nbsp;
              <Grid container>Gameloft</Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Other;
