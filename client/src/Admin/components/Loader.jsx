import "../style/Loader.css";

export default function Loader() {
  return (
    <>
      <div className="container d-flex justify-content-center align-content-center">
        <div className="loader">
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
        </div>
      </div>
    </>
  );
}
