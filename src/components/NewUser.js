import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { CardContent, FormControl, FormGroup, ThemeProvider, 
    Button, Alert, TextField, InputAdornment, Typography, Select, MenuItem, InputLabel, ToggleButtonGroup, ToggleButton, FormControlLabel, FormLabel, Box, Stack, Pagination } from '@mui/material'
import theme from '../contexts/Theme';
import Card from '@mui/material/Card';
import { Person, Password, Nat } from '@mui/icons-material';
import { db } from '../firebase'
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import MoneyIcon from '@mui/icons-material/Money';
import SearchIcon from '@mui/icons-material/Search';

export default function NewUser() {
    const firstRef = useRef()
    const lastRef = useRef()
    const area = useRef()
    const duschAntal = useRef()
    const duschTid = useRef()
    const dag = useRef()
    const vecka = useRef();
    const { setNewUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [people, setPeople] = useState('');
    const [profil, setProfil] = useState('');
    const [tvatt, setTvatt] = useState('');
    const [disk, setDisk] = useState('');
    const [kok, setKok] = useState('');
   

    const handlePeople = (event) => {;
        setPeople(event.target.value);
    };
    const handleProfil = (event, newProfil) => {
        setProfil(newProfil);
    };
    const handleKokAntal = (event, value) => {
        setKok(value)
    };
    const handleDiskAntal = (event, value) => {
        setDisk(value)
        console.log(duschAntal.current.value)
    };
    const handleTvattAntal = (event, value) => {
        setTvatt(value)
    };

    async function handleSubmit(e){
        e.preventDefault()

        setLoading(true)
        setError('')

        if(area === '' && people === ''){
            return setError("Field can't be empty")
        }

        if(!isNaN(area) && !isNaN(duschAntal) && !isNaN(duschTid)){
            return setError("Not a valid number")
        }

        if(typeof firstRef.current.value !== 'string' && typeof lastRef.current.value !== 'string'){
            return setError("Not a name")
        }
        if(profil === ''){
            return setError("Please set a profiltyp")
        }

        try{
            setError('')
            setLoading(true)
            await setNewUser(firstRef.current.value, lastRef.current.value, area.current.value ,people,profil, duschAntal.current.value
                , duschTid.current.value, kok, disk, tvatt, dag.current.value, vecka.current.value);
            navigate('/profile')
        } catch{
            setError("Failed to create an account")
        }
    }

  return (
    <>
    <ThemeProvider theme={theme}>
        <Card sx={{ minWidth: 270, mt: '10vh', ml:1, mr:1, mb:0, pl: 2, pr: 2}} elevation={0}>
            <CardContent>
                <h1 className='text-center mb-4'>Inställningar</h1>
                {error && <Alert sx= {{mb:3}} severity = "error">{error}</Alert> }
                
                <Box component='div' sx={{overflowX:'hidden', overflowY:'scroll', mb:7}}>
                <form onSubmit={handleSubmit}>

                    <FormGroup id="name" sx={{pt:3}}>
                        <FormControl sx={{flexDirection:'column', flexWrap:'wrap', width:'100%', justifyContent:'space-between'}}>
                            <TextField variant="standard" label="Förnamn" type='name' inputRef={firstRef} placeholder='Förnamn' required
                            sx={{ mb:3 }} InputProps={{
                                startAdornment:(
                                    <InputAdornment position='start'>
                                        <Person />
                                    </InputAdornment>
                                ),
                            }}/>
                            <TextField variant="standard" label="Efternamn" type='name' inputRef={lastRef} placeholder= 'Förnamn' required
                            sx={{ mb:3 }} InputProps={{
                                startAdornment:(
                                    <InputAdornment position='start'>
                                        <Person />
                                    </InputAdornment>
                                ),
                            }}/>
                        </FormControl>
                    </FormGroup>

                    <FormGroup id="homesettings" sx={{flexDirection:'row', flexWrap:'wrap', width:'100%', justifyContent:'space-between'}}>
                        <FormControl variant='standard'  sx={{ mb:3, width:'49%', maxWidth:'50%', minWidth:'140px' }}>
                            <InputLabel id="antalpersoner">Hushåll</InputLabel>
                            <Select
                            labelId="antalpersoner"
                            id="antalpersoner"
                            value={people}
                            label="Hushåll"
                            onChange={handlePeople}
                            >
                            <MenuItem value={1}>1 person</MenuItem>
                            <MenuItem value={2}>2 personer</MenuItem>
                            <MenuItem value={3}>3 personer</MenuItem>
                            <MenuItem value={4}>4 personer</MenuItem>
                            <MenuItem value={5}>5 personer</MenuItem>
                            <MenuItem value={6}>6 personer</MenuItem>
                            <MenuItem value={7}>övrigt antal</MenuItem>

                            </Select>
                        </FormControl>
                        <FormControl  variant='standard' sx={{ mb:3, width:'49%', maxWidth:'50%', minWidth:'140px' }}>
                            <TextField variant="standard" label="Area" type='number' inputRef={area} placeholder='Area'
                            InputProps={{ inputProps: { min: 10, max: 200 } }} />
                        </FormControl>                  
                    </FormGroup>

                    <FormLabel sx={{mb:1}} required>Profiltyp</FormLabel>
                    <ToggleButtonGroup 
                            value={profil}
                            exclusive
                            onChange={handleProfil}
                            fullWidth
                            sx={{mb: 3}}
                            >
                                <ToggleButton value="Miljö" >
                                    <NaturePeopleIcon/>
                                    Miljö
                                </ToggleButton>
                                <ToggleButton value="Sparsam">
                                    <MoneyIcon/>
                                    Sparsam
                                </ToggleButton>
                                <ToggleButton value="Nyfiken">
                                    <SearchIcon/>
                                    Nyfiken
                                </ToggleButton>
                    </ToggleButtonGroup>

                    <FormLabel sx={{mb:1}}>Dusch</FormLabel>
                    <FormGroup id="name" >
                        <FormControl sx={{flexDirection:'row', flexWrap:'wrap', width:'100%', justifyContent:'space-between'}}>
                            <TextField variant="standard" label="Antal i veckan" type='number' placeholder='Antal i veckan' inputRef={duschAntal} 
                            sx={{width:'49%',maxWidth:'100%', minWidth:'140px'}}
                            InputProps={{ inputProps: { min: 1, max: 15 } }}/>

                            <TextField variant="standard" label="Tid per dusch" type='number' placeholder= 'Tid per dusch'  inputRef={duschTid}
                            InputProps={{ inputProps: { min: 1, max: 60 } }}
                            sx={{ mb:3, width: '49%',maxWidth:'100%', minWidth:'140px' }}/>
                        </FormControl>
                    </FormGroup>

                    <Box>
                        <Stack>
                            <FormLabel sx={{mb:1}} required>Hur ofta i veckan lagar du mat?</FormLabel>
                            <Pagination sx={{ml:'auto', mr:'auto', mb:3, alignContent:'space-between'}}  count={10} siblingCount={0} onChange={handleKokAntal} />
                        </Stack>
                        <Stack>
                            <FormLabel sx={{mb:1}} required>Hur ofta i veckan diskar du?</FormLabel>
                            <Pagination sx={{ml:'auto', mr:'auto', mb:3, alignContent:'space-between'}}  count={10} siblingCount={0} onChange={handleDiskAntal} />
                        </Stack>
                        <Stack>
                            <FormLabel sx={{mb:1}} required>Hur många gånger i månaden tvättar du?</FormLabel>
                            <Pagination sx={{ml:'auto', mr:'auto', mb:3, alignContent:'space-between'}} count={15} siblingCount={0} onChange={handleTvattAntal}  />
                        </Stack>
                    </Box>

                    <FormLabel sx={{mb:1}}>Energimål</FormLabel>
                    <FormGroup id="goal" >
                        <FormControl sx={{flexDirection:'row', flexWrap:'wrap', width:'100%', justifyContent:'space-between'}}>
                            <TextField variant="standard" label="Dagligt mål" type='number' placeholder='kWh' inputRef={dag} 
                            sx={{width:'49%',maxWidth:'100%', minWidth:'140px'}}
                            InputProps={{ inputProps: { min: 1, max: 40 } }}/>

                            <TextField variant="standard" label="Veckomål" type='number' placeholder= 'kWh'  inputRef={vecka}
                            InputProps={{ inputProps: { min: 5, max: 150 } }}
                            sx={{ mb:3, width: '49%',maxWidth:'100%', minWidth:'140px' }}/>
                        </FormControl>
                    </FormGroup>

                    <Button disabled = {loading} variant="contained" type='submit' sx={{width:'100%'}}>Ställ in</Button>
                </form>
                </Box>
            </CardContent>
        </Card>
    </ThemeProvider>
    </>
  )
}
