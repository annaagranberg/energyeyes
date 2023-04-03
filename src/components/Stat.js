import { Box } from '@mui/material'
import React from 'react'
import BottomBar from './BottomBar'

export default function Stat() {
  return (
    <><div>Stat</div><Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
          <BottomBar sx={{ width: '100%' }} />
      </Box></>
  )
}
