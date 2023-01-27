import { useEffect, useState } from "react";
import { getItem, getItems } from "../api/People";

function Table() {
  const [arrCharters, setArrCharters] = useState([]);
  const [errorState, setErrorState] = useState([
    { hasError: false, message: "" },
  ]);
  const [selectItem, setSelectItem] = useState(
    "https://digimon-api.com/api/v1/digimon/1"
  );

  const [charter, setCharter] = useState();
  const [page, setPage] = useState(0);
  const [dataPage, setDataPage] = useState();

  useEffect(() => {
    const arrItems = getItems(page);
    arrItems
      .then((data) => {
        setArrCharters(data.content);
        setDataPage(data.pageable);
      })
      .catch(handleError());
  }, [page]);

  useEffect(() => {
    const arrItem = getItem(selectItem);
    arrItem
      .then((data) => {
        setCharter(data);
      })
      .catch(handleError());
  }, [selectItem]);

  function handleError(err) {
    setErrorState({ hasError: true, message: err });
  }

  function showDigimon(item) {
    setSelectItem(item.href);
  }

  function onChangePage(next) {
    if (page + next >= dataPage) return;
    if (page + next < 0) return;

    setPage(page + next);
  }

  // currentPage: 0
  // elementsOnPage: 5
  // nextPage: "https://digimon-api.com/api/v1/digimon?page=1"
  // previousPage: ""
  // totalElements: 1422
  // totalPages: 283

  return (
    <>
      {errorState.hasError && <p> {errorState.message} </p>}
      <span> Tabla de Digimon </span>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {arrCharters?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td onClick={() => showDigimon(item)}> Ver </td>
            </tr>
          ))}
        </tbody>
      </table>

      <section>
        <button onClick={() => onChangePage(-1)}>Prev</button>
        {page}
        <button onClick={() => onChangePage(1)}>Next</button>
      </section>

      {charter && (
        <div>
          <h1> {charter.name} </h1>
          <img src={charter.images[0].href} />
          <h3>Skills</h3>
          {charter.skills.map((item) => (
            <li> {item.skill} </li>
          ))}
        </div>
      )}
    </>
  );
}

export default Table;
