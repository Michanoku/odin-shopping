# The Odin Project Shopping Cart

My submission for The Odin Project's Shopping Cart project, implementing a shopping cart with react. 

## Features:

### Layout
There is a navbar with a cart-button that has a span to show the amount of items and a mobile-only toggle for the sidebar. The navbar also features a search that will search within the current shop or cart, and also navigate to the shop automatically from the frontpage. The sidebar has all links, categories and a toggle for the theme. It is initially hidden on mobile and can be toggle via the toggle button in the navbar. All other site content is wrapped in this layout.

### Frontpage
A highlighted item will be shown to the user. The user can add the item to the cart with a specified amount. 

### Shop
Shows the user all items or the selected category items, as well as items matching the users search query. Items can be added to the cart with an amount specified on the item card. 

### Cart
Shows the user all items in the cart, as well as items matching the users search query. Item amounts can be updated and items can be removed completely. 

## Contents

### Components: 
- CartCard: Handles shopping items in the cart, including changing amounts and removing the item
- NavBar: The navbar that shows a toggle for the sidebar on mobile and the cart link with span of cart item amounts
- Search: The search bar that will search the current shop or cart page items. Will navigate to the shop automatically when used from the frontpage
- ShopCard: Handles shopping items in the shop, including changing amounds and adding the item to the cart
- SideBar: Has the links to home, shop and categories, as well as a theme toggle

### Routes:
- cart: Shows the user the items in their cart
- error-page: Displays a generic error page if something goes wrong
- frontpage: Shows a randomly picked "hot" item
- root: The root page that contains navbar, sidebar and via outlet the other routes
- shop: Shows the user all items available, or just one category

### Tests:
- cart: Shows items and amounts in the cart correctly
- frontpage: Shows a loader or the highlighted item after loading
- ItemCard: Shows correct amounts, can add or subtract amount, can add to or remove from the cart 
- NavBar: Shows the correct items depending on mobile or desktop, toggles correctly 
- Search: Navigates to the shop page if searched on the frontpage
- shop: Shows the correct items depending on category and search query
- SideBar: Shows the correct category links and has working theme toggle

## Folder Structure:
- src:
    - components
    - css
    - routes
    - tests

## Considerations: 

I am still somewhat getting used to react, probably doing a few things a bit differently than more experienced users. I also somehow did not use action or loaders while making this, which makes me wonder if I am doing something wrong of if using those is not strictly required for this project. Alas, all seems to work just fine. However, this may be a point to review in the future. 

I found testing to be a major difficulty spike from just coding the project, having to rely on examples and google to explain how to do it and why my tests were failing even though the site was behaving correctly. I suspect I need to dive more into testing in future projects to make it a bit easier. This time I unfortunately only added testing after the app was complete, because I was really unsure how to use react-router and how to test for it. With the experience gained now, I believe I can maybe start testing earlier on future projects. 

All in all I had fun making this project, but visual implementation remains my weak point.