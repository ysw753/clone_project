import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../components/Header";
import InfiniteScroll from "react-infinite-scroll-component";
import { apis } from "../api/axios";
import AuthContext from "../contextStore/auth-context";

const MyPosts = () => {
  //토큰을 얻어요
  const username = localStorage.getItem("user");
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  // bring username
  const { userId } = useParams();
  console.log(userId);

  // fetch articles that user posted
  const fetchUsersPosts = async () => {
    const res = await apis.loadUsersPosts(username, accessToken);
    console.log(res);
  };

  useEffect(() => {
    fetchUsersPosts();
  }, []);

  const posts = useSelector((state) => state.myposts.list);
  console.log(posts);

  const [items, setItems] = useState([...posts.slice(0, 9)]);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreItems = () => {
    if (items.length >= posts.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems((prev) => [
        ...prev,
        ...posts.slice(prev.length, prev.length + 9),
      ]);
    }, 1500);
  };

  return (
    <div>
      <Header myprofile={true} />

      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreItems}
        hasMore={hasMore}
        loader={<h4 style={ScrollStyle}>Loading...</h4>}
        endMessage={
          <p style={ScrollStyle}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Outter>
          {items?.map((item) => (
            <Box key={item?.id} onClick={() => {}}>
              <img src={`${item.imageUrl}`} alt={item?.id} />
            </Box>
          ))}
        </Outter>
      </InfiniteScroll>
    </div>
  );
};

export default MyPosts;

const Outter = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  width: 50%;
  min-width: 950px;
  margin: auto;
  background-color: white;
`;

const Box = styled.div`
  width: 300px;
  height: 300px;
  margin: 10px;
  background-color: white;
  img {
    object-fit: cover;
    background-size: cover;
    width: 300px;
    height: 300px;
  }
`;

const ScrollStyle = {
  textAlign: "center",
};
