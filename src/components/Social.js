import { Button } from 'reactstrap';

const Social = ({spacedOut=true}) => (
  <>
    <a
      href="https://www.facebook.com/ILPlatform"
      target="_blank"
      rel="nofollow noreferrer noopener"
      className={spacedOut ? "mx-3" : "mx-1"}
      aria-label="Facebook"
    >
      <Button className="btn-just-icon" color="facebook" aria-label="Facebook">
        <i className="fa fa-facebook" />
      </Button>
    </a>

    <a
      href="https://www.instagram.com/ilplatform/"
      target="_blank"
      rel="nofollow noreferrer noopener"
      className={spacedOut ? "mx-3" : "mx-1"}
      aria-label="Instagram"
    >
      <Button className="btn-just-icon" color="instagram" aria-label="Instagram">
        <i className="fa fa-instagram" />
      </Button>
    </a>

    <a
      href="https://www.linkedin.com/company/ilplatform"
      target="_blank"
      rel="nofollow noreferrer noopener"
      className={spacedOut ? "mx-3" : "mx-1"}
      aria-label="LinkedIn"
    >
      <Button className="btn-just-icon" color="linkedin" aria-label="LinkedIn">
        <i className="fa fa-linkedin" />
      </Button>
    </a>
  
    <a
      href="https://www.youtube.com/channel/UCZ_NOI8UurM6BWUcS3aLJxw"
      target="_blank"
      rel="nofollow noreferrer noopener"
      className={spacedOut ? "mx-3" : "mx-1"}
      aria-label="YouTube"
    >
      <Button className="btn-just-icon" color="linkedin" aria-label="YouTube">
        <i className="fa fa-youtube" />
      </Button>
    </a>
  </>
);

export default Social;
