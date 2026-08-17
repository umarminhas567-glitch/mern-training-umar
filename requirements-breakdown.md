1. Functional Requirements
    1: all Users must be able to input search terms into a search bar located in the application header that are using.
    2: The system have to allow searching by product title, name, or category.
    3: the results must display product name, image, price, and category.
    4: The system update or display search result dynamically.
    5: Users must be able to clear the search input field with a single click button.

2. Negative & Edge-Case Scenarios
Case 1 : If the user submit an empty search input or spaces only, show a validation warning.
Case 2: If no items match the search, display "No product found".
Case 3: If input contains special characters (e.g., `@#$%^*()`) then show invalid charactor.

3. 
Acceptance Criteria (Given / When / Then)
Scenario A: Successful Search
Given: the user is on the homepage and the search bar is empty,
When: the user types item name and presses Enter, 
then: the system displays a list of products containing the match item name on the page.

Scenario B: Search with No Matching Items
Given the user enters a non-existent item query like "asdasd",
When the user submits the search,
Then the system displays "No products found for 'asdasd'" and suggests alternative broad search terms.

4. Clarifying Questions for Product Owner:
1: Should the search be case-insensitive, and do we support partial matching or exact match only?
2: What is the maximum number of search results displayed per page before applying pagination or infinite scroll?
3: Should category searches auto-suggest drop-down suggestions as the user types, or execute only on clicking the search button?