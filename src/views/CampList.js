import React from 'react';
import {Container,} from 'reactstrap';
import {useScrollTop} from 'Helpers';
import useData from 'data';
import {v4} from 'uuid';
import Dropdown from "../components/Dropdown";

function CampList(props) {
  useScrollTop();
  const data = useData();
  const dataCamp = data?.products?.camp
  
  return (
    <Container className="text-center mt-5 pt-4">
      <h2 className="mb-4 mx-auto"><b>{data?.classlist?.titles["camps"]} </b></h2>
      {Object.keys(data?.weeks)
        .filter((key) => new Date(data?.weeks[key]?.start) > new Date())
        .map(week => <Dropdown key={v4()} title={data?.weeks[week]} data={data} week={week}/>
        )}
    </Container>
  );
}

export default CampList;
