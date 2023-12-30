## React Securities Portfolio

https://securities-portfolio-react.glitch.me

My application is a stock, ETF, or index fund financial portfolio creator and manager. The site gathers information from the user about a security to produce a portfolio
listing and attaches that item to the user's account. Information that the user must enter includes the name of the security, its ticker symbol, the exchange it is traded
on, its perceived risk, its price in dollars, and the amount of shares that the user owns. The site produces a derived field that denotes the total dollar amount that the
user has invested in the security. All of the information that the user enters plus the derived field is used to append a portfolio listing to the page that the user can
edit and remove. Since this app does not include functionality for creating a new account if one with the given credentials does not exist, I have listed three valid
accounts that are stored in the database with two sample items each.

- Test User 1: Username: user1, Password: pass1
- Test User 2: Username: user2, Password: pass2
- Test User 3: Username: user3, Password: pass3

This application was refactored from my a3 submission to use React components for the portfolio listing display and updating. To start, a basic React project was created
using Babel to compile and Snowpack to bundle by following the instructions at createapp.dev. The App and Item components were used to organize between the bulk of the
application, including add, remove, and edit requests, and items of the table. The only functional difference between this refactor and my original a3 submission is that
the input fields use placeholder text instead of clearing the value inside each input on focus. This slight difference in the functionality of the inputs is only present
because it was easier to implement with React.

React improved the development experience by condensing code and removing the need for cumbersome implementation related to updating data. Although the file containing the
react components (app.jsx) is long, there is no need for a scripts Javascript file and the main html file is now very short. For example, in my original a3 submission, there
was a function update() that created a new row and populated it, which was messy and cumbersome. With React components, there is no need to manually update the page since
the components are reactive which means they automatically change based on their state. However, I personally find writing html in a Javascript file to be awkward, so I will
most likely stick to frameworks like Vue in the future.
