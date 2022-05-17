import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'

export default function AppNavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <div className='space-between appbar row-align-items-center'>
          <span>SNOMED Diagnosis System</span>
        </div>
      </AppBar>
    </Box>
  );
}