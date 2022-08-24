import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "../api/axios";
import DetailModal from "../components/DetailModal";
import Header from "../components/Header";
import AuthContext from "../contextStore/auth-context";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { postsload } from "../redux/modules/postsSlice";
const size = 9;
const imageUrl =
  "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg";

const Main = () => {
  const [lastArticleId, setLastArticleId] = useState(9999);

  const [isActiveModal, setIsActiveModal] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const [items, setItems] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `/api/articles?articleId=${lastArticleId}&size=${size}`
      );
      if (response?.data?.result?.length < size) {
        setHasMore(false);
      }

      const fetchedPosts = response?.data?.result;
      console.log(fetchedPosts);
      //dispatch(postsload(fetchedPosts));
      setItems(fetchedPosts);
      console.log(items);
      setLastArticleId(
        response?.data?.result[response?.data?.result.length - 1].id
      );
    } catch (err) {
      console.error(err);
    }
  };

  console.log(hasMore);

  useEffect(() => {
    // fetch all posts
    fetchPosts();
  }, []);

  const [item, setItem] = useState();
  const activeModal = (clickitem) => {
    setIsActiveModal(true);
    setItem(clickitem);
  };
  const closeModal = () => {
    setIsActiveModal(false);
  };

  return (
    <>
      <Header Loggedin={!!authCtx.user} />
      {isActiveModal && <DetailModal closeModal={closeModal} item={item} />}
      <InfiniteScroll
        dataLength={items?.length}
        next={fetchPosts}
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
            <Box key={item?.id} onClick={() => activeModal(item)}>
              <img src={`${imageUrl}`} alt={item?.id} />
            </Box>
          ))}
        </Outter>
      </InfiniteScroll>
    </>
  );
};
export default Main;

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
