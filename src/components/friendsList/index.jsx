import React, { useEffect, useState } from "react";
import { ArrowBack } from "@material-ui/icons";
import { baseUrl } from "../../api/baseUrls";
import Loader from "../../common/components/loader";
import ListItem from "./listItem";

const FriendsList = ({ type, userId, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        if (!type) return;
        const path = "get-" + type.toLowerCase();
        setIsLoading(true);
        const { data } = await baseUrl.get("/users/" + path, {
          params: { userId },
        });
        if (data?.response) setUsersList(data?.response);
      } catch (err) {
        setUsersList([]);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [type, userId]);
  if (isLoading) return <Loader />;
  return (
    <div className="h-full">
      <div className="flex justify-between md:mt-10 mt-5 md:mb-2 mb-3 mx-4">
        <button onClick={() => onClose(null)}>
          <ArrowBack />
        </button>
        <div className="text-center font-bold text-xl capitalize">
          {type?.toLowerCase()}
        </div>
      </div>
      {usersList.map((data) => (
        <ListItem key={data?._id} data={data} />
      ))}
    </div>
  );
};

export default FriendsList;
