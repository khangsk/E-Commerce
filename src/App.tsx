import { useEffect, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import SignIn from './components/Utils/SignIn';
import SignUp from './components/Utils/SignUp';
import styled from 'styled-components';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import ProductDetail from './components/MainContent/ProductDetail';
import { useTypedSelector } from './hooks/useTypedSelector';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { User, Products, Categories, MenuItems } from './firebase';
import jwt_decode from 'jwt-decode';
import { ActionType } from './state/action-types';
import {
  ProductType,
  UserType,
  CategoryType,
  MenuItemType,
} from './state/reducers/repositoriesReducer';
import Loading from './components/Utils/Loading';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import MyProfile from './components/MyProfile';
import Admin from './components/Admin';
import EditProduct from './components/Admin/EditProduct';
import { getCategoriesOfMenuItem, getProductsOfCategory } from './helper';
import SearchPage from './components/Utils/SearchPage';
import ForgetPassword from './components/Utils/ForgetPassword';

const Layout = styled.div`
  width: 1200px;
  max-width: 100%;
  margin: 66px auto;
`;

export const ADMIN = 'admin@gmail.com';

function App() {
  const { isLoggedIn, token, user } = useTypedSelector(
    (state) => state.repositories
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation<{ from: { pathname: string } }>();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      let products: ProductType[] = [];
      let categories: CategoryType[] = [];
      let menuItems: MenuItemType[] = [];
      const snapshotProducts = await Products.get();
      snapshotProducts.forEach((doc) => {
        if (!doc.data().isDeleted && doc.data().quantityRemaining > 0)
          products.push({
            ProductID: doc.id,
            CategoryID: doc.data().CategoryID,
            Name: doc.data().Name,
            Price: doc.data().Price,
            Discount: doc.data().Discount,
            Description: doc.data().Description,
            image: doc.data().Image,
            Producer: doc.data().Producer,
            Source: doc.data().Source,
            Star: doc.data().Star,
            comments: doc.data().comments,
            quantityRemaining: doc.data().quantityRemaining,
            Sold: doc.data().Sold,
            isDeleted: false,
          });
      });

      const listProductsOfCategory = getProductsOfCategory(products);

      const snapshotCategories = await Categories.get();
      snapshotCategories.forEach((doc) => {
        categories.push({
          categoryId: doc.id,
          menuItemId: doc.data().MenuItemID,
          name: doc.data().Name,
          isDeleted: doc.data().isDeleted,
          products: listProductsOfCategory[doc.id],
          Promotion: doc.data().Promotion,
        });
      });

      const listCategoriesOfMenuItem = getCategoriesOfMenuItem(categories);

      const snapshotMenuItems = await MenuItems.get();
      snapshotMenuItems.forEach((doc) => {
        menuItems.push({
          menuItemId: doc.id,
          name: doc.data().Name,
          isDeleted: doc.data().isDeleted,
          categories: listCategoriesOfMenuItem[doc.id],
        });
      });

      dispatch({
        type: ActionType.LOAD_PRODUCT,
        payload: [products, categories, menuItems],
      });
      setIsLoading(false);
    })();

    const getUserWhenReload = async (token: any) => {
      const decoded: any = jwt_decode(token);

      const snapshot = await User.where('email', '==', decoded.email).get();

      const user: UserType | any = {
        id: snapshot.docs[0].id,
        ...snapshot.docs[0].data(),
      };

      return user;
    };

    if (localStorage.getItem('token')) {
      const decoded: any = jwt_decode(token);
      const expirationTime = decoded.exp * 1000 - 60000;

      if (Date.now() >= expirationTime) {
        dispatch({ type: ActionType.LOGOUT });
      } else {
        (async () => {
          const user = await getUserWhenReload(localStorage.getItem('token'));
          dispatch({ type: ActionType.LOAD_USER, payload: user });
        })();
      }
    }
  }, [setIsLoading, dispatch, token]);

  return (
    <>
      {isLoading && <Loading />}
      <Layout>
        <ToastContainer autoClose={2000} />
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/register'>
            {!isLoggedIn && <SignUp />}
            {isLoggedIn && location.state && (
              <Redirect to={location.state.from} />
            )}
            {isLoggedIn && !location.state && <Redirect to='/' />}
          </Route>
          <Route path='/login'>
            {!isLoggedIn && <SignIn />}
            {isLoggedIn && location.state && (
              <Redirect to={location.state.from} />
            )}
            {isLoggedIn && !location.state && <Redirect to='/' />}
          </Route>
          <Route exact path='/forget-password'>
            {!isLoggedIn && <ForgetPassword />}
            {isLoggedIn && location.state && (
              <Redirect to={location.state.from} />
            )}
            {isLoggedIn && !location.state && <Redirect to='/' />}
          </Route>
          <Route exact path='/menu-item/:menuItemID' component={MainContent} />
          <Route exact path='/product-detail/:id' component={ProductDetail} />
          <Route exact path='/search' component={SearchPage} />
          <Route exact path='/cart'>
            {isLoggedIn && <Cart />}
            {!isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route exact path='/checkout'>
            {isLoggedIn && <Checkout />}
            {!isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route
            exact
            path={[
              '/my/account',
              '/my/purchase',
              '/my/order-waiting',
              '/my/new-password',
            ]}
          >
            {isLoggedIn && <MyProfile />}
            {!isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route
            exact
            path={['/admin/account', '/admin/order', '/admin/product']}
          >
            {isLoggedIn && user.email === ADMIN && <Admin />}
            {isLoggedIn && user.email !== ADMIN && <Redirect to='/' />}
            {!isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route exact path='/product-detail/:id/edit'>
            {isLoggedIn && user.email === ADMIN && <EditProduct />}
            {isLoggedIn && user.email !== ADMIN && <Redirect to='/' />}
            {!isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Redirect to='/' />
        </Switch>
      </Layout>
      <Footer />
    </>
  );
}

export default App;
