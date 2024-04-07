export const inviteFriendToGroup = async (friendName) => {
    console.log(friendName);
}

export const removeMemberFromGroup = async (memberName) => {
    console.log(memberName);
}

export const promoteMemberInGroup = async (memberName) => {
    console.log(memberName);
}

export const demoteMemberInGroup = async (memberName) => {
    console.log(memberName);
}

export const acceptGroupRequest = async (groupname) => {
    let response = await fetch("/api/groups/acceptinvite?groupName=" + groupname,{
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwtToken').replace(/"/g, ''),
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

export const declineGroupRequest = async (groupname) => {
    let response = await fetch("/api/groups/declinetinvite?groupName=" + groupname,{
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwtToken').replace(/"/g, ''),
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