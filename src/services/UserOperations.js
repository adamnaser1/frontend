import axios from "axios" ;

export const getdata = (callback) => {
    axios.get('http://localhost:8003/getdata')
        .then((res) => callback(res))
}

