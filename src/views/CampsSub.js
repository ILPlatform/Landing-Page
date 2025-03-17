import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardImg,
  Col,
  Container,
  Row,
  Button,
} from "reactstrap";
import { useScrollTop } from "../Helpers";
import useData from "../data";
import Tools from "../components/Tools";
import { v4 } from "uuid";
import DocumentMeta from "react-document-meta";
import ImageWebp from "../components/ImageWebp";
import { useParams } from "react-router-dom";
import campInfo from "../data/camps.json";
import schools from "../data/schools.json";
import "./CampsSub.css";
import { callFunction } from "../firebase";
import Loader from "../components/Loader";

const formatDate = (date) => date?.split("-").reverse().join("/");

const CampsSub = () => {
  const [camps, setCamps] = useState([]);
  const [groupedCamps, setGroupedCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  let { id } = useParams();
  useScrollTop();
  const data = useData()?.information?.camps;
  const meta = {
    title: data?.page_title,
    description: data?.page_description,
    canonical: `https://www.ilplatform.be/camps/${id}`,
    meta: {
      property: {
        "og:title": data?.page_title,
        "twitter:title": data?.page_title,
        "og:description": data?.page_description,
        "og:image": require("../assets/img/programme/ILPlatform_Books.png")
          .default,
        "og:site_name": "ILPlatform",
        "og:type": "website",
        "og:locale": "fr",
        "og:url": `https://www.ilplatform.be/camps/${id}`,
      },
    },
  };

  useEffect(() => {
    callFunction("camps_e_get")().then((response) => {
      const camps = response?.data?.response?.filter(
        (campWeek) => campWeek?.Id === id,
      )[0];

      const groupedCamps = camps?.Opportunities__r
        ? Object.values(
            camps?.Opportunities__r?.records?.reduce(
              (
                acc,
                {
                  Account,
                  Ages_Announced__c,
                  Registration_Link__c,
                  Price__c,
                  Parent_Organisation_Name__c,
                  Partner_Type__c,
                },
              ) => {
                if (Registration_Link__c) {
                  let { Name } = Account;
                  if (!acc[Name])
                    acc[Name] = {
                      Account,
                      Parent_Organisation_Name__c,
                      Opportunities: [],
                      Ages: [100, 0],
                      Partner_Type__c,
                    };

                  if (Ages_Announced__c) {
                    let [minAge, maxAge] =
                      Ages_Announced__c?.split("-").map(Number);
                    acc[Name].Ages = [
                      Math.min(acc[Name]?.Ages[0], minAge),
                      Math.max(acc[Name]?.Ages[1], maxAge),
                    ];
                  }
                  acc[Name]?.Opportunities?.push({
                    Ages_Announced__c,
                    Registration_Link__c,
                    Price__c: Price__c ?? "???",
                  });
                }

                return acc;
              },
              {},
            ),
          ).map((campGroup) => ({
            ...campGroup,
            Ages:
              campGroup?.Ages[0] === 100 ? "???" : campGroup?.Ages.join("-"),
          }))
        : [];

      setCamps(camps);
      setGroupedCamps(groupedCamps);
      setLoading(false);
    });
  }, [id]);

  console.log(camps);
  console.log(groupedCamps);

  return (
    <DocumentMeta {...meta}>
      <div className="wrapper mt-5 pt-5">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Container className="text-center">
              <h1>{camps?.Name}</h1>
              <h2 className="mt-0 h3">
                {formatDate(camps?.Start_Date__c)} -{" "}
                {formatDate(camps?.End_Date__c)}, {camps?.Number_of_Days__c}{" "}
                {data["days"]}{" "}
                {camps?.Number_of_Days__c !== 5 &&
                  `(${data?.sub?.not} ${formatDate(camps?.Excluded_Day__c)})`}
              </h2>
              {/* <p className="h5">(<b className="bolder">Attention:</b> Pas de cours le {campInfo[id]?.not})</p> */}
            </Container>

            {/* Different Camp Weeks */}
            <div className="section section-light text-center">
              <Container className="align-items-stretch">
                <Row className="pt-2 justify-content-center d-flex">
                  {/*<Col lg={2}/>*/}

                  {groupedCamps?.length > 0 ? (
                    groupedCamps?.map((campGroup) => (
                      <div className="col my-3 col-12 col-md-6 col-lg-4">
                        <div
                          className={`p-2 pt-0 camp-section w-100 h-100 d-flex justify-content-between flex-column`}
                        >
                          <div>
                            <div className="text-left">
                              <h3 className="h5 mx-3 mt-2">
                                <b className="h5 boldest font-size-18">
                                  {data?.activities[campGroup?.Partner_Type__c]}
                                </b>{" "}
                                <i>
                                  {data?.sub?.with}{" "}
                                  {campGroup?.Parent_Organisation_Name__c}
                                </i>
                                <ul className="mt-2 ml-0 pl-4">
                                  <li>
                                    <b className="bolder">{data?.sub?.age}:</b>{" "}
                                    {campGroup?.Ages} {data?.sub?.years}
                                  </li>
                                  {/* <li><b className="bolder">{data?.sub?.partner}</b>:  </li> */}
                                  <li>
                                    <b className="bolder">
                                      {data?.sub?.address}
                                    </b>
                                    : {campGroup?.Account?.Name} (
                                    {campGroup?.Account?.BillingAddress?.street}
                                    ,{" "}
                                    {
                                      campGroup?.Account?.BillingAddress
                                        ?.postalCode
                                    }{" "}
                                    {campGroup?.Account?.BillingAddress?.city})
                                  </li>
                                  {/* <li><b className="bolder">{data?.sub?.price}</b>: </li> */}
                                </ul>
                              </h3>
                            </div>
                          </div>
                          {campGroup?.Opportunities?.length > 1 ? (
                            <div className="row justify-content-end p-2">
                              {campGroup?.Opportunities?.map((camp) => (
                                <a
                                  className="col"
                                  href={camp?.Registration_Link__c}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <Button className="justify-content-center w-100">
                                    {camp?.Ages_Announced__c} {data?.sub?.years}
                                    , {camp?.Price__c} €
                                  </Button>
                                </a>
                              ))}
                            </div>
                          ) : (
                            <a
                              href={
                                campGroup?.Opportunities[0]
                                  ?.Registration_Link__c
                              }
                              target="_blank"
                              className="d-flex justify-content-end p-2"
                              rel="noreferrer"
                            >
                              <Button className="justify-content-center mx-auto w-100">
                                {data?.sub?.register} (
                                {campGroup?.Opportunities[0]?.Price__c} €)
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="h5 w-75">{data?.sub?.sorry}</p>
                  )}
                </Row>
              </Container>
            </div>
          </>
        )}
      </div>
    </DocumentMeta>
  );
};

export default CampsSub;
