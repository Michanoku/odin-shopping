# The Odin Project Shopping Cart

Using this readme as a project planner and transforming it into the actual readme bit by bit

## Planning: 

### Considered Components:
    Site Components used for routing.
    Item Card - Separate Buttons and Amount? 
    Product List? 
    Navigation? 
    Cart?

### Folder Structure:
    within src:
        - routes 
        - components (that are used within the routes)
        - css
        - assets (for other things like images, maybe fonts?)
        - tests (to have all the tests in one location)

## Project Outline: 

### Home Page
    Any contents fine. Maybe highlighted product, a lil bit of info, some sorta sale maybe.
### Shop Page
    Card elements for products. Amount input, increment and decrement button, title, add to cart button
### Cart Page
    Items and quantities, decrease and increase amount, removal button
### Navigation bar on all pages (Parent route?)
    Links to all pages
    Shipping Card icon with amount inside, updated in realtime

### API fetch. 
    Suggested FakeStore API currently unreachable. Maybe use https://fakeapi.net

### Testing and fixing
    Clear out any missing in props validation errors
    Use React Testing Library
    No need to test react-router-dom
    What matters:
    Filtering by category works
    Search query filters items correctly

    Good test ideas:
    When no category → all items are shown
    When category is set → only that category appears
    When ?q=abc → only matching items appear
    When both category + search → both filters apply

    Adding an item increases cart size
    Adding the same item increases quantity
    Removing an item removes it
    Changing amount updates correctly
    Cart search filters correctly

    Typing updates results (shop/cart)
    Search is case-insensitive
    Empty search shows all items
    Navigating from / → search redirects to /shop

    Don’t test useSearchParams — test the effect

    Frontpage

    When items exist → a card is shown
    When items are empty → loader is shown

    Navigation
    
    Clicking “Shop” shows shop items
    Clicking “Cart” shows cart
    Search from / redirects correctly

### Styling
    Maybe one index css for general purposes
    Individual components can have their own modules