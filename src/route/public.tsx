import { Route, Routes, Navigate } from "react-router-dom";
import UserAccount from "../pages/user/account";
import Error404 from "../pages/error404";
import Gxp from "../components/shared/gxpPage";
import Mint from "../components/shared/mintPage";
import Upgrade from "../components/shared/upgradePage";
import Invite from "../components/shared/invitePage";
import Help from "../components/shared/helpPage";
import Esports from "../components/shared/esports";
import Sports from "../components/shared/sports";
import { useMetaMask } from "metamask-react";

const RouterComp = () => {
  const { status } = useMetaMask();

  return (
    <Routes>
      <Route path="/" element={<Sports />} />
      <Route path="*" element={<Error404 />} />
      <Route
        path={"/account"}
        element={
          status === "connected" ? (
            <UserAccount />
          ) : (
            <Navigate replace to={"/"} />
          )
        }
      />
      <Route path={"/membership"} element={<Gxp />} />
      <Route path={"/mint"} element={<Mint />} />
      <Route path={"/upgrade"} element={<Upgrade />} />
      <Route path={"/invite"} element={<Invite />} />
      <Route path={"/help"} element={<Help />} />
      <Route path={"/esports"} element={<Esports />} />
    </Routes>
  );
};

export default RouterComp;
