import { Box, Container, Grid, Link, Typography } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import InputAmount from './components/inputAmount'
import SelectCountry from './components/selectCountry'
import SwitchCurrency from './components/SwitchCurrency'
import { CurrencyContext } from './context/CurrencyContext'

function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
  } = useContext(CurrencyContext);
  const [resultCurrency, setResultCurrency] = useState(0);
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];

  useEffect(() => {
    if (firstAmount) {
      const apiUrl = `https://api.apilayer.com/exchangerates_data/convert?to=${codeToCurrency}&from=${codeFromCurrency}&amount=${firstAmount}`;
  
      var myHeaders = new Headers();
      myHeaders.append("apikey", "mTCITByknx60Lm0zpzNALooB0HI4AP76");
  
      var requestOptions = {
        method: 'GET',
        headers: myHeaders
      };
  
      fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(response => {
          console.log(response);
          setResultCurrency(response.result)
        })
        .catch(error => console.log('error', error));
    }
  }, [firstAmount, fromCurrency, toCurrency]);
  

  const boxStyles = {
    background: "#fdfdfd",
    marginTop: "10%",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    borderRadius: 2,
    padding: "4rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative"
  }

  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant='h5' sx={{ marginBottom: "2rem"}}>Shega Exchange Rates</Typography>
      <Grid container spacing={2}>
        <InputAmount />
        <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From" />
        <SwitchCurrency />
        <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
      </Grid>

      {firstAmount ? (
        <Box sx={{ textAlign: "left", marginTop: "1rem"}}>
          <Typography>{firstAmount} {fromCurrency} =</Typography>
          <Typography variant='h5' sx={{ marginTop: "5px", fontWeight: "bold"}}>{resultCurrency} {toCurrency}</Typography>
        </Box>
      ) : ""}
    </Container>
  )
}

export default App