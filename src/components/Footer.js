import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  Row,
} from "reactstrap";

import useData from "../data";
import Social from "./Social";

const MailchimpSubscribeForm = ({ data, status, message, onValidated }) => {
  const [email, setEmail] = useState();
  const submit = () =>
    email &&
    email.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email,
    });

  return (
    <Form>
      {status === "success" ||
        (status === "error" && (
          <div
            style={{ color: status === "success" ? "green" : "red" }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        ))}
      <InputGroup>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          onClick={submit}
          disabled={status === "sending" || status === "success"}
          color={"primary"}
        >
          {data?.submit}
        </Button>
      </InputGroup>
    </Form>
  );
};

function Footer() {
  const data = useData()?.navigation;
  const url =
    "https://ilplatform.us20.list-manage.com/subscribe/post?u=072ca7cb38917f94c7fb1bfe9&amp;id=98bb038e35";

  return (
    <footer className="footer footer-big footer-black">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" md="9" sm="9" xs="12">
            <Row>
              <Col md={4} className="text-center text-md-left">
                <div className="links">
                  <ul className="uppercase-links stacked-links text-center text-md-left">
                    <li>
                      <p>
                        <a href="/">{data["home"]}</a>
                      </p>
                    </li>
                    <li>
                      <p>
                        <a href="/about/">{data["about-us"]}</a>
                      </p>
                    </li>
                    <li>
                      <p>
                        <a href="/camps/" rel={"nofollow"}>
                          {data["classes"]}
                        </a>
                      </p>
                    </li>
                    <li>
                      <p>
                        <a href="/contact/">{data["contact-us"]}</a>
                      </p>
                    </li>
                  </ul>
                </div>
              </Col>

              <Col md={4} className="text-center text-md-left">
                <div className="links">
                  <ul className="uppercase-links stacked-links text-center text-md-left">
                    <li>
                      <p>
                        Bd du Régent 54A, <br />
                        1000 Bruxelles
                      </p>
                    </li>
                    <li>
                      <p>
                        <a href="mailto:info@ilplatform.be">
                          info@ilplatform.be
                        </a>
                      </p>
                    </li>
                    <li className={""}>
                      <p>
                        <a href="tel:+32 470 87 74 29">+32 470 87 74 29</a>
                      </p>
                    </li>
                  </ul>
                </div>
              </Col>

              <Col md={4}>
                <div className="social-area text-center">
                  <Social spacedOut={false} />
                </div>
                {/*<p className="stacked-links">{data['subscribe']}</p>*/}
                {/*<MailchimpSubscribe*/}
                {/*  url={url}*/}
                {/*  render={({subscribe, status, message}) => (*/}
                {/*    <div>*/}
                {/*      <MailchimpSubscribeForm*/}
                {/*        url={url}*/}
                {/*        status={status}*/}
                {/*        message={message}*/}
                {/*        onValidated={(formData) => subscribe(formData)}*/}
                {/*        data={data}*/}
                {/*      />*/}
                {/*    </div>*/}
                {/*  )}*/}
                {/*/>*/}
                <div
                  className="content"
                  dangerouslySetInnerHTML={{
                    __html: `
<!--Zoho Campaigns Embed Button Starts--> <script type="text/javascript" src="https://zcv4-zcmp.maillist-manage.eu/js/jquery-1.11.0.min.js"></script> <script type='text/javascript' src='https://zcv4-zcmp.maillist-manage.eu/js/jquery-migrate-1.2.1.min.js'></script> <script type='text/javascript' src='https://zcv4-zcmp.maillist-manage.eu/js/jquery-ui-1.10.4.custom.min.js'></script> <a href="https://zcv4-zcmp.maillist-manage.eu/ua/Optin?od=12ba7e9ab66e&amp;zx=14acf3d40e&amp;tD=11e16659e05b4979&amp;sD=11e16659e05b9afe" id="embedLink" target="_blank"> <button type="button" purpose="nrmlBtn" class="" style="outline: none 0px; background-color: rgb(167, 167, 167); color: rgb(255, 255, 255); border-image: initial; text-align: center; width: 100%; cursor: pointer; border-radius: 10px; padding: 3px; border-width: 1px; border-style: solid;" changetype="EMBED_BUTTON" id="EMBED_BUTTON" name="EMBED_BUTTON" value="Join Our Newsletter" onclick="zc_loadForm('campaigns.zoho.eu','https://zcv4-zcmp.maillist-manage.eu/ua/Optin?od=12ba7e9ab66e&amp;zx=14acf3d40e&amp;tD=11e16659e05b4979&amp;sD=11e16659e05b9afe')" formopenin="New Window" btntype="nrmlBtn"> <span class="zceditcnt" style="">Newsletter</span> </button> </a> <div purpose="uploadButtonImageCtn" style="display: none;"><a name="EMBED_BUTTON" style="cursor: pointer" href="https://zcv4-zcmp.maillist-manage.eu/ua/Optin?od=12ba7e9ab66e&amp;zx=14acf3d40e&amp;tD=11e16659e05b4979&amp;sD=11e16659e05b9afe" target="_blank"><img alt="Upload Button" id="uploadedBtnImg" class="uploadedBtnImg" src="//img.zohostatic.eu/campaigns/static4/images/spacer.gif" style="width: 300px; height: 158px; cursor: pointer" onclick="zc_loadForm('','https://zcv4-zcmp.maillist-manage.eu/ua/Optin?od=12ba7e9ab66e&amp;zx=14acf3d40e&amp;tD=11e16659e05b4979&amp;sD=11e16659e05b9afe')"></a> <div id="logoCustomizeDiv" class="mt5 ml10" style="font-weight: normal;"> <a for="" class="linktxt" name="uploadFromLib" purpose="uploadBtnImg" id="uploadBtnImage" href="https://zcv4-zcmp.maillist-manage.eu/ua/Optin?od=12ba7e9ab66e&amp;zx=14acf3d40e&amp;tD=11e16659e05b4979&amp;sD=11e16659e05b9afe" onclick="showSignupFormImagesLib(this);" onmouseover="$(this).css('text-decoration','underline')" onmouseout="$(this).css('text-decoration','none')" style="text-decoration: none;" target="_blank"> Change</a> <span class="lightgray">|</span><a href="https://zcv4-zcmp.maillist-manage.eu/ua/Optin?od=12ba7e9ab66e&amp;zx=14acf3d40e&amp;tD=11e16659e05b4979&amp;sD=11e16659e05b9afe" class="linktxt" id="delSignTmLogo" onclick="removeEmbedBtnImage(this);" target="_blank"> Delete</a></div></div> <input type='hidden' id='zc_Url' value='zcv4-zcmp.maillist-manage.eu'/> <input type='hidden' id='zc_formIx' name='zc_formIx' value='3zd6f779c7a1706e17021c678d981fa162a227d2452b57a8eeb019c9d2663a2d5b' > <input type='hidden' id='cmpZuid' name='zx' value='undefined' > <input type='hidden' id='viewFrom' name='viewFrom' value='BUTTON_ACTION' /> <input type='hidden' id='button_tc_codeVal' name='button_tc_codeVal' value='ZCFORMVIEW' /> <script type='text/javascript' src='https://zcv4-zcmp.maillist-manage.eu/js/optin_min.js'></script> <script> var trackingText='ZCFORMVIEW'; var $ZC = jQuery.noConflict(); $ZC('[id=embedLink]').append("<input type='hidden' id='tc_code"+$ZC('[id=embedLink]').size()+"' value="+trackingText+">"); var elemSize = parseInt($ZC('[id=embedLink]').size())-1; var embedLink = $ZC($ZC('[id=embedLink]')[elemSize]).attr('href'); if(embedLink!=undefined && embedLink!=null && embedLink!='null'){ var dynamicCodeVal = $ZC("#tc_code"+$ZC('[id=embedLink]').size()).val(); embedLink = embedLink+'&trackingcode='+dynamicCodeVal; $ZC($ZC('[id=embedLink]')[elemSize]).attr('href',embedLink); $ZC('[id=button_tc_codeVal]').val(dynamicCodeVal); trackSignupEvent(dynamicCodeVal,'buttonView'); } </script> <!-- Zoho Campaigns Embed Button End -->                `,
                  }}
                ></div>
              </Col>
            </Row>
            <hr style={{ borderColor: "#66615b" }} />
            <Row>
              <Col lg={7} sm={12} className="text-center text-lg-left">
                © {new Date().getFullYear()} Independent Learning Platform ASBL
              </Col>
              <Col className="links text-center text-lg-right" lg={5} sm={12}>
                <ul>
                  <li className="px-2">
                    <a href="/privacy/">{data["privacy"]}</a>
                  </li>
                  <li className="pr-0">|</li>
                  <li className="px-2">
                    <a href="/terms/">{data["terms"]}</a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
