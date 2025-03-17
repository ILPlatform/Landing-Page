const Loader = ({ small = false }) => (
  <>
    <div className={`w-100 text-center ${!small && "my-5 py-5"}`}>
      <img
        src={require("../assets/img/photo_swipe/preloader.gif").default}
        alt="ILPlatform Loader"
        height="40px"
      />
    </div>
  </>
);

export default Loader;
