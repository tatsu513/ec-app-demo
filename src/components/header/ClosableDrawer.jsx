import React, { useState, useCallback, useEffect } from 'react'
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { TextInput } from "../UIkit";
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { signOut } from '../../reducks/users/operations'
import { db } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: 256,
      flexShrink: 0,
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256,
  },
  searchField: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: 32
  }
}))

const ClosableDrawer = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { container } = props

  const selectMenu = (event, path) => {
    dispatch(push(path))
    props.close(event)
  }

  const [filters, setFilters] = useState([
    {
      func: selectMenu,
      label: 'すべて',
      id: 'all',
      value: '/'
    },
    {
      func: selectMenu,
      label: 'メンズ',
      id: 'male',
      value: '/?gender=mens'
    },
    {
      func: selectMenu,
      label: 'レディース',
      id: 'female',
      value: '/?gender=ledies'
    }
  ])

  const menus = [
    {
      func: selectMenu,
      label: '商品登録',
      icon: <AddCircleIcon />,
      id: 'register',
      value: '/product/edit'
    },
    {
      func: selectMenu,
      label: '注文履歴',
      icon: <HistoryIcon />,
      id: 'history',
      value: '/product/edit'
    },
    {
      func: selectMenu,
      label: 'プロフィール',
      icon: <PersonIcon />,
      id: 'mypage',
      value: '/user/mypage'
    }
  ]

  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    db.collection('categories')
      .orderBy('order', 'asc')
      .get()
      .then(snapshots => {
        const list = []
        snapshots.forEach(snapshot => {
          const data = snapshot.data()
          list.push({
            func: selectMenu,
            label: data.name,
            id: data.id,
            value: `/?category=${data.id}`
          })
        })
        setFilters(prevState => [...prevState, ...list])
      })
  }, [])

  const inputKeyword = useCallback((event) => {
    setKeyword(event.target.value)
  }, [setKeyword])
  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary"
        anchor= "right"
        open={props.open}
        onClose={(event) => props.close(event)}
        classes={{paper: classes.drawerPaper}}
        ModalProps={{keepMounted: true}}
      >
        <div
          onClose={(event) => props.close(event)}
          onKeyDown={(event) => props.close(event)}
        >
          <div className={classes.searchField}>
            <TextInput
              fullWidth={false} label={"キーワードを入力"} multiline={false}
              onChange={inputKeyword} requierd={false} row={1} value={keyword} type={"text"}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menus.map(menu => (
              <ListItem button key={menu.id} onClick={(event) => menu.func(event, menu.value)}>
                <ListItemIcon>
                  { menu.icon }
                </ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem button key="logout" onClick={() => dispatch(signOut())}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            {filters.map(filter => (
              <ListItem
                button
                key={filter.id}
                onClick={(event) => filter.func(event, filter.value)}
              >
                <ListItemText primary={filter.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </nav>

  )
}

export default ClosableDrawer