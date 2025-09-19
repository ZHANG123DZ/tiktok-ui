//Ở đây chỉ định tên các route

const config = {
  routes: {
    home: '/',
    explore: '/explore',
    following: '/following',
    friends: '/friends',
    upload: '/upload',
    active: '/active',
    message: '/messages',
    live: '/live',
    login: '/login',
    register: '/register',
    search: '/search',
    tag: '/tag/:name',
    music: '/music/:name',
    videoDetail: '/:username/video/:id',
    profile: '/:username',
    notFound: '*',
  },
};

export default config;
