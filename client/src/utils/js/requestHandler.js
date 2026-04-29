export default {
  get: async (path) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER}/${path}`);

    if (!response.ok && response.status === 500) return alert(data.error);
    return await response.json();
  },
  post: async (data, path) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER}/${path}`, {
      method: "POST",
      body: new URLSearchParams(data),
    });

    if (!response.ok && response.status === 500) return alert(data.error);
    return await response.json();
  },
  postFile: async (item, path) => {
    const formData = new FormData();
    for (const field in item) {
      formData.append(field, item[field]);
    }

    const response = await fetch(`${import.meta.env.VITE_SERVER}/${path}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok && response.status === 500) return alert(data.error);
    return await response.json();
  },
  put: async (item, path) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/${path}/${item.id}`,
      {
        method: "PUT",
        body: new URLSearchParams(item),
      },
    );

    if (!response.ok) return console.log(response);
    return response;
  },
  delete: async (id, path) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/${path}/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) return console.log(response);
    return response;
  },
};
