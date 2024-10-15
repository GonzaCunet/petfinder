const API_BASE_URL = process.env.API_BASE_URL;

const state = {
  data: {
    lat: NaN,
    lng: NaN,
  },

  listeners: [],

  getState() {
    return this.data;
  },

  setState(state) {
    this.data = state;
    for (const cb of this.listeners) {
      cb();
    }
  },

  subscribe(cb: (any) => any) {
    this.listeners.push(cb);
  },

  async userSignUp(email, password, name) {
    return fetch(API_BASE_URL + "/auth", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    }).then((res) => {
      return res.json();
    });
  },
};

export { state };
