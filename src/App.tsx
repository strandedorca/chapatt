import { Container, Grid } from '@mui/material'
import './App.css'

function App() {
  return (
    <Container maxWidth={false}>
      <Grid container spacing={2}>
        <Grid id='channel-bar' lg={1}>
          Channels
        </Grid>
        <Grid id='left-bar' lg={2}>
          Channel Details
        </Grid>

        <Grid container lg={9}>
          <Grid id="header" lg={12}>
            Header
          </Grid>
          <Grid container lg={12}>
            <Grid id="conversation" lg={8}>
              Main
            </Grid>
            <Grid id="right-bar" lg={4}>
              User information
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
