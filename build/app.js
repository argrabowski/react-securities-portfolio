import React from "./_snowpack/pkg/react.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: []};
    this.load();
  }
  validate(nameIn, tickerIn, exchangeIn, riskIn, priceIn, sharesIn) {
    if (nameIn.value === "" || tickerIn.value === "" || priceIn.value === "" || sharesIn.value === "" || exchangeIn.value === "" || riskIn === "" || nameIn.value === "Enter Name of Security Here" || tickerIn.value === "Enter Ticker Symbol Here" || priceIn.value === "Enter Price of Security Here" || sharesIn.value === "Enter Shares Owned Here") {
      console.log("ERROR: Some or all fields are empty");
      alert("ERROR: Some or all fields are empty");
      return false;
    }
    if (nameIn.value.length > 16 || tickerIn.value.length > 6 || priceIn.value.length > 12 || sharesIn.value.length > 12) {
      console.log("ERROR: Too many characters entered");
      alert("ERROR: Too many characters entered");
      return false;
    }
    if (isNaN(priceIn.value) || isNaN(sharesIn.value)) {
      console.log("ERROR: Price or shares are not numbers");
      alert("ERROR: Price or shares are not numbers");
      return false;
    }
  }
  load() {
    fetch("/load", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json()).then((json) => {
      this.setState({items: json});
    });
  }
  add(e) {
    e.preventDefault();
    const nameIn = document.querySelector("#name"), tickerIn = document.querySelector("#ticker"), exchangeIn = document.querySelector("#exchange"), priceIn = document.querySelector("#price"), sharesIn = document.querySelector("#shares");
    const radios = document.getElementsByName("risk");
    let riskIn = "";
    for (let rad = 0; rad < radios.length; rad++) {
      if (radios[rad].checked) {
        riskIn = document.getElementById(radios[rad].id);
      }
    }
    const ret = this.validate(nameIn, tickerIn, exchangeIn, riskIn, priceIn, sharesIn);
    if (ret === false)
      return ret;
    const json = {
      name: nameIn.value,
      ticker: tickerIn.value,
      exchange: exchangeIn.value,
      risk: riskIn.value,
      price: priceIn.value,
      shares: sharesIn.value
    };
    json.invested = json.price * json.shares;
    const body = JSON.stringify(json);
    fetch("/add", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json()).then((json2) => {
      this.setState({items: json2});
    });
  }
  remove(e, key) {
    e.preventDefault();
    const json = {
      _id: key
    }, body = JSON.stringify(json);
    fetch("/remove", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json()).then((json2) => {
      this.setState({items: json2});
    });
  }
  edit(e, key) {
    e.preventDefault();
    const nameIn = document.querySelector("#name"), tickerIn = document.querySelector("#ticker"), exchangeIn = document.querySelector("#exchange"), priceIn = document.querySelector("#price"), sharesIn = document.querySelector("#shares");
    const radios = document.getElementsByName("risk");
    let riskIn = "";
    for (let rad = 0; rad < radios.length; rad++) {
      if (radios[rad].checked) {
        riskIn = document.getElementById(radios[rad].id);
      }
    }
    const ret = this.validate(nameIn, tickerIn, exchangeIn, riskIn, priceIn, sharesIn);
    if (ret === false)
      return ret;
    const json = {
      _id: key,
      name: nameIn.value,
      ticker: tickerIn.value,
      exchange: exchangeIn.value,
      risk: riskIn.value,
      price: priceIn.value,
      shares: sharesIn.value
    };
    json.invested = json.price * json.shares;
    const body = JSON.stringify(json);
    fetch("/edit", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json()).then((json2) => {
      this.setState({items: json2});
    });
  }
  render() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
      class: "bg-dark"
    }, /* @__PURE__ */ React.createElement("h1", {
      class: "display-4 text-center text-light"
    }, "Short Stack Securities Portfolio")), /* @__PURE__ */ React.createElement("div", {
      class: "container-fluid"
    }, /* @__PURE__ */ React.createElement("div", {
      class: "row"
    }, /* @__PURE__ */ React.createElement("div", {
      class: "col-1"
    }), /* @__PURE__ */ React.createElement("div", {
      class: "col-7 table-responsive"
    }, /* @__PURE__ */ React.createElement("table", {
      class: "table table-hover"
    }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", {
      class: "col-md-2"
    }, "Name"), /* @__PURE__ */ React.createElement("th", {
      class: "col-md-1"
    }, "Ticker"), /* @__PURE__ */ React.createElement("th", {
      class: "col-md-1"
    }, "Exchange"), /* @__PURE__ */ React.createElement("th", {
      class: "col-md-1"
    }, "Risk"), /* @__PURE__ */ React.createElement("th", {
      class: "col-md-1"
    }, "Price ($)"), /* @__PURE__ */ React.createElement("th", {
      class: "col-md-1"
    }, "Shares"), /* @__PURE__ */ React.createElement("th", {
      class: "col-md-1"
    }, "Inv. ($)"), /* @__PURE__ */ React.createElement("th", {
      class: "col-md-2"
    }, "Remove Entry"), /* @__PURE__ */ React.createElement("th", {
      class: "col-md-2"
    }, "Edit Entry"))), /* @__PURE__ */ React.createElement("tbody", null, this.state.items.map((item, i) => /* @__PURE__ */ React.createElement(Item, {
      name: item.name,
      ticker: item.ticker,
      exchange: item.exchange,
      risk: item.risk,
      price: item.price,
      shares: item.shares,
      invested: item.invested,
      remove: (e) => this.remove(e, item._id),
      edit: (e) => this.edit(e, item._id)
    }))))), /* @__PURE__ */ React.createElement("div", {
      class: "col-3"
    }, /* @__PURE__ */ React.createElement("form", {
      class: "mb-10"
    }, /* @__PURE__ */ React.createElement("h2", null, "Input Stock, ETF, or Index Fund"), /* @__PURE__ */ React.createElement("div", {
      class: "form-group"
    }, /* @__PURE__ */ React.createElement("label", {
      for: "name"
    }, "Name:"), /* @__PURE__ */ React.createElement("textarea", {
      type: "text",
      class: "form-control",
      id: "name",
      placeholder: "Enter Security Name Here",
      onFocus: (e) => e.target.placeholder = ""
    })), /* @__PURE__ */ React.createElement("div", {
      class: "form-group"
    }, /* @__PURE__ */ React.createElement("label", {
      for: "ticker"
    }, "Ticker:"), /* @__PURE__ */ React.createElement("input", {
      type: "text",
      class: "form-control",
      id: "ticker",
      size: "30",
      placeholder: "Enter Ticker Symbol Here",
      onFocus: (e) => e.target.placeholder = "",
      onChange: (e) => this.setState({text: e.target.value})
    })), /* @__PURE__ */ React.createElement("div", {
      class: "form-group"
    }, /* @__PURE__ */ React.createElement("label", {
      for: "exchange"
    }, "Exchange:"), /* @__PURE__ */ React.createElement("select", {
      type: "text",
      class: "form-control",
      id: "exchange",
      onChange: (e) => this.setState({text: e.target.value})
    }, /* @__PURE__ */ React.createElement("option", null, "NYSE"), /* @__PURE__ */ React.createElement("option", null, "NASDAQ"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", {
      for: "risk"
    }, "Risk:"), /* @__PURE__ */ React.createElement("div", {
      class: "form-check"
    }, /* @__PURE__ */ React.createElement("input", {
      type: "radio",
      class: "form-check-input",
      id: "high",
      name: "risk",
      value: "High"
    }), /* @__PURE__ */ React.createElement("label", {
      class: "form-check-label",
      for: "high"
    }, "High")), /* @__PURE__ */ React.createElement("div", {
      class: "form-check"
    }, /* @__PURE__ */ React.createElement("input", {
      type: "radio",
      class: "form-check-input",
      id: "medium",
      name: "risk",
      value: "Medium"
    }), /* @__PURE__ */ React.createElement("label", {
      class: "form-check-label",
      for: "medium"
    }, "Medium")), /* @__PURE__ */ React.createElement("div", {
      class: "form-check"
    }, /* @__PURE__ */ React.createElement("input", {
      type: "radio",
      class: "form-check-input",
      id: "low",
      name: "risk",
      value: "Low"
    }), /* @__PURE__ */ React.createElement("label", {
      class: "form-check-label",
      for: "low"
    }, "Low"))), /* @__PURE__ */ React.createElement("div", {
      class: "form-group"
    }, /* @__PURE__ */ React.createElement("label", {
      for: "price"
    }, "Price:"), /* @__PURE__ */ React.createElement("input", {
      type: "text",
      class: "form-control",
      id: "price",
      size: "30",
      placeholder: "Enter Security Price Here",
      onFocus: (e) => e.target.placeholder = "",
      onChange: (e) => this.setState({text: e.target.value})
    })), /* @__PURE__ */ React.createElement("div", {
      class: "form-group"
    }, /* @__PURE__ */ React.createElement("label", {
      for: "shares"
    }, "Shares:"), /* @__PURE__ */ React.createElement("input", {
      type: "text",
      class: "form-control",
      id: "shares",
      size: "30",
      placeholder: "Enter Shares Owned Here",
      onFocus: (e) => e.target.placeholder = "",
      onChange: (e) => this.setState({text: e.target.value})
    }), /* @__PURE__ */ React.createElement("br", null)), /* @__PURE__ */ React.createElement("button", {
      class: "btn btn-success btn-lg col-4",
      onClick: (e) => this.add(e)
    }, "Submit"), /* @__PURE__ */ React.createElement("p", null)), /* @__PURE__ */ React.createElement("h2", null, "How To Use Site"), /* @__PURE__ */ React.createElement("p", null, "Enter the required information in the", /* @__PURE__ */ React.createElement("b", null, "Input Stock, ETF, or Index Fund"), " section."), /* @__PURE__ */ React.createElement("p", null, "When you have finished entering information, click the", /* @__PURE__ */ React.createElement("b", null, "Submit"), " button."), /* @__PURE__ */ React.createElement("p", null, "In order to remove an item, click the ", /* @__PURE__ */ React.createElement("b", null, "Remove"), " button in the respective row."), /* @__PURE__ */ React.createElement("p", null, "In order to update an item, enter the necessary information you wish the entry to contain in the", /* @__PURE__ */ React.createElement("b", null, "Input Stock, ETF, or Index Fund"), " section and click its ", /* @__PURE__ */ React.createElement("b", null, "Edit"), " button.")), /* @__PURE__ */ React.createElement("div", {
      class: "col-1"
    }))));
  }
}
class Item extends React.Component {
  render() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, this.props.name), /* @__PURE__ */ React.createElement("td", null, this.props.ticker), /* @__PURE__ */ React.createElement("td", null, this.props.exchange), /* @__PURE__ */ React.createElement("td", null, this.props.risk), /* @__PURE__ */ React.createElement("td", null, this.props.price), /* @__PURE__ */ React.createElement("td", null, this.props.shares), /* @__PURE__ */ React.createElement("td", null, this.props.invested), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("button", {
      class: "btn text-light btn-dark col-8",
      onClick: this.props.remove
    }, "Remove")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("button", {
      class: "btn text-light btn-dark col-8",
      onClick: this.props.edit
    }, "Edit"))));
  }
}
export default App;
