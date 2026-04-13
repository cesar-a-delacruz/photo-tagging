export default function DataFormReducer(state, action) {
  switch (action.type) {
    case "load": {
      const data = state;

      for (let i = 0; i < data.length; i++) {
        if (data[i].type === "json" && typeof data[i].value === "string")
          data[i].value = JSON.parse(action.payload[data[i].name]);
        else data[i].value = action.payload[data[i].name];
      }

      return [...data];
    }
    case "change": {
      const data = state;

      for (let i = 0; i < data.length; i++) {
        if (data[i].name === action.payload.id) {
          data[i].value = action.payload.value;
          return [...data];
        } else if (data[i].type === "json") {
          for (const key in data[i].value) {
            if (key === action.payload.id) {
              data[i].value[key] = action.payload.value;
              return [...data];
            }
          }
        }
      }

      return [...data];
    }
    case "clear": {
      const data = state;

      for (let i = 0; i < data.length; i++) {
        if (data[i].type === "json") {
          data[i].value = Object.keys(data[i].value).reduce((acc, key) => {
            acc[key] = "";
            return acc;
          }, {});
        } else data[i].value = "";
      }

      return [...data];
    }
  }
}
