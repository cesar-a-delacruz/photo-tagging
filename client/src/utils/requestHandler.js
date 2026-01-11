import requestInfo from "./requestInfo.js";
export default {
  get: async (path) => {
    const response = await fetch(`${requestInfo.origin}/${path}`, {
      headers: { Authorization: `Bearer ${requestInfo.token()}` },
    });

    const data = await response.json();
    if (response.ok) return data;
    return alert(data.error);
  },
  post: async (data, path) => {
    const response = await fetch(`${requestInfo.origin}/${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${requestInfo.token}`,
      },
      body: new URLSearchParams(data),
    });

    if (!response.ok) return console.log(response);
    return await response.json();
  },
  postFile: async (item, path) => {
    const formData = new FormData();
    for (const field in item) {
      formData.append(field, item[field]);
    }

    const response = await fetch(`${requestInfo.origin}/${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${requestInfo.token()}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (response.ok) return alert(data.message);
    else if (response.status === 500) return alert(data.error);
  },
  put: async (item, path) => {
    const response = await fetch(`${requestInfo.origin}/${path}/${item.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${requestInfo.token}`,
      },
      body: new URLSearchParams(item),
    });

    if (!response.ok) return console.log(response);
    return await response.json();
  },
  delete: async (id, path) => {
    const response = await fetch(`${requestInfo.origin}/${path}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${requestInfo.token}`,
      },
    });

    if (!response.ok) return console.log(response);
    return await response.json();
  },
};
