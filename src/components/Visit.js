import useData from "../data";

const Visit = () => {
  const data = useData()?.contact;

  return (
    <>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d629.7678805828067!2d4.368701331884444!3d50.848359811358016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c36355af9639%3A0xbd0b793d77cf1382!2sILPlatform!5e0!3m2!1sen!2sbe!4v1659700037209!5m2!1sen!2sbe"
        width={"100%"}
        height="320"
        style={{ border: 0, borderRadius: "12px" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="mt-2 text-left">
        <p>
          <b style={{ fontWeight: "800" }}>{data?.legal}:</b> Bd du Régent 54A,
          1000 Bruxelles
        </p>
        <p>
          <b style={{ fontWeight: "800" }}>{data?.bce}:</b> 0765.693.353
        </p>
      </div>
    </>
  );
};

export default Visit;
