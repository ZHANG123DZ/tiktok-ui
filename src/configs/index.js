//Ở đây chỉ định tên các route

const config = {
  routes: {
    home: '/',
    explore: '/explore',
    following: '/following',
    friends: '/friends',
    upload: '/upload',
    active: '/active',
    message: '/message',
    live: '/live',
    login: '/login',
    register: '/register',
    search: '/search',
    profile: '/@:username',
    notFound: '*',
  },
};

export default config;
