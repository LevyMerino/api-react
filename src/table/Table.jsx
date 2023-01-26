import { useEffect, useState } from "react";
import { getPeople } from "../api/People";
import Details from "./Details";

function Table() {
  const [people, setPeople] = useState([]);
  const [errorState, setErrorState] = useState([
    { hasError: false, message: "" }
  ]);

  const [selectItem, setSelectItem] = useState();

  useEffect(() => {
    const arrPeople = getPeople();
    arrPeople
      .then((data) => {
        setPeople(data.content);
      })
      .catch(handleError());
  }, []);

  useEffect(() => {}, [selectItem]);

  function handleError(err) {
    setErrorState({ hasError: true, message: err });
  }

  function showDigiMon(idItem) {
    setSelectItem(idItem);
  }

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
          {people.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td onClick={() => showDigiMon(item.id)}> Ver </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
