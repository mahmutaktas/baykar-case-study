export const getAccessToken = () => {
    let accessToken = localStorage.getItem("accessToken");
    return accessToken;
};
