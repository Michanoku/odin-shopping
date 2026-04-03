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

### Styling
    Maybe one index css for general purposes
    Individual components can have their own modules