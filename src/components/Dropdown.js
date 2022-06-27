import {useEffect, useRef} from "react";
import {v4} from "uuid";
import {Col, Row} from "reactstrap";

const Dropdown = ({title, data, week}) => {
  
  return (
      <div className="shadow rounded-lg border text-left my-3">
        <h4 className="m-3"><b>{`${title?.title} : ${title?.start} - ${title?.end}`}</b></h4>
        <div className='answer text-left mx-2 border-top'>
          {Object.keys(data?.camps).filter(key => data?.camps[key]?.days === week)
            .map((camp) => (<a key={v4()} className="text-dark p-2" href={`/camps/${camp}`}>
              <Row className="ml-1">
                <img src={require(`assets/img/classes/${data?.products?.camp?.details[data?.camps[camp]?.loc][2]}`)?.default} alt="Camp Logo" height={"50px"}
                     className="ml-3" />
                <Col className="h-100 my-auto">
                  <h4 className="m-0 my-auto ml-3">
                    {data?.products?.camp?.list?.campActivities?.coding}
                    {" + "}
                    {data?.products?.camp?.list?.campActivities[data?.camps[camp]?.partnerActivity]}
                    {"  "}
                    <i>
                      {`(${data?.camps[camp]?.ages?.from}-${data?.camps[camp]?.ages?.to} ${data?.products?.camp?.list?.campActivities?.age})`}
                    </i>
                  </h4>
                </Col>
              </Row>
            </a>))}
        </div>
      </div>);
};

export default Dropdown;
