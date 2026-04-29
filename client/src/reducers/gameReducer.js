import actions from "./actions";

export default function gameReducer(state, action) {
  switch (action.type) {
    case actions.game.START: {
      const data = state;
      data.start = true;
      return { ...data };
    }
    case actions.game.STOP: {
      const data = state;
      data.start = false;
      return { ...data };
    }
    case actions.game.RESET: {
      const data = state;
      data.start = true;
      data.objects = {
        current: null,
        found: [],
      };
      return { ...data };
    }
    case actions.game.OBJECT_SELECT: {
      const data = state;
      data.objects.current = action.payload;
      return { ...data };
    }
    case actions.game.OBJECT_ADD: {
      const data = state;
      data.start = action.payload.start;
      data.objects = {
        current: null,
        found: action.payload.found,
      };
      return { ...data };
    }
  }
}
