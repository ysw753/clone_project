import { useRef, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { postsAdd } from "../redux/modules/postsSlice";
import AuthContext from "../api/context/AuthProvider";
import { apis } from "../api/axios";
import { addUserPosts } from "../redux/modules/userSlice";

const AddModal = ({ closeModal }) => {
  // auth를 봐보자
  const auth = useContext(AuthContext);
  const accessToken = localStorage.getItem("accessToken");
  const [imgFile, setImgFile] = useState();
  const imgRef = useRef();
  const [attachment, setAttachment] = useState();
  const contentRef = useRef();
  const dispatch = useDispatch();
  const onFileChange = (event) => {
    setImgFile(event.target.files[0]);
  };

  const uploadPost = async () => {
    const formData = new FormData();
    formData.append("content", contentRef.current.value);
    formData.append("articleImage", imgFile);
    try {
      //const newPost = { content: content, imagefile: attachment };
      // const newPost = {
      //   content: content,
      //   // imageUrl:
      //   //   "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg",
      // };
      const res = await apis.upload(formData, accessToken);
      console.log(res);
      // dispatch(postsAdd(newPost));
      // dispatch(addUserPosts(newPost));
      console.log("success");
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Backdrop onClick={() => closeModal()} />
      <Modal>
        <Box>
          <div>새 게시물 만들기</div>
          <>
            <div>
              <img src={attachment} width="100px" height="100px" />
            </div>
            <input ref={contentRef} placeholder="내용을 입력해 주세요!" />
          </>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => onFileChange(e)}
            encType="multipart/form-data"
            ref={imgRef}
          />
          <button onClick={uploadPost}>올리기</button>
        </Box>
      </Modal>
    </>
  );
};
export default AddModal;
const Box = styled.div`
  padding: 20px;
  padding-top: 50px;
  svg {
    height: 400px;
  }
  button {
    margin-top: 50px;
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
  text-align: center;
  background-color: white;
  z-index: 100;
  min-width: 40vw;
  min-height: 80vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 25px;
`;
