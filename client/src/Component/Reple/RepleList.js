import React, { useEffect, useState } from "react";
import axios from "axios";

function RepleList(props) {
  const [repleList, setrepleList] = useState([]);

  useEffect(() => {
    let body = {
      postId: props.postId,
    };
    axios.post("/api/reple/getReple", body).then((response) => {
      if (response.data.success) {
        setrepleList([...response.data.repleList]);
      }
    });
  }, []);

  return (
    <div>
      {repleList.map((reple, idx) => {
        return <div key={idx}>{reple.reple}</div>;
      })}
    </div>
  );
}

export default RepleList;
