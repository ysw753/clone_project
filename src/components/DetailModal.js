import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { apis } from "../api/axios";
import AuthContext from "../contextStore/auth-context";

const DetailModal = ({ closeModal, item }) => {
  const postId = item.id;
  const authCtx = useContext(AuthContext);

  const accessToken = authCtx.accessToken;
  const [specificItem, setSpecificItem] = useState([]);

  //게시글 로딩중
  const [commentLoading, setCommentLoading] = useState(false);

  //일치하는 유저만 삭제할수있다.
  const fetchUser = () => {};

  const [isme, setIsme] = useState(true);

  //리플작성 state
  const [isOpenReply, setIsOpenReply] = useState(false);

  //리플 input state
  const [isOpenReplyInput, setIsOpenReplyInput] = useState(null);

  //댓글을 바로바로 보여주기 위해 댓글추가후 서버에 저장시킨걸 가져오는게 아니라
  //state에 저장해서 바로 보여준다.

  const [comments, setCommnets] = useState([]);

  //대댓글을 바로바로 보여주기 위해 대댓글추가 후  서버에 저장시킨걸 가져오는게 아니라
  //state에 저장해서 바로 보여준다.
  const [replys, setReplys] = useState([]);

  //특정 게시글을 조회한다.
  const inputRef = useRef();

  //리플 replyRef
  const replyRef = useRef();

  const fetchSpecificPost = async (postId) => {
    const res = await apis.specificPostLoad(postId);
    setSpecificItem(res.data.result);
  };

  const fetchComment = async (postId) => {
    try {
      const res = await apis.loadComment(postId);
      console.log(res);
      setCommnets(res.data.result);
      setCommentLoading(true);
    } catch (error) {
      console.log("로드실패");
    }
  };
  const fetchReply = async (commentId) => {
    const res = await apis.loadReply(postId, commentId);
    return res;
  };

  //댓글달기
  const writeComment = async () => {
    setCommentLoading(() => false);
    const comment = inputRef.current.value;
    let today = new Date();
    const obj = { content: comment };
    const res = await apis.createComment(accessToken, postId, obj);
    console.log(res);
    setCommnets((prev) => [...prev, comment]);
    setCommentLoading(() => true);
    console.log(comments);
  };

  //댓글삭제
  const deleteComment = async (commentId) => {
    console.log(commentId);
    const res = await apis.deleteComment(accessToken, postId, commentId);
    const newCommentsArr = comments.filter((i) => i.id !== commentId);
    setCommnets(newCommentsArr);
  };
  const showInput = (commentId) => {
    setIsOpenReplyInput(commentId);
  };

  //대댓글달기
  const replies = async (commentId) => {
    const replycomment = replyRef?.current?.value;
    console.log(replycomment);
    const obj = { content: replycomment };
    const res = await apis.createReply(accessToken, postId, commentId, obj);
    setReplys((prev) => [...prev, replycomment]);
    setIsOpenReplyInput(null);
  };

  //대댓글 보여주기
  const showReply = async (commentId) => {
    // 답글을 보여준다.
    setIsOpenReply((prev) => (prev === null ? commentId : null));
    const reply = await fetchReply(commentId);
    setReplys(reply.data.result);
  };

  useEffect(() => {
    fetchComment(postId);
    fetchSpecificPost(postId);
  }, []);

  return (
    <>
      <Backdrop onClick={() => closeModal()} />
      <Modal>
        <Image>
          <img
            src={
              "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg"
            }
          ></img>
        </Image>
        <Comment>
          <CommentHeader>{+"님의 게시물"}</CommentHeader>
          <CommentContext>
            <FlexBox>
              <h4>{specificItem.content}</h4>
            </FlexBox>
            {!commentLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                {comments?.map((i) => {
                  return (
                    <div key={i.id}>
                      <h5>
                        {i.content}
                        <p>{i.createdAt}</p>
                      </h5>
                      {isme && (
                        <button onClick={() => deleteComment(i.id)}>
                          삭제
                        </button>
                      )}
                      <button onClick={() => showInput(i.id)}>답글 달기</button>
                      <button onClick={() => showReply(i.id)}>답글 보기</button>
                      {isOpenReply === i.id
                        ? replys.map((i) => <Reply>{i.content}</Reply>)
                        : null}
                      {isOpenReplyInput === i.id ? (
                        <>
                          <input ref={replyRef} />
                          <button onClick={() => replies(i.id)}>달기</button>
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </>
            )}
          </CommentContext>
          <CommentIcon />
          <CommentInput>
            <input ref={inputRef} />
            <button onClick={writeComment}>게시</button>
          </CommentInput>
        </Comment>
      </Modal>
    </>
  );
};
export default DetailModal;
const Reply = styled.p`
  font-size: 14px;
  padding-left: 10px;
`;

const Comment = styled.div`
  background-color: white;
  button {
    border: none;
    background-color: white;
    color: #0984e3;
    font-size: 16px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const CommentHeader = styled.div`
  height: 50px;
  border-bottom: 1px solid black;
`;
const CommentContext = styled.div`
  height: 580px;
  overflow: scroll;
  border-bottom: 1px solid black;
`;
const FlexBox = styled.div`
  display: flex;
  justify-content: start;
  position: relative;
  h4 {
    width: 100px;
  }
  h5 {
    width: 100%;
    h5 {
      position: absolute;
      right: 120px;
    }
  }
`;

const CommentIcon = styled.div`
  height: 100px;
  border-bottom: 1px solid black;
`;
const CommentInput = styled.div`
  border: none;
  background-color: white;
  height: 50px;
  width: 80%;
`;

const Image = styled.div`
  background-color: black;
  padding-top: 30px;
  padding-bottom: 30px;
  div {
    width: 100%;
    height: 100%;
    background-color: white;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const Backdrop = styled.div`
  margin: auto;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  margin-top: 10px;
`;
const Modal = styled.div`
  background-color: white;
  z-index: 100;

  min-width: 70vw;
  min-height: 70vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 25px;

  display: grid;
  grid-template-columns: 2fr 1fr;
`;
