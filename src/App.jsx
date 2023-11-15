import {React,Component} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BoxProvider } from "./context/box_context";
import Box from "./box/Box";
import Navbar from "./box/Navbar";
import About from "./box/About";
import Rules from "./box/Rules";

class App extends Component{
    render(){

        return(
          <BoxProvider>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/about" element={ <About />}/>
                <Route path="/rules" element={ <Rules />}/>
                <Route path="/" element={ <Box />}/>
                {/* <Route path="/" element={ <Game />}/> */}
              </Routes>
            </Router>
           
          </BoxProvider>
        )
        }
}
export default App