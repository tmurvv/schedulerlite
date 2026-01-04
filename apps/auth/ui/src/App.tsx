import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { Box } from "@mui/material";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { ViewContexts } from "./enums/ViewContexts";
import { Banner as MobileBanner } from "./components/mobile/Banner";
import ResetPassword from "./components/ResetPassword";

export const ViewContext = createContext<{
  view: string;
  setView: Dispatch<SetStateAction<string>>;
}>({
  view: "",
  setView: () => {},
});

function App() {
  const [view, setView] = useState<string>(ViewContexts.LOGIN);

  const encoded = window.location.search.split("reset=")?.[1];
  const email = encoded ? atob(encoded) : undefined;

  console.log("email", email);
  // useEffect(()=>{
  //     const queryString = window.location.search;
  //     console.log(queryString);
  //     // const params = new URLSearchParams(window.location.search) // id=123
  //     // const params = window.location.search.substr(1).split('&').reduce(function (q, query) {
  //     //     var chunks = query.split('=');
  //     //     var key = chunks[0];
  //     //     var value = decodeURIComponent(chunks[1]);
  //     //     value = isNaN(Number(value))? value : Number(value);
  //     //     return (q[key] = value, q);
  //     // }, {});
  //     // if (!params || !params.reset) return;
  //     // setPage('ResetPassword');
  //     // params.reset&&setResetPasswordEmail(atob(params.reset));
  // },[]);
  return (
    <ViewContext.Provider value={{ view, setView }}>
      {<MobileBanner />}
      v0.1.3a
      <Box>
        {!email && view === ViewContexts.LOGIN && <Login />}
        {!email && view === ViewContexts.SIGNUP && <SignUp />}
        {email && <ResetPassword email={email} />}
      </Box>
    </ViewContext.Provider>
  );
}

export default App;
