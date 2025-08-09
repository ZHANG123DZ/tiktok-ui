import UserInfo from '../UserInfo';

function UserList() {
  const userList = [
    {
      username: 'iran.vs.israel5',
      name: 'Iran vs Israel',
      avatar:
        'https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/9f5c854ecbc479b31b46cc8ed8c08f6b~tplv-tiktokx-cropcenter:100:100.jpeg?biz_tag=tiktok_user.user_cover&dr=14579&idc=my&ps=13740610&refresh_token=0cd9ad74&shcp=c1333099&shp=30310797&t=4d5b0474&x-expires=1754640000&x-signature=VjbvuyUVDDRb%2BJobsKLCRO%2BB7eQ%3D',
      followers: 7607,
    },
    {
      username: 'gaixinhkorea',
      name: 'gaixinhkorea',
      avatar:
        'https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/7333735162238205960~tplv-tiktokx-cropcenter:100:100.jpeg?biz_tag=tiktok_user.user_cover&dr=14579&idc=my&ps=13740610&refresh_token=0ec421e6&shcp=c1333099&shp=30310797&t=4d5b0474&x-expires=1754643600&x-signature=%2BZ6s6IInNaTOuB2eg9thzy4tozI%3D',
      followers: '53.2K',
    },
    {
      username: 'a3a3apzqayd',
      name: 'Gái xinh',
      avatar:
        'https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/e680f21b542ea8f2f7b580717903c292~tplv-tiktokx-cropcenter:100:100.jpeg?biz_tag=tiktok_user.user_cover&dr=14579&idc=my&ps=13740610&refresh_token=cdfa7780&shcp=c1333099&shp=30310797&t=4d5b0474&x-expires=1754643600&x-signature=nrwL5UTmEx5QeaD2irn9fr716es%3D',
      followers: 7607,
    },
  ];
  return (
    <div>
      {userList.map((user) => (
        <div key={user.username}>
          <UserInfo user={user} />
        </div>
      ))}
    </div>
  );
}

export default UserList;
