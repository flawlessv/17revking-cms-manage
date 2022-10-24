import App from "../App";
import List from "../pages/List";
import Listlist from "../pages/Listlist";
import Listtable from "../pages/Listtable";
import Edit from "../pages/Edit";
import Means from "../pages/Means";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { BrowserRouter as Router ,Route,Routes } from "react-router-dom";
const BaseRouter=()=>(
<Router>
    <Routes>
        <Route path='/' element={<App/>}>
           {/* <Route path='/list' element={<List/>}></Route> */}
           <Route path='/listlist' element={<Listlist/>}></Route>
           <Route path='/listtable' element={<Listtable/>}></Route>
           <Route path='/edit' element={<Edit/>}></Route>
           <Route path='/edit/:id' element={<Edit/>}></Route>
           <Route path='/means' element={<Means/>}></Route>
        </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
    </Routes>
</Router>
)
export default BaseRouter