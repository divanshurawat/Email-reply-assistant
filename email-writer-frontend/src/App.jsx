import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Container, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

function App() {

  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [geneRatedReply, setGeneratedReply] = useState('');
  const [loding, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading (true);
    setError('');
    setGeneratedReply('');
    
    try {
      const response= await axios.post("https://email-reply-assistant-6v0v.onrender.com/api/email/generate",{
        emailContent,
        tone
      }) ;
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('An error occurred while generating the reply. Please try again.');
      console.error(error);
    }finally{
      setLoading(false);
    }
  }
  return (
     <Container maxWidth="md" sx={{py:4}}>
      <Typography variant='h3' component="h4" gutterBottom>
        Email Reply Generator
      </Typography>
      <Box sx={{mx:5}}>
        <TextField
        fullWidth
        multiline
        rows={10}
        variant="outlined"
        label="Original Email Content"
        value={emailContent || ''}
        onChange={(e) => setEmailContent(e.target.value)}
        sx={{mb:2}}/>

        <FormControl fullWidth sx={{mb:2}}>
          <InputLabel>Tone(Optional)</InputLabel>
          <Select
            value= {tone|| ''}
            label="Tone(Optional)"
            onChange= {(e) => setTone (e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
              <MenuItem value="casual"> Casual</MenuItem>
          </Select>
        </FormControl>

        <Button
        variant='contained'
        onClick={handleSubmit}
        disabled={!emailContent || loding}
        fullWidth>
          {loding ? <CircularProgress size={24}/> : "Generate Reply"}
        </Button>
      </Box>

      {error &&(
        <Typography color="error" sx={{mt:2}}>
          {error}
        </Typography>
      )}

      {geneRatedReply &&(
        <Box sx={{mt:4}}>
          <Typography variant="h5" gutterBottom>
            Generated Reply:
          </Typography>
          <TextField
          fullWidth
          multiline
          rows={10}
          variant="outlined"
          value={geneRatedReply || ""}
          inputProps={{readOnly: true}}
          />

          <Button
          variant="outlined"
          sx={{mt:2}}
          onClick={() => {
            navigator.clipboard.writeText(geneRatedReply);
          }}
          >
            Copy to clipboard
          </Button>
        </Box>
      )}
    </Container>
  )
}

export default App
