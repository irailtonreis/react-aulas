import React, { useState, useEffect, useMemo, useCallback } from "react";

function App() {
  const [techs, setTechs] = useState(["ReactJS", "React Native"]);
  const [newTech, setNewTech] = useState("");

  const handleAdd = useCallback(() => {
    setTechs([...techs, newTech]);
    setNewTech("");
  }, [newTech, techs]);

  useEffect(() => {
    const storageTech = localStorage.getItem("tech");

    if (storageTech) {
      setTechs(JSON.parse(storageTech));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tech", JSON.stringify(techs));
  }, [techs]);

  const techsSize = useMemo(() => techs.length, [techs]);

  // useEffect(() => {
  //   return () => {
  //     document.removeEventListener();
  //   };
  // }, []);

  return (
    <>
      {techs.map((t) => (
        <li key={t}>{t}</li>
      ))}
      <strong>
        Você tem
        {techsSize}
        Tecnologias
      </strong>

      <br />
      <input type="text" onChange={(e) => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
