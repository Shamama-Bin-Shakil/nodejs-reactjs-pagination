import React, { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageActive, setPageActive] = useState(1);
  console.log(pageActive);

  const totalPage = (total, limit) => {
    const page = [];
    for (let i = 1; i <= Math.ceil(parseInt(total) / limit); i++) {
      page.push(i);
    }
    return page;
  }
  useEffect(() => {
    axios.get("http://localhost:8080/api/color/api_key", {
      params: {
        page: pageActive,
        limit: 10,
      }
    }).then(({ data }) => {
      setUsers(data.data)
      setTotal(data.count);
      console.log(data);
    }).catch((error) => {
      console.log(error);
    })
  }, [pageActive])

  return (
    <>
      <div className="container my-5">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {pageActive !== 1 && <li className="page-item" onClick={() => setPageActive(pageActive - 1)}><a className="page-link" href="javascript:void(null)">Previous</a></li>}
            {totalPage(total, 10).map(pageNo =>
              <li className={`page-item ${pageNo === pageActive ? "active" : null} `} key={pageNo} onClick={() => setPageActive(pageNo)}>
                <a className="page-link" href="javascript:void(null)">{pageNo}</a>
              </li>
            )}
            {pageActive !== Math.ceil(parseInt(total) / 10) && <li className="page-item" onClick={() => setPageActive(pageActive + 1)}><a className="page-link" href="#">Next</a></li>}
          </ul>
        </nav>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">User Id</th>
              <th scope="col">Color Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map(element => {
              return <tr key={element._id}>
                <td>{element.user}</td>
                <td>{element.color_name}</td>
              </tr>
            })}
          </tbody>
        </table>

      </div>
    </>
  );
};

export default App;
