export const inviteFriendToGroup = async (friendName, groupName) => {
    let searchParams = new URLSearchParams({
        friendName, groupName
    });
    let response = await fetch(`/api/groups/sendinvite?${searchParams}`,{
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwtToken').replace(/"/g, ''),
                    'Content-Type': 'application/json'
    }
    });
    if(response.ok)
    {
        let responseData = await response.json();
        return responseData;
    }
    else
        return {success: false, message: 'Server error'};
}

export const removeMemberFromGroup = async (groupName, friendName) => {
    let searchParams = new URLSearchParams({
        groupName, friendName
    });
    let response = await fetch(`/api/groups/remove?${searchParams}`,{
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