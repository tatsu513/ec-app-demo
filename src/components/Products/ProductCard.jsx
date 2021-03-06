import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core'
import { deleteProduct } from '../../reducks/products/operations'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: 8,
      width: 'calc(50% - 16px)'
    },
    [theme.breakpoints.up('sm')]: {
      margin: 16,
      width: 'calc(33.333% - 32px)'
    }
  },
  content: {
    display: 'flex',
    padding: '16 8',
    textAlign: 'left',
    '&:last-child': {
      paddingBottom: 16
    }
  },
   media: {
     height: 0,
     paddingTop: '100%'
   },
   price: {
     color: theme.palette.secondary.main,
     fontSize: 16,
   }

}))

const ProductCard = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const price = props.price.toLocaleString()
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={props.images[0].path}
        title=""
        onClick={() => dispatch(push(`/product/${props.id}`))}
      />
      <CardContent className={classes.content}>
        <div onClick={() => dispatch(push(`/product/${props.id}`))}>
          <Typography color="textSecondary" component="p">
            {props.name}
          </Typography>
          <Typography  className={classes.price} component="p">
            ¥{price}
          </Typography>
        </div>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => {
            dispatch(push(`/product/edit/${props.id}`))
            handleClose()
          }}>
            編集する
          </MenuItem>
          <MenuItem onClick={() => {
            dispatch(deleteProduct(props.id))
            handleClose()
          }}>
            削除する
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  )
}

export default ProductCard