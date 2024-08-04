import { useEffect, useState } from "react";
import "./App.css";

const USERS_URL = "https://example.com/api/users";

const page1 = {
  count: 23,
  results: [
    { id: 1, firstName: "David", lastName: "Wallace" },
    { id: 2, firstName: "Sonia", lastName: "Ross" },
    { id: 3, firstName: "Anthony", lastName: "Thomson" },
    { id: 4, firstName: "Anthony", lastName: "Thomson" },
    { id: 5, firstName: "Anthony", lastName: "Thomson" },
    { id: 6, firstName: "Anthony", lastName: "Thomson" },
    { id: 7, firstName: "Anthony", lastName: "Thomson" },
    { id: 8, firstName: "Anthony", lastName: "Thomson" },
    { id: 9, firstName: "Anthony", lastName: "Thomson" },
    { id: 10, firstName: "Anthony", lastName: "Thomson" },
  ],
};

const page2 = {
  count: 23,
  results: [
    { id: 1, firstName: "David", lastName: "Wallace" },
    { id: 2, firstName: "Sonia", lastName: "Ross" },
    { id: 3, firstName: "Anthony", lastName: "Thomson" },
    { id: 4, firstName: "Anthony", lastName: "Thomson" },
    { id: 5, firstName: "Anthony", lastName: "Thomson" },
    { id: 6, firstName: "Anthony", lastName: "Thomson" },
    { id: 7, firstName: "Anthony", lastName: "Thomson" },
    { id: 8, firstName: "Anthony", lastName: "Thomson" },
    { id: 9, firstName: "Anthony", lastName: "Thomson" },
    { id: 10, firstName: "Anthony", lastName: "Thomson" },
  ],
};

const page3 = {
  count: 23,
  results: [
    { id: 11, firstName: "David", lastName: "Wallace" },
    { id: 12, firstName: "Sonia", lastName: "Ross" },
    { id: 13, firstName: "Anthony", lastName: "Thomson" },
  ],
};

async function fetchUser(page) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(page == 0 ? page1 : page == 1 ? page2 : page3);
    }, 1000);
  });
  // return fetch(`${USERS_URL}?page=${page}`);
}

function App() {
  const [page, setPage] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    fetchUser(page)
      .then((data) => {
        setTableData(data);
        setLastPage(Math.floor(data?.count / 10));
        setIsFetching(false);
      })
      .catch(() => {
        setTableData([]);
        setLastPage(0);
        setIsFetching(false);
      });
  }, [page]);

  const onFirstPageHandler = () => {
    setPage(0);
  };

  const onPreviousPageHandler = () => {
    setPage((prevPage) => (prevPage == 0 ? 0 : prevPage - 1));
  };

  const onNextPageHandler = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const onLastPageHandler = () => {
    setPage(lastPage);
  };

  return (
    <div>
      <div>Current Page : {page}</div>
      <div>Last Page: {lastPage}</div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {tableData.results?.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <section className="pagination">
        <button
          className="first-page-btn"
          disabled={page == 0 || isFetching}
          onClick={onFirstPageHandler}
        >
          first
        </button>
        <button
          className="previous-page-btn"
          disabled={page == 0 || isFetching}
          onClick={onPreviousPageHandler}
        >
          previous
        </button>
        <button
          className="next-page-btn"
          disabled={page == lastPage || isFetching}
          onClick={onNextPageHandler}
        >
          next
        </button>
        <button
          className="last-page-btn"
          disabled={page == lastPage || isFetching}
          onClick={onLastPageHandler}
        >
          last
        </button>
      </section>
    </div>
  );
}

export default App;
