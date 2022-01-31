import { Button } from 'reactstrap';

const Social = () => (
  <>
    <a
      href="https://www.facebook.com/ILPlatform"
      target="_blank"
      rel="nofollow noreferrer noopener"
      className="mx-3"
    >
      <Button className="btn-just-icon" color="facebook">
        <i className="fa fa-facebook" />
      </Button>
    </a>

    <a
      href="https://www.instagram.com/ilplatform/"
      target="_blank"
      rel="nofollow noreferrer noopener"
      className="mx-3"
    >
      <Button className="btn-just-icon" color="instagram">
        <i className="fa fa-instagram" />
      </Button>
    </a>

    <a
      href="https://www.linkedin.com/company/ilplatform"
      target="_blank"
      rel="nofollow noreferrer noopener"
      className="mx-3"
    >
      <Button className="btn-just-icon" color="linkedin">
        <i className="fa fa-linkedin" />
      </Button>
    </a>
  </>
);

export default Social;
