import React, { useState, useEffect, useRef } from "react";
import { RepleContentDiv, RepleUploadDiv } from "../../Style/RepleCSS.js";
import { useSelector } from "react-redux";
import axios from "axios";
function RepleContent(props) {
  const [ModalFlag, setModalFlag] = useState(false);
  const [EdifFlag, setEdifFlag] = useState(false);
  const [Reple, setReple] = useState(props.reple.reple);
  const ref = useRef();
  const user = useSelector((state) => state.user);
  useOnClickOutside(ref, () => setModalFlag(false));
  const SubmitHandler = (e) => {
    e.preventDefault();
    let body = {
      uid: user.uid,
      reple: Reple,
      postId: props.reple.postId,
      repleId: props.reple._id,
    };

    axios.post("/api/reple/edit", body).then((response) => {
      if (response.data.success) {
        alert("You successfully edited the comment.");
      } else {
        alert("You failed to edit the comment.");
      }
      return window.location.reload();
    });
  };

  const DeleteHandler = (e) => {
    e.preventDefault();
    if (window.confirm("Do you really want to delete this comment?")) {
      let body = {
        repleId: props.reple._id,
        postId: props.reple.postId,
      };
      axios
        .post("/api/reple/delete", body)
        .then((response) => {
          if (response.data.success) {
            alert("Comment deleted.");
            window.location.reload();
          }
        })
        .catch((err) => {
          alert("Comment deletion failed");
        });
    }
  };
  return (
    <div>
      <RepleContentDiv>
        <div className="author">
          <p>{props.reple.author.displayName}</p>
          {props.reple.author.uid === user.uid && (
            <div className="modalControl">
              <span onClick={() => setModalFlag(true)}>...</span>
              {ModalFlag && (
                <div className="modalDiv" ref={ref}>
                  <p
                    onClick={() => {
                      setEdifFlag(true);
                      setModalFlag(false);
                    }}
                  >
                    Edit
                  </p>
                  <p className="delete" onClick={(e) => DeleteHandler(e)}>
                    Delete
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        {EdifFlag ? (
          <RepleUploadDiv>
            <form>
              <input
                type="text"
                value={Reple}
                onChange={(e) => {
                  setReple(e.currentTarget.value);
                }}
              />
              <button
                onClick={(e) => {
                  SubmitHandler(e);
                }}
              >
                Submit
              </button>
            </form>
            <div className="cancel">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setEdifFlag(false);
                }}
              >
                Cancel
              </button>
            </div>
          </RepleUploadDiv>
        ) : (
          <p>{props.reple.reple}</p>
        )}
      </RepleContentDiv>
    </div>
  );
}
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default RepleContent;
