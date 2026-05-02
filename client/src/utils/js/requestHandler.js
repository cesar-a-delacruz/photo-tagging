export default {
  get: async (path) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER}/${path}`);

    let json;
    if (!response.ok) {
      if (response.status === 500) {
        json = await response.json();
        console.error(json.error);
        return alert(json.message);
      }
      return console.error(response);
    }
    json = await response.json();
    return json;
  },
  post: async (data, path) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER}/${path}`, {
      method: "POST",
      body: new URLSearchParams(data),
    });

    let json;
    if (!response.ok) {
      if (response.status === 500) {
        json = await response.json();
        console.error(json.error);
        return alert(json.message);
      }
      return console.error(response);
    }
    json = await response.json();
    return json;
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

    let json;
    if (!response.ok) {
      if (response.status === 500) {
        json = await response.json();
        console.error(json.error);
        return alert(json.message);
      }
      return console.error(response);
    }
    json = await response.json();
    return json;
  },
  put: async (item, path) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/${path}/${item.id}`,
      {
        method: "PUT",
        body: new URLSearchParams(item),
      },
    );

    let json;
    if (!response.ok) {
      if (response.status === 500) {
        json = await response.json();
        console.error(json.error);
        return alert(json.message);
      }
      return console.error(response);
    }
    return response;
  },
  delete: async (id, path) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/${path}/${id}`,
      {
        method: "DELETE",
      },
    );

    let json;
    if (!response.ok) {
      if (response.status === 500) {
        json = await response.json();
        console.error(json.error);
        return alert(json.message);
      }
      return console.error(response);
    }
    return response;
  },
};
