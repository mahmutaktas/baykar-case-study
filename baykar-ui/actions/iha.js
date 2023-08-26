import { API_URL } from "@/config";
import { getAccessToken } from "@/helpers/token";

export const getIHAList = async (limit, offset, ordering, filters) => {
    let accessToken = getAccessToken();
    if (!accessToken) {
        return { status: 401 };
    }

    accessToken = `Bearer ${accessToken}`;

    const res = await fetch(
        `${API_URL}api/iha/iha/?offset=${offset}&limit=${limit}&ordering=${ordering}${filters}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: accessToken },
        }
    );
    return res;
};

export const createIHA = async (ihaData) => {
    let accessToken = getAccessToken();
    if (!accessToken) {
        return { status: 401 };
    }

    accessToken = `Bearer ${accessToken}`;

    const res = await fetch(`${API_URL}api/iha/iha/`, {
        method: "POST",
        body: JSON.stringify(ihaData),
        headers: { "Content-Type": "application/json", Authorization: accessToken },
    });
    return res;
};

export const updateIHA = async (ihaId, ihaData) => {
    let accessToken = getAccessToken();
    if (!accessToken) {
        return { status: 401 };
    }

    accessToken = `Bearer ${accessToken}`;

    const res = await fetch(`${API_URL}api/iha/iha/${ihaId}/`, {
        method: "PUT",
        body: JSON.stringify(ihaData),
        headers: { "Content-Type": "application/json", Authorization: accessToken },
    });
    return res;
};

export const deleteIHA = async (ihaId) => {
    let accessToken = getAccessToken();
    if (!accessToken) {
        return { status: 401 };
    }

    accessToken = `Bearer ${accessToken}`;

    const res = await fetch(`${API_URL}api/iha/iha/${ihaId}/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: accessToken },
    });
    return res;
};
