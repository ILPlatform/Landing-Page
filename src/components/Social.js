import { Button } from 'reactstrap';

const Social = ({spacedOut=true}) => (
  <>
    <a
      href="https://www.facebook.com/ILPlatform"
      target="_blank"
      rel="nofollow noreferrer noopener"
      className={spacedOut ? "mx-3" : "mx-1"}
    >
      <Button className="btn-just-icon" color="facebook">
        <i className="fa fa-facebook" />
      </Button>
    </a>

    <a
      href="https://www.instagram.com/ilplatform/"
      target="_blank"
      rel="nofollow noreferrer noopener"
      className={spacedOut ? "mx-3" : "mx-1"}
    >
      <Button className="btn-just-icon" color="instagram">
        <i className="fa fa-instagram" />
      </Button>
    </a>

    <a
      href="https://www.linkedin.com/company/ilplatform"
      target="_blank"
      rel="nofollow noreferrer noopener"
      className={spacedOut ? "mx-3" : "mx-1"}
    >
      <Button className="btn-just-icon" color="linkedin">
        <i className="fa fa-linkedin" />
      </Button>
    </a>
  
    <a
      href="https://www.youtube.com/channel/UCZ_NOI8UurM6BWUcS3aLJxw"
      target="_blank"
      rel="nofollow noreferrer noopener"
      className={spacedOut ? "mx-3" : "mx-1"}
    >
      <Button className="btn-just-icon" color="linkedin">
        <i className="fa fa-youtube" />
      </Button>
    </a>
  </>
);

export default Social;
