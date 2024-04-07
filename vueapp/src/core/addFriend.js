const friendListOnServer = [];

export const getFriendList = async (page) => {
    let response = await fetch("/api/friends/getusers?page="+page,{
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken').replace(/"/g, ''),
            'Content-Type': 'application/json'
        }
    });
    if(response.ok){
        let responseData = await response.json();
        return responseData;
    }
    else
        return {success: false, message: 'Server error'};
  }

export const getFriendByNickname = async (nickname) => {
    return friendListOnServer.find(friend => friend === nickname);
}

export const sendFriendRequest = async (username) => {
    let response = await fetch("/api/friends/sendinvite?friendname=" + username,{
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken').replace(/"/g, ''),
            'Content-Type': 'application/json'
        }
    });
    if(response.ok){
        let responseData = await response.json();
        return responseData;
    }
    else
        return {success: false, message: 'Server error'};
}

export const sendGroupInvite = async () => {
    
}