import React, { useCallback, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { getIsSignedIn } from '../../reducks/users/selectores'
import Logo from '../../assets/img/icons/logo.png'
import { push } from 'connected-react-router'
import { HeaderMenus, ClosableDrawer } from './index'


const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  menuBar: {
    'backgroundColor': '#fff',
    color: '#444',
  },
  toolBar: {
    margin: '0 auto',
    maxWidth: 1024,
    width: '100%'
  },
  iconButtons: {
    margin: '0 0 0 auto'
  }
})

const Header = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const isSignedIn = getIsSignedIn(selector)

  const [open, setOpen] = useState(false)

  const handleDrawerToggle = useCallback((event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setOpen(!open)
  }, [open, setOpen])
  return (
    <div className={classes.root} >
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
        <img alt="Logo" src={Logo} width="128px" onClick={() => dispatch(push('/'))} role="button" />
          {isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} close={handleDrawerToggle} />
    </div>
  )
}

export default Header