import { Route, Redirect, useLocation } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";

const UserRoute = ({ ...rest }) => {
  const isLoggedIn = useTypedSelector((state) => state.repositories.isLoggedIn);
  const location = useLocation<{ from: { pathname: string } }>();

  console.log(isLoggedIn, location, rest);

  return (
    <>
      {!isLoggedIn ? (
        <Route {...rest} />
      ) : location.state ? (
        <Redirect to={location.state.from} />
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default UserRoute;
