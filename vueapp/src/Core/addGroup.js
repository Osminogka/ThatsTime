import { groupList } from '../core/userInfo';

const groups = [
    "Theta-3",
    "Kappa-9",
    "Omega-5",
    "Alpha-8",
    "Sigma-5",
    "Beta-6",
    "Gamma-10",
    "Zeta-5",
    "Omega-2",
    "Beta-9",
    "Sigma-9",
    "Delta-5",
    "Zeta-1",
    "Kappa-7",
    "Zeta-4",
    "Kappa-9",
    "Beta-4",
    "Delta-9",
    "Theta-4",
    "Kappa-4",
    "Gamma-8",
    "Delta-6",
    "Kappa-1",
    "Alpha-10",
    "Alpha-1"
];

export const getGroupList = async (page) => {
    const pageSize = 5;
    const start = (page) * pageSize || 0;
    const end = start + pageSize;
    return groups.slice(start, end);
}

export const getGroupByName = async (name) => {
    return groups.find(group => group === name);
}

export const sendGroupInvite = async () => {

}

export const createGroup = async (name) => {
    groupList.value.push({ name: name});
    return true;
}

export const sendInviteToFriend = async (friend, group) => {
    return { friend, group};
}