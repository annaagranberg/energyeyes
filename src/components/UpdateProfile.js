import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { CardContent, FormControl, FormGroup, ThemeProvider, 
    Button, Alert, TextField, InputAdornment, Typography, Select, MenuItem, InputLabel } from '@mui/material'
import theme from '../contexts/Theme';
import Card from '@mui/material/Card';
import { Person, Password } from '@mui/icons-material';
import { db } from '../firebase'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const firstRef = useRef()
    const lastRef = useRef()
    const { currentUser, updateEmail, updatePassword, updateName, updateArea, updatePeople } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [area, setArea] = useState('');
    const [people, setPeople] = useState('');


    const handleArea = (event) => {
        setArea(event.target.value);
    };
    const handlePeople = (event) => {;
        setPeople(event.target.value);
    };

    function handleSubmit(e){
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError('')

        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }

        if(area !== '' && people !== ''){
            promises.push(updateArea(area))
            promises.push(updatePeople(people))
        }

        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }
        if(typeof firstRef.current.value === 'string' && typeof lastRef.current.value === 'string'){
            promises.push(updateName(firstRef.current.value, lastRef.current.value ))
        }

        Promise.all(promises).then(() => {
            navigate('/profile')
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false)
        })
    }

  return (
    <>
    <ThemeProvider theme={theme}>
        <Button component={Link} to="/profile" sx={{padding:0, mt:2}}>
          <ArrowBackIosIcon/>
        </Button>
        <Card sx={{ minWidth: 270, mt: '10vh', ml:1, mr:1}} elevation={0}>
            <CardContent>
                <h2 className='text-center mb-4'>Uppdatera profil</h2>
                {error && <Alert sx= {{mb:3}} severity = "error">{error}</Alert> }
                
                <form onSubmit={handleSubmit}>
                    <FormGroup id="email">
                        <FormControl>
                            <TextField variant="standard" label="email" type='email' inputRef={emailRef} required defaultValue={currentUser.email}
                            sx={{mb:3}} InputProps={{
                                startAdornment:(
                                    <InputAdornment position='start'>
                                        <Person />
                                    </InputAdornment>
                                ),
                            }}/>
                        </FormControl>
                    </FormGroup>

                    <FormGroup id="password">
                        <FormControl/>
                        <TextField variant='standard' label='lösenord' type='password' inputRef={passwordRef} placeholder='Lämna tom för samma'
                        sx={{mb:3}} InputProps={{
                            startAdornment:(
                                <InputAdornment position='start'>
                                    <Password />
                                </InputAdornment>
                            ),
                        }}/>
                    </FormGroup>

                    <FormGroup id="password-confirm">
                        <TextField variant="standard" label="bekräfta lösenord" type='password' inputRef={passwordConfirmRef} placeholder='Leave blank to keep the same'
                            sx={{mb:3}} InputProps={{
                                startAdornment:(
                                    <InputAdornment position='start'>
                                        <Password />
                                    </InputAdornment>
                                ),
                            }}/>
                    </FormGroup>

                    <FormGroup id="name" >
                        <FormControl sx={{flexDirection:'row', flexWrap:'wrap', width:'100%', justifyContent:'space-between'}}>
                            <TextField variant="standard" label="Förnamn" type='name' inputRef={firstRef} placeholder='För'
                            sx={{ mb:3, maxWidth:'49%', minWidth:'140px' }} InputProps={{
                                startAdornment:(
                                    <InputAdornment position='start'>
                                        <Person />
                                    </InputAdornment>
                                ),
                            }}/>
                            <TextField variant="standard" label="Efternamn" type='name' inputRef={lastRef} placeholder= 'Förnamn'
                            sx={{ mb:3, maxWidth:'49%', minWidth:'140px' }} InputProps={{
                                startAdornment:(
                                    <InputAdornment position='start'>
                                        <Person />
                                    </InputAdornment>
                                ),
                            }}/>
                        </FormControl>
                    </FormGroup>

                    <FormGroup id="homesettings" sx={{flexDirection:'row', flexWrap:'wrap', width:'100%', justifyContent:'space-between'}}>
                        <FormControl fullWidth sx={{ mb:3, maxWidth:'49%', minWidth:'140px' }} variant='standard'>
                            <InputLabel id="antalpersoner">Hushåll</InputLabel>
                            <Select
                            labelId="antalpersoner"
                            id="antalpersoner"
                            value={people}
                            label="Hushåll"
                            onChange={handlePeople}>
                            <MenuItem value={1}>1 person</MenuItem>
                            <MenuItem value={2}>2 personer</MenuItem>
                            <MenuItem value={3}>3 personer</MenuItem>
                            <MenuItem value={4}>4 personer</MenuItem>
                            <MenuItem value={5}>övrigt antal</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ mb:3, maxWidth:'49%', minWidth:'140px' }} variant='standard'>
                            <InputLabel id="yta">Yta</InputLabel>
                            <Select
                            labelId="yta"
                            id="yta"
                            value={area}
                            label="Yta"
                            onChange={handleArea}>
                            <MenuItem value={15}>15-20 kvm</MenuItem>
                            <MenuItem value={20}>20-25 kvm</MenuItem>
                            <MenuItem value={25}>25-30 kvm</MenuItem>
                            <MenuItem value={30}>30-40 kvm</MenuItem>
                            <MenuItem value={40}>40-100 kvm</MenuItem>
                            </Select>
                        </FormControl>
                        
                    </FormGroup>

                    <Button disabled = {loading} variant="contained" type='submit' sx={{width:'100%'}}>Updatera</Button>
                </form>
            </CardContent>
        </Card>

        <Typography align='center' sx={{mt:2}}>
                    <Link to="/profile" style={{textDecoration:'none', color:'#ACD0C0'}}>Tillbaka</Link>
        </Typography>
    </ThemeProvider>
    </>
  )
}
