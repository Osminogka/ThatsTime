const friendListOnServer = [
    'John',
    'Jane',
    'Michael',
    'Emily',
    'William',
    'Sophia',
    'James',
    'Olivia',
    'Benjamin',
    'Isabella',
    'Matthew',
    'Ava',
    'Jacob',
    'Mia',
    'Ethan',
    'Charlotte',
    'Daniel',
    'Amelia',
    'Alexander',
    'Harper',
    'Henry',
    'Ella',
    'Joseph',
    'Abigail',
    'Samuel'
];

export const getFriendList = async (page) => {
    const pageSize = 5;
    const start = (page) * pageSize || 0;
    const end = start + pageSize;
    return friendListOnServer.slice(start, end);
  }

export const getFriendByNickname = async (nickname) => {
    return friendListOnServer.find(friend => friend === nickname);
}

export const sendFriendRequest = async () => {
    
}

export const sendGroupInvite = async () => {
    
}