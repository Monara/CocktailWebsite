# CocktailWebsite
Personal project made using HTML, CSS, React.js, Node.js, SQL, Express.js.
---------------------------------------------------------------------------

The frontend of this project consists of two pages: home page (search page) and information page.

The home page has a large \<Search\> component, which triggers an API call to the backend fetching results from the database. A search can be carried out by looking up a cocktail by the title or by an ingredient; search by an ingredient also supports filtering to only simple (3 ingredients max.) and / or vegan recipes. The search function uses two \<ReactSearchAutocomplete\> (https://github.com/sickdyd/react-search-autocomplete) components that suggest input based on titles or tags fetched from the database only. Until a search is entered, a random cocktail recipe is displayed.
  
Search results are displayed in sequence as \<SearchResult\> components mapped from items from search result data. Results have a tabular structure based on 'react-tabs'. The main tab shows the title, a representational image of the cocktail, and the ingredient list. The second tab shows details about the given cocktail (how to make it, in what kind of glass, the source of the recipe). A random cocktail recipe is also shown as a \<SearchResult\>, just with an extra line to distinguish it. 
  
The information page is a simple page with text and an image. It reuses the same \<Heading\>, \<ScrollUpButton\>, and \<Footer\> components. The text displayed is language-dependent.
  
The website is bilingual. The default language is English, but it can be changed to Lithuanian from the dropdown menu in the \<Heading\> component. Since the language change is relevant to most of the components, it was implemented as a React context hook that is read by them. Depending on language choice, components display text from different positions ([0] or [1]) in the arrays of the 'text' object that is located in Text.js.
  
The backend of the project is an Express.js web app. It creates a connection to the database and listens for a number of API calls, executing SQL queries of the  database as needed. As of now, the database contains records about ~100 recipes. 
