import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faCheck } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useParams, useHistory, useLocation, Link } from 'react-router-dom';
import { FormatAmount, FormatDate } from '../../../helper';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { ActionType } from '../../../state/action-types';
import { Helmet } from 'react-helmet';
import { TextField } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ProductType } from '../../../state/reducers/repositoriesReducer';
import { ADMIN } from '../../../App';

const Container = styled.div`
  width: 1200px;
  max-width: 100%;
  background-color: var(--white-color);
  padding: 16px;
  display: flex;
`;

const Description = styled.div`
  padding: 16px;
  width: 50%;

  .product-name {
    font-size: 1.8rem;
    color: var(--text-color);
    font-weight: 300;
    margin-bottom: 8px;
  }

  .product-sale-number {
    font-weight: 200;
  }

  .product-item__price-current {
    color: var(--red-color);
    font-size: 32px;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500;
  }

  .product-item__price-old {
    color: rgb(128, 128, 137);
    text-decoration: line-through;
    font-size: 14px;
    line-height: 20px;
  }

  .product-item__discount-rate {
    font-weight: 400;
    margin-left: 8px;
    border: 1px solid var(--red-color);
    border-radius: 2px;
    background-color: rgb(255, 240, 241);
    color: var(--red-color);
    line-height: 18px;
    font-size: 14px;
    padding: 0px 4px;
  }

  .product-voucher {
    display: block;
    overflow: hidden;
    border: 1px solid var(--primary-color);
    position: relative;
    background: #fff;
    padding-bottom: 5px;
    margin: 8px 0 5px;
  }

  .product-voucher-title {
    display: block;
    overflow: hidden;
    font-size: 14px;
    color: #fff;
    padding: 6px 10px;
    text-transform: uppercase;
    background: var(--primary-color);
    border-bottom: 1px solid #ddd;
    font-weight: 400;
  }

  .product-voucher-title-2 {
    display: block;
    overflow: hidden;
    font-size: 12px;
    color: #333;
    padding: 5px 10px 0;
  }

  .promotion-more {
    background: #f6f6f6;
    padding: 6px 10px;
    border: 1px solid #f1f1f1;
    border-bottom: none;
    font-size: 14px;
    text-transform: uppercase;
    width: 100%;
    margin-top: 16px;
  }

  ul {
    border: 1px solid #f1f1f1;
    padding: 5px 0 5px 25px;
    margin-bottom: 0;
    list-style: none;
  }

  li {
    font-size: 0.8rem;
  }

  .group-input {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    margin-top: 8px;
  }

  .purchase {
    border: 1px solid #f1f1f1;
    padding: 5px 0 5px 25px;
    display: flex;
    justify-content: space-around;
    margin-top: 32px;
  }

  .input-quantity {
    padding: 8px 8px 9px 8px;
    border-top: 2px solid #1976d2;
    border-bottom: 2px solid #1976d2;
    border-left: 0;
    border-right: 0;
    box-shadow: none;
    -moz-appearance: textfield; /* Firefox */
    text-align: center;
    width: 60px;
  }

  .input-quantity:focus {
    outline: #1976d2;
  }

  .input-quantity::-webkit-outer-spin-button,
  .input-quantity::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }
`;

const ProductDetail: React.FC = () => {
  const {
    products,
    isLoggedIn,
    categories,
    user,
    menuItems,
    orderHistory,
    productsOrder,
  } = useTypedSelector((state) => state.repositories);

  const [quantity, setQuantity] = useState(1);
  const [newComment, setNewComment] = useState('');
  const [quantityOfProductUser, setQuantityOfProductUser] = useState(0);
  const [product, setProduct] = useState<ProductType>();

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const productId = useParams<{ id?: string }>()!.id;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [open, setOpen] = useState(false);

  let content = (
    <div style={{ padding: 64, fontSize: '2rem' }}>S???n ph???m kh??ng t???n t???i</div>
  );

  useEffect(() => {
    const productOfUser = productsOrder.find(
      (el) => el.productId === productId
    );

    const productTemp = products.find((el) => el.ProductID === productId)!;
    setProduct(productTemp);

    setQuantityOfProductUser(productOfUser ? productOfUser.quantity : 0);
  }, [productId, productsOrder, products]);

  if (product) {
    const menuItemOfProduct = menuItems.find((el) =>
      el.categories.find((cat) => cat.categoryId === product.CategoryID)
    );

    const isPurchased = orderHistory
      ? orderHistory.find((el) => {
          return (
            el.accept &&
            !!el.order.find((order) => order.productId === product.ProductID)
          );
        })
      : false;

    content = (
      <>
        <Container>
          <Helmet>
            <meta charSet='utf-8' />
            <title>{product.Name ?? 'S???n ph???m'}</title>
          </Helmet>
          <div style={{ width: '50%', border: '1px solid #ccc' }}>
            <img src={product.image} alt='Images' style={{ width: '90%' }} />
          </div>
          <Description>
            <p className='product-name'>{product.Name}</p>

            <div className='product-item__price'>
              <span className='product-item__price-current'>
                {FormatAmount(product.Price * (1 - product.Discount))}
              </span>
              <span className='product-item__price-old'>
                {FormatAmount(product.Price)}
              </span>
              <span className='product-item__discount-rate'>
                -{product.Discount * 100}%
              </span>
            </div>

            <div className='product-voucher'>
              <strong className='product-voucher-title'>
                KHUY???N M??I ?????C BI???T
              </strong>
              <span className='product-voucher-title-2'>
                <FontAwesomeIcon icon={faGift} style={{ marginRight: '8px' }} />
                X??? H??ng m??a d???ch
              </span>
            </div>

            <div className='promotion-more'>
              <strong>??u ????i th??m</strong>
            </div>
            <ul>
              {categories
                .find((el) => el.categoryId === product.CategoryID)
                ?.Promotion.map((el) => (
                  <li key={el}>
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: 'green' }}
                    />{' '}
                    {el}
                  </li>
                ))}
            </ul>

            <div className='purchase'>
              {user.email === ADMIN && (
                <Button
                  variant='contained'
                  style={{
                    backgroundColor: 'var(--primary-color)',
                    minWidth: '40%',
                  }}
                  onClick={() => {
                    history.push(`/product-detail/${product.ProductID}/edit`);
                  }}
                >
                  Ch???nh s???a
                </Button>
              )}
              <Button
                variant='contained'
                style={{
                  backgroundColor: 'var(--red-color)',
                  minWidth: '40%',
                }}
                onClick={() => {
                  if (user.email === ADMIN) {
                    setOpen(true);
                  } else {
                    const productChose = {
                      productId: product.ProductID,
                      name: product.Name,
                      image: product.image,
                      price: product.Price * (1 - product.Discount),
                      quantity,
                      totalAmount:
                        product.Price * (1 - product.Discount) * quantity,
                    };
                    if (!isLoggedIn) {
                      toast.warning('Vui l??ng ????ng nh???p!');
                      history.push({
                        pathname: '/login',
                        state: { from: location.pathname },
                      });
                    } else if (
                      quantity + quantityOfProductUser >
                      product.quantityRemaining
                    ) {
                      toast.warning(
                        `B???n ???? th??m ${quantityOfProductUser} s???n ph???m trong gi??? h??ng. S??? l?????ng s???n ph???m trong kho l?? ${product.quantityRemaining}`
                      );
                      return;
                    } else {
                      toast.success('S???n ph???m ???? ???????c th??m v??o gi??? h??ng!');
                      dispatch({
                        type: ActionType.ORDER,
                        payload: productChose,
                      });
                    }
                    setQuantity(1);
                    setQuantityOfProductUser(quantity + quantityOfProductUser);
                  }
                }}
              >
                {user.email === ADMIN ? 'X??a s???n ph???m' : 'Ch???n mua'}
              </Button>
              <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
              >
                <DialogTitle id='alert-dialog-title'>
                  {'X??a s???n ph???m?'}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                    B???n ch???c ch???n mu???n x??a s???n ph???m n??y?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpen(false)}>H???y b???</Button>
                  <Button
                    onClick={() => {
                      setOpen(false);
                      dispatch({
                        type: ActionType.ADMIN_DELETE_PRODUCT,
                        payload: product.ProductID,
                      });
                      toast.success('X??a th??nh c??ng s???n ph???m!');
                      history.replace('/');
                    }}
                    autoFocus
                  >
                    X??a
                  </Button>
                </DialogActions>
              </Dialog>
              {user.email !== ADMIN && (
                <div className='quantity'>
                  <span style={{ marginLeft: '36px' }}>S??? l?????ng</span>
                  <div className='group-input'>
                    <Button
                      variant='contained'
                      style={{ borderRadius: 0, minWidth: 0 }}
                      onClick={() => {
                        if (quantity <= 1) {
                          return;
                        }
                        setQuantity((state) => state - 1);
                      }}
                    >
                      -
                    </Button>
                    <input
                      type='number'
                      className='input-quantity'
                      value={quantity}
                      onChange={(e) => {
                        if (
                          +e.target.value + quantityOfProductUser >
                          product.quantityRemaining
                        ) {
                          toast.warning(
                            quantityOfProductUser > 0
                              ? `B???n ???? th??m ${quantityOfProductUser} s???n ph???m trong gi??? h??ng. S??? l?????ng s???n ph???m trong kho l?? ${product.quantityRemaining}`
                              : `S??? l?????ng s???n ph???m trong kho l?? ${product.quantityRemaining}`
                          );
                          setQuantity(
                            product.quantityRemaining - quantityOfProductUser >
                              0
                              ? product.quantityRemaining -
                                  quantityOfProductUser
                              : 1
                          );
                        } else {
                          setQuantity(
                            +e.target.value > 0 ? +e.target.value : 1
                          );
                        }
                      }}
                      pattern='[1-9]*'
                    />
                    <Button
                      variant='contained'
                      style={{ borderRadius: 0, minWidth: 0 }}
                      onClick={() => {
                        if (
                          quantity + quantityOfProductUser >=
                          product.quantityRemaining
                        ) {
                          toast.warning(
                            quantityOfProductUser > 0
                              ? `B???n ???? th??m ${quantityOfProductUser} s???n ph???m trong gi??? h??ng. Kho ch??? c??n l???i ${product.quantityRemaining} s???n ph???m`
                              : `Kho ch??? c??n l???i ${product.quantityRemaining} s???n ph???m`
                          );
                          return;
                        }
                        setQuantity((state) => state + 1);
                      }}
                    >
                      +
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Description>
        </Container>
        <div style={{ backgroundColor: 'var(--white-color)' }}>
          <p
            style={{
              backgroundColor: 'var(--primary-color)',
              color: 'var(--white-color)',
              padding: '1rem 2rem',
              fontSize: '1rem',
            }}
          >
            Th??ng tin s???n ph???m
          </p>
          <div style={{ display: 'flex' }}>
            <div style={{ flexBasis: '20%', marginLeft: 16 }}>
              <p>Nh??m s???n ph???m:</p>
              <p>Nh?? s???n xu???t:</p>
              <p>Qu???c gia:</p>
              <p>S??? l?????ng ???? b??n:</p>
              <p>S??? l?????ng c??n l???i:</p>
              <p>M?? t??? s???n ph???m:</p>
            </div>
            <div style={{ flexBasis: '80%', marginRight: '16px' }}>
              <p style={{ width: '150px', marginBottom: '13px' }}>
                <Link
                  to={`/menu-item/${menuItemOfProduct?.menuItemId}`}
                  className='select-input__link'
                  style={{
                    padding: 0,
                    color: 'var(--primary-color)',
                    fontSize: '1.1rem',
                  }}
                >
                  {menuItemOfProduct?.name}
                </Link>
              </p>
              <p>{product.Producer}</p>
              <p>{product.Source}</p>
              <p style={{ fontWeight: 'bold' }}>{product.Sold}</p>
              <p style={{ fontWeight: 'bold' }}>{product.quantityRemaining}</p>
              <p>{product.Description}</p>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: 'var(--white-color)' }}>
          <p
            style={{
              backgroundColor: 'var(--primary-color)',
              color: 'var(--white-color)',
              padding: '1rem 2rem',
              fontSize: '1rem',
            }}
          >
            B??nh lu???n v??? s???n ph???m
          </p>
          {(isPurchased || user.email === ADMIN) && (
            <div style={{ padding: '0 1rem', position: 'relative' }}>
              <TextField
                id='standard-basic'
                label='Vi???t b??nh lu???n c???a b???n'
                variant='standard'
                style={{
                  width: '100%',
                }}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button
                variant='contained'
                style={{
                  borderRadius: 0,
                  minWidth: 0,
                  position: 'absolute',
                  right: '1rem',
                  bottom: '1rem',
                }}
                disabled={newComment.trim().length === 0}
                onClick={(e) => {
                  if (!isLoggedIn) {
                    toast.warning('Vui l??ng ????ng nh???p!');
                    history.push({
                      pathname: '/login',
                      state: { from: location.pathname },
                    });
                    return;
                  }
                  dispatch({
                    type: ActionType.ADD_COMMENT,
                    payload: {
                      id: Math.random().toString(),
                      userId: user.id,
                      userAvatar: user.avatar,
                      idProduct: product.ProductID,
                      userName: user.lastName + ' ' + user.firstName,
                      date: FormatDate(Date.now()),
                      content: newComment,
                    },
                  });

                  setNewComment('');
                  toast.success('B???n ???? ????ng b??nh lu???n th??nh c??ng!');
                }}
              >
                ????ng
              </Button>
            </div>
          )}

          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {[...product.comments].reverse().map((comment) => (
              <div key={Math.random().toString()}>
                <ListItem
                  alignItems='flex-start'
                  style={{ position: 'relative' }}
                >
                  <ListItemAvatar>
                    <Avatar alt={comment.userName} src={comment.userAvatar} />
                  </ListItemAvatar>
                  <ListItemText
                    secondary={comment.date}
                    primary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component='span'
                          variant='body2'
                          color='text.primary'
                        >
                          {comment.userId === user.id
                            ? 'T??i'
                            : comment.userName}
                        </Typography>
                        {` ??? ${comment.content}`}
                      </>
                    }
                  />
                  {(comment.userId === user.id || user.email === ADMIN) && (
                    <Button
                      variant='text'
                      style={{
                        borderRadius: 0,
                        minWidth: 0,
                        position: 'absolute',
                        right: '1rem',
                        bottom: '1rem',
                      }}
                      onClick={() => {
                        dispatch({
                          type: ActionType.REMOVE_COMMENT,
                          payload: [comment.id, product.ProductID],
                        });
                        toast.success('X??a th??nh c??ng b??nh lu???n');
                      }}
                    >
                      X??a
                    </Button>
                  )}
                </ListItem>
                <Divider
                  variant='inset'
                  component='li'
                  style={{ margin: '8px 0' }}
                />
              </div>
            ))}
          </List>

          {(!product.comments || product.comments.length === 0) && (
            <p
              style={{
                padding: '0 3rem 1.5rem',
                fontSize: '1rem',
                margin: 0,
              }}
            >
              Ch??a c?? b??nh lu???n n??o v??? s???n ph???m
            </p>
          )}
        </div>
      </>
    );
  }

  return content;
};

export default ProductDetail;
