import { API_URL } from "@/config";
import { getAccessToken } from "@/helpers/token";

export const rentIHA = async (rentData) => {
    let accessToken = getAccessToken();
    if (!accessToken) {
        return { status: 401 };
    }

    accessToken = `Bearer ${accessToken}`;

    const res = await fetch(`${API_URL}api/renting/iha/`, {
        method: "POST",
        body: JSON.stringify(rentData),
        headers: { "Content-Type": "application/json", Authorization: accessToken },
    });
    return res;
};

export const getRentedIHAList = async (limit, offset, ordering, filters) => {
    let accessToken = getAccessToken();
    if (!accessToken) {
        return { status: 401 };
    }

    accessToken = `Bearer ${accessToken}`;

    const res = await fetch(
        `${API_URL}api/renting/iha/?offset=${offset}&limit=${limit}&ordering=${ordering}${filters}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: accessToken },
        }
    );
    return res;
};

export const updateRentedIHA = async (rentingId, rentedIhaData) => {
    let accessToken = getAccessToken();
    if (!accessToken) {
        return { status: 401 };
    }

    accessToken = `Bearer ${accessToken}`;

    const res = await fetch(`${API_URL}api/renting/iha/${rentingId}/`, {
        method: "PUT",
        body: JSON.stringify(rentedIhaData),
        headers: { "Content-Type": "application/json", Authorization: accessToken },
    });
    return res;
};

export const deleteRentedIHA = async (rentingId) => {
    let accessToken = getAccessToken();
    if (!accessToken) {
        return { status: 401 };
    }

    accessToken = `Bearer ${accessToken}`;

    const res = await fetch(`${API_URL}api/renting/iha/${rentingId}/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: accessToken },
    });
    return res;
};
