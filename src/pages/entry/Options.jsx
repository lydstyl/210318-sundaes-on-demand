import Row from "react-bootstrap/Row";
import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);

  // optionType is 'scoops' or 'toopings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        // TODO: handle error response
      });
  }, [optionType]);

  // TODO: replace 'null' with ToppingOption when available
  const ItemComponent = optionType === "scoops" ? ScoopOption : null;

  const optionItems = items.map((i) => (
    <ItemComponent key={i.name} name={i.name} imagePath={i.imagePath} />
  ));

  return <Row>{optionItems}</Row>;
}