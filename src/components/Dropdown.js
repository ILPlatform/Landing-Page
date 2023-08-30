import { useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { v4 } from "uuid";
import "./Dropdown.css";

const Dropdown = ({ question, answer }) => {
  const [active, setActive] = useState(false);
  const contentRef = useRef();

  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight}px`
      : "0px";
  }, [contentRef, active]);

  return (
    <div className="my-3">
      <button className={`question-section ${active} w-100 cursor-pointer`}>
        <div>
          <div className="question-align" onClick={() => setActive(!active)}>
            <h3 className="question-style h5 my-3 ml-3">
              <b>
                {question}
              </b>
            </h3>
            <FiPlus
              className={active ? `question-icon rotate` : `question-icon`}
            />
          </div>
          <div
            ref={contentRef}
            className={active ? `answer answer-divider` : `answer`}
          >
            <p className="m-0 p-3">
              {answer}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Dropdown;
