import Header from "./header/Header"
import { styled } from "@mui/system"
import RightSidebar from "./right-sidebar/RightSidebar"
import ServerSidebar from "./server-sidebar-huyen/ServerSidebar"
import { Outlet } from "react-router"
import { Button, Box } from "@mui/material"
import avatar from './../../assets/avatar.jpg';
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectAllFriends } from "../../redux-slices/friendsSlice"
import { query, collection, where, getDocs } from "@firebase/firestore"
import { userInfo } from "os"
import { db } from "../../firebase/firebase"

// import { useContext } from "react"
// import { WidthContext } from "../../App"


const FHBox = styled(Box)({
  height: '100%',
})

// PLACEHOLDER
const users = [
  {
    id: "ccQSDCokFidwwksLeQloPwXDazE3",
    name: "Hieu Bui",
  },
  {
    id: "JbejhxQt4iTJWUep4G0OjMJvUdo2",
    name: "Huyen Dang",
  },
  { 
    id: "rG2C6fxQRfNx0Rj4SppuhAr0cWm2",
    name: "pikachu",
    photoUrl: avatar,
  },
  {
    id: "F4YOkYdVNtTrcmEhkD7IWyPouAg1",
    name: "a Doanh",
    // photoUrl: avatar,
  }
]

const MainLayout = () => {
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

  return (
    <FHBox>
      <FHBox 
        display={{ xs: 'none', md: 'block' }}
        width="240px"
        position="fixed"
      >
        <ServerSidebar users={users}/>
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