import Header from "./header/Header"
import { styled } from "@mui/system"
import RightSidebar from "./right-sidebar/RightSidebar"
import ServerSidebar from "./server-sidebar-huyen/ServerSidebar"
import { Outlet } from "react-router"
import { Button, Box, TextField, DialogActions } from "@mui/material"
import avatar from './../../assets/avatar.jpg';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectAllFriends } from "../../redux-slices/friendsSlice"
import { query, collection, where, getDocs } from "@firebase/firestore"
import { userInfo } from "os"
import { auth, db } from "../../firebase/firebase"
import FormDialog from "../../components/FormDialog"
import { useAuthState } from "react-firebase-hooks/auth"
import { getUserDocument, selectCurrentUser } from "../../redux-slices/currentUserSlice"

// import { useContext } from "react"
// import { WidthContext } from "../../App"


const FHBox = styled(Box)({
  height: '100%',
})

// PLACEHOLDER
const users = [
  {
    username: "ccQSDCokFidwwksLeQloPwXDazE3",
    displayName: "Hieu Bui",
  },
  {
    username: "huyen",
    displayName: "Huyen Dang",
  },
  {
    username: "tumau135",
    displayName: "BESTOFMAU",
    photoUrl: avatar,
  },
  {
    username: "F4YOkYdVNtTrcmEhkD7IWyPouAg1",
    displayName: "a Doanh",
    // photoUrl: avatar,
  }
]

const MainLayout = () => {
  const [user] = useAuthState(auth);
  const [usernameModalOpen, setUsernameModalOpen] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  // const friendList = useSelector(selectAllFriends);
  // const [friendInfoList, setFriendInfoList] = useState([]);

  // useEffect(() => {
  //   const fetchFriendInfo = async () => {
  //     const infoList = [];
  //     for (const friendEmail of friendList) {
  //       const userQuery = query(collection(db, 'users'), where('email', '==', friendEmail));
  //       const querySnapshot = await getDocs(userQuery);
  //       if (!querySnapshot.empty) {
  //         const userInfo = querySnapshot.docs[0].data();
  //         infoList.push(userInfo);
  //       }
  //       infoList.push(userInfo);
  //     }
  //     setFriendInfoList(infoList as any);
  //   }
  //   if (friendList.length > 0) {
  //     fetchFriendInfo();
  //   }
  // }, [friendList])

  // useEffect(() => {
  //   if (user) {
  //     dispatch(getUserDocument(user) as any);
  //     if (currentUser.username === null) {
  //       setUsernameModalOpen(true);
  //     }
  //   }
  // });

  // const handleClose = () => {
  //   setUsernameModalOpen((prev) => !prev);
  // }

  return (
    <FHBox>
      {/* Prompt for username if not set yet (for users signed up with Google) */}
      {/* <Button onClick={handleClose}>CLOSE</Button> */}
      <FormDialog />
      <FHBox
        display={{ xs: 'none', md: 'block' }}
        width="240px"
        position="fixed"
      >
        <ServerSidebar users={users} />
      </FHBox>

      <FHBox
        paddingLeft={{ md: "240px" }}
        display="flex"
        flexDirection="column"
      >
        {/* Header */}
        <Box>
          <Header />
        </Box>
        {/* Main + Right Sidebar */}
        <FHBox display="flex">
          <FHBox flexGrow={1}>
            <Outlet />
          </FHBox>
          <FHBox width="340px">
            <RightSidebar />
          </FHBox>
        </FHBox>

      </FHBox>
    </FHBox>
  )
}

export default MainLayout