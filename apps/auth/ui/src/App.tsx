import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { Box } from "@mui/material";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { PageContext } from "./contexts/PageContext";
import { ViewContexts } from "./enums/ViewContexts";
import { Banner as MobileBanner } from "./components/mobile/Banner";
import ResetPassword from "./components/ResetPassword";
import { Banner } from "./components/Banner";
import { ScreenWidthContext } from "scheduler-ui/src/App";

export const ViewContext = createContext<{
  view: string;
  setView: Dispatch<SetStateAction<string>>;
}>({
  view: "",
  setView: () => {},
});

const port = import.meta.env.VITE_APP_PORT;

export const ScreenWidthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ScreenWidthContext.Provider value={{ screenWidth }}>
      {children}
    </ScreenWidthContext.Provider>
  );
};

function App() {
  const { screenWidth } = useContext(ScreenWidthContext);
  const isMobile = screenWidth <= 768; // Adjust this value based on your desired mobile breakpoint

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
    <ScreenWidthProvider>
      <ViewContext.Provider value={{ view, setView }}>
        {isMobile ? <MobileBanner /> : <Banner />}
        v0.1.3a
        <Box>
          {!email && view === ViewContexts.LOGIN && <Login />}
          {!email && view === ViewContexts.SIGNUP && <SignUp />}
          {email && <ResetPassword email={email} />}
        </Box>
      </ViewContext.Provider>
    </ScreenWidthProvider>
  );
}

export default App;
