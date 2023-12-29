import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
    this.load();
  }

  validate(nameIn, tickerIn, exchangeIn, riskIn, priceIn, sharesIn) {
    if (
      nameIn.value === "" ||
      tickerIn.value === "" ||
      priceIn.value === "" ||
      sharesIn.value === "" ||
      exchangeIn.value === "" ||
      riskIn === "" ||
      nameIn.value === "Enter Name of Security Here" ||
      tickerIn.value === "Enter Ticker Symbol Here" ||
      priceIn.value === "Enter Price of Security Here" ||
      sharesIn.value === "Enter Shares Owned Here"
    ) {
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
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ items: json });
      });
  }

  add(e) {
    e.preventDefault();

    const nameIn = document.querySelector("#name"),
      tickerIn = document.querySelector("#ticker"),
      exchangeIn = document.querySelector("#exchange"),
      priceIn = document.querySelector("#price"),
      sharesIn = document.querySelector("#shares");

    const radios = document.getElementsByName("risk");
    let riskIn = "";
    for (let rad = 0; rad < radios.length; rad++) {
      if (radios[rad].checked) {
        riskIn = document.getElementById(radios[rad].id);
      }
    }

    const ret = this.validate(nameIn, tickerIn, exchangeIn, riskIn, priceIn, sharesIn);
    if (ret === false) return ret;

    const json = {
      name: nameIn.value,
      ticker: tickerIn.value,
      exchange: exchangeIn.value,
      risk: riskIn.value,
      price: priceIn.value,
      shares: sharesIn.value,
    };
    json.invested = json.price * json.shares;
    const body = JSON.stringify(json);

    fetch("/add", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ items: json });
      });
  }

  remove(e, key) {
    e.preventDefault();

    const json = {
        _id: key,
      },
      body = JSON.stringify(json);

    fetch("/remove", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ items: json });
      });
  }

  edit(e, key) {
    e.preventDefault();

    const nameIn = document.querySelector("#name"),
      tickerIn = document.querySelector("#ticker"),
      exchangeIn = document.querySelector("#exchange"),
      priceIn = document.querySelector("#price"),
      sharesIn = document.querySelector("#shares");

    const radios = document.getElementsByName("risk");
    let riskIn = "";
    for (let rad = 0; rad < radios.length; rad++) {
      if (radios[rad].checked) {
        riskIn = document.getElementById(radios[rad].id);
      }
    }

    const ret = this.validate(nameIn, tickerIn, exchangeIn, riskIn, priceIn, sharesIn);
    if (ret === false) return ret;

    const json = {
      _id: key,
      name: nameIn.value,
      ticker: tickerIn.value,
      exchange: exchangeIn.value,
      risk: riskIn.value,
      price: priceIn.value,
      shares: sharesIn.value,
    };
    json.invested = json.price * json.shares;
    const body = JSON.stringify(json);

    fetch("/edit", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ items: json });
      });
  }

  render() {
    return (
      <>
        <div class="bg-dark">
          <h1 class="display-4 text-center text-light">Short Stack Securities Portfolio</h1>
        </div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-1"></div>
            <div class="col-7 table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th class="col-md-2">Name</th>
                    <th class="col-md-1">Ticker</th>
                    <th class="col-md-1">Exchange</th>
                    <th class="col-md-1">Risk</th>
                    <th class="col-md-1">Price ($)</th>
                    <th class="col-md-1">Shares</th>
                    <th class="col-md-1">Inv. ($)</th>
                    <th class="col-md-2">Remove Entry</th>
                    <th class="col-md-2">Edit Entry</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.items.map((item, i) => (
                    <Item
                      name={item.name}
                      ticker={item.ticker}
                      exchange={item.exchange}
                      risk={item.risk}
                      price={item.price}
                      shares={item.shares}
                      invested={item.invested}
                      remove={(e) => this.remove(e, item._id)}
                      edit={(e) => this.edit(e, item._id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <div class="col-3">
              <form class="mb-10">
                <h2>Input Stock, ETF, or Index Fund</h2>
                <div class="form-group">
                  <label for="name">Name:</label>
                  <textarea type="text" class="form-control" id="name" placeholder="Enter Security Name Here" onFocus={(e) => (e.target.placeholder = "")}></textarea>
                </div>
                <div class="form-group">
                  <label for="ticker">Ticker:</label>
                  <input type="text" class="form-control" id="ticker" size="30" placeholder="Enter Ticker Symbol Here" onFocus={(e) => (e.target.placeholder = "")} onChange={(e) => this.setState({ text: e.target.value })} />
                </div>
                <div class="form-group">
                  <label for="exchange">Exchange:</label>
                  <select type="text" class="form-control" id="exchange" onChange={(e) => this.setState({ text: e.target.value })}>
                    <option>NYSE</option>
                    <option>NASDAQ</option>
                  </select>
                </div>
                <div>
                  <label for="risk">Risk:</label>
                  <div class="form-check">
                    <input type="radio" class="form-check-input" id="high" name="risk" value="High" />
                    <label class="form-check-label" for="high">
                      High
                    </label>
                  </div>
                  <div class="form-check">
                    <input type="radio" class="form-check-input" id="medium" name="risk" value="Medium" />
                    <label class="form-check-label" for="medium">
                      Medium
                    </label>
                  </div>
                  <div class="form-check">
                    <input type="radio" class="form-check-input" id="low" name="risk" value="Low" />
                    <label class="form-check-label" for="low">
                      Low
                    </label>
                  </div>
                </div>
                <div class="form-group">
                  <label for="price">Price:</label>
                  <input type="text" class="form-control" id="price" size="30" placeholder="Enter Security Price Here" onFocus={(e) => (e.target.placeholder = "")} onChange={(e) => this.setState({ text: e.target.value })} />
                </div>
                <div class="form-group">
                  <label for="shares">Shares:</label>
                  <input type="text" class="form-control" id="shares" size="30" placeholder="Enter Shares Owned Here" onFocus={(e) => (e.target.placeholder = "")} onChange={(e) => this.setState({ text: e.target.value })} />
                  <br />
                </div>
                <button class="btn btn-success btn-lg col-4" onClick={(e) => this.add(e)}>
                  Submit
                </button>
                <p></p>
              </form>
              <h2>How To Use Site</h2>
              <p>
                Enter the required information in the
                <b>Input Stock, ETF, or Index Fund</b> section.
              </p>
              <p>
                When you have finished entering information, click the
                <b>Submit</b> button.
              </p>
              <p>
                In order to remove an item, click the <b>Remove</b> button in the respective row.
              </p>
              <p>
                In order to update an item, enter the necessary information you wish the entry to contain in the
                <b>Input Stock, ETF, or Index Fund</b> section and click its <b>Edit</b> button.
              </p>
            </div>
            <div class="col-1"></div>
          </div>
        </div>
      </>
    );
  }
}

class Item extends React.Component {
  render() {
    return (
      <>
        <tr>
          <td>{this.props.name}</td>
          <td>{this.props.ticker}</td>
          <td>{this.props.exchange}</td>
          <td>{this.props.risk}</td>
          <td>{this.props.price}</td>
          <td>{this.props.shares}</td>
          <td>{this.props.invested}</td>
          <td>
            <button class="btn text-light btn-dark col-8" onClick={this.props.remove}>
              Remove
            </button>
          </td>
          <td>
            <button class="btn text-light btn-dark col-8" onClick={this.props.edit}>
              Edit
            </button>
          </td>
        </tr>
      </>
    );
  }
}

export default App;
