import { Button } from 'reactstrap';

const Social = () => (
  <>
    <a
      href="https://www.facebook.com/ILPlatform"
      target="_blank"
      rel="noreferrer"
      className="mx-3"
    >
      <Button className="btn-just-icon" color="facebook">
        <i className="fa fa-facebook" />
      </Button>
    </a>

    <a
      href="https://www.instagram.com/ilplatform/"
      target="_blank"
      rel="noreferrer"
      className="mx-3"
    >
      <Button className="btn-just-icon" color="instagram">
        <i className="fa fa-instagram" />
      </Button>
    </a>
  </>
);

export default Social;
