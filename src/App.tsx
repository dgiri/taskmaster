// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { HeaderElement } from "@/components/HeaderElement";
import { FooterElement } from "@/components/FooterElement";
import { BodyElement } from "@/components/BodyElement";
import "./App.css";
import { ThemeProvider } from "@/components/ThemeProvider";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <ThemeProvider>
        <div className="min-h-screen">
          <HeaderElement />
          <BodyElement />
          <FooterElement />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
