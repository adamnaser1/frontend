import React, { useEffect , useState , useContext } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/Delete';
import { NavLink } from "react-router-dom";
import { adddata } from "./context/ContextProvider";
import { updatedata } from './context/ContextProvider';
import { deldata } from "./context/ContextProvider";
import { getdata } from "../services/UserOperations";


const Home = () => {

  const[userdata,setUserdata] = useState([]);
  // console.log(userdata);
  const {udata,setUdata} = useContext(adddata); 
  const { updata, setUpdata } = useContext(updatedata); 
  const { dltdata, setDLTdata } = useContext(deldata); 
  const [search,setSearch]  = useState("");
  const{datafiltered,setDataFiltered} = useState("");

const getData = ()=>{
    getdata((callback) => {
    setUserdata(callback.data);
})
}

useEffect(()=>{
  const filterDatas = () => {
    if (search==="") {
      getData();
    } else {
      const temp = userdata.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
      setUserdata(temp);
    }
  };
  filterDatas();
},[search])
const handleSearch = (e)=>{
  setSearch(e.target.value);
}

const deleteuser = async (id)=>{
      const res2 = await fetch(`/deleteuser/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        }
      });
      const deletedata = await res2.json();
      console.log(deletedata);

      if(res2.status === 422 || !deletedata){
        console.log("error");
      }else{
        console.log("user deleted");
        setDLTdata(deletedata); 
        getdata();

      }
}


  return (

    <>
    {
      udata ? 
      <>
        <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>{udata.name}!</strong> added successfully ! 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      </> : ""
    }
    {
      updata ? 
      <> 
        <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>{updata.name}!</strong> updated successfully ! 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      </> : ""
    } 
     {
      dltdata ? 
      <> 
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>{dltdata.name}!</strong> deleted successfully ! 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      </> : ""
    }

<form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={handleSearch}
                />
            </form>

    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-2 mb-2" style={{ textAlign: 'right' }}>
          <NavLink to="/register" className="btn btn-primary">Ajouter Personne</NavLink>
        </div>
        <table className="table">
          <thead>
            <tr className="table-dark">
              <th scope="col">ID</th>
              <th scope="col">Username</th>
              <th scope="col">email</th>
              <th scope="col">Job</th>
              <th scope="col">Number</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>

          {
                                userdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr key={id}>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.name}</td>
                                                <td>{element.email}</td>
                                                <td>{element.work}</td>
                                                <td>{element.mobile}</td>
                                                <td className="d-flex justify-content-between">
                                                    <NavLink to={`view/${element._id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                                                    <NavLink to={`edit/${element._id}`}>  <button className="btn btn-primary"><CreateIcon /></button></NavLink>
                                                    <button className="btn btn-danger" onClick={()=>deleteuser(element._id)} ><DeleteOutlineIcon /></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
            
           
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Home;
