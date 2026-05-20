This next option shifts the focus toward **data fetching, handling network states (loading/error), and optimization**. It introduces a classic "medium-level" challenge: implementing a **debounced search** and handling async race conditions.

## PRD: FilmFinder (Movie Discovery Dashboard)

**Objective:** Build a dashboard where users can search for movies, filter them by category, and view details, while gracefully managing loading, empty, and error states.

### 1. Core User Stories

- **As a user**, I want to type into a search bar and see matching movies appear automatically.
- **As a user**, I want to see a loading spinner while data is being fetched so I know the app hasn't crashed.
- **As a user**, I want to filter the current results by genre (e.g., Action, Comedy, Drama).
- **As a user**, I want a clear message if no movies match my search query.

### 2. The React Concept Mapping

This project moves away from local data and simulates real-world asynchronous operations.

| Concept                  | Implementation in App                                                                                                                                                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **State** (`useState`)   | Tracking the `searchQuery`, the filtered `movies` array, `isLoading` (boolean), `errorMessage` (string or null), and `selectedGenre` (string).                                                                                |
| **Effect** (`useEffect`) | Triggering the API fetch whenever the `searchQuery` or `selectedGenre` changes. Crucially, you will practice using a **cleanup function with an `AbortController**` to cancel old pending requests if the user types quickly. |
| **Props**                | Propagating the fetched movie list down to a grid layout, and passing individual movie data objects down to individual card layout components.                                                                                |

---

### 3. Component Architecture

Keep your layout structured to practice passing clean data objects through your prop tree:

1. **`App` (Parent Component)**

- **State:** `query`, `movies`, `loading`, `error`, `genre`.
- **Effect:** Fetches from your data source. Contains the asynchronous logic, updates loading/error states before and after the fetch.
- **Role:** The data command center.

2. **`SearchBar` (Child)**

- **Props Received:** `value` (string), `onChange` (function).
- **Role:** Renders the text input. It doesn't fetch data itself; it just tells the parent when the user typed something.

3. **`GenreFilter` (Child)**

- **Props Received:** `currentGenre` (string), `onSelectGenre` (function).
- **Role:** A row of buttons or a dropdown menu representing genres (e.g., "All", "Action", "Sci-Fi"). Clicking one passes the selection back to the parent.

4. **`MovieGrid` (Child)**

- **Props Received:** `movies` (array), `isLoading` (boolean), `error` (string).
- **Role:** Handles conditional rendering.
- If `isLoading` is true $\rightarrow$ show a spinner.
- If `error` exists $\rightarrow$ show the error message.
- If `movies.length === 0` $\rightarrow$ show "No movies found."
- Otherwise $\rightarrow$ map through movies and render `<MovieCard/>`.

5. **`MovieCard` (Grandchild)**

- **Props Received:** `movie` (individual object).
- **Role:** A visual card showing the movie's poster image, title, genre, and release year.

---

### 4. Data / API Strategy

https://fooapi.com/api/movies

```javascript
// Expected structure for individual items in your array

 {
      "id": "6",
      "title": "Schindler's List",
      "year": "1993",
      "rated": "R",
      "released": "04-02-1994",
      "runtime": "195 min",
      "genre": "Biography, Drama, History",
      "director": "Steven Spielberg",
      "writer": "Thomas Keneally, Steven Zaillian",
      "actors": "Liam Neeson, Ralph Fiennes, Ben Kingsley",
      "plot": "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
      "language": "English, Hebrew, German, Polish, Latin",
      "country": "United States",
      "awards": "Won 7 Oscars. 91 wins & 49 nominations total",
      "poster": "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
      "imdbRating": "9.0",
      "imdbId": "tt0108052",
      "boxOffice": "$96,898,818"
    }
```

### 5. Medium-Level Optimization Challenges

Once the basic fetch works, implement these two crucial optimization patterns:

- **The Debounce:** Instead of running the `useEffect` fetch on _every single keystroke_ (which can spam a server), set up a small timer inside your effect so it only triggers a fetch after the user has stopped typing for **300ms**.
- **Race Condition Prevention:** If a user types "Matrix", separate network requests go out for "M", "Ma", "Mat", etc. If the response for "Ma" finishes _after_ the response for "Matrix", your app will display the wrong data. Use an `AbortController` in your `useEffect` cleanup function to discard stale requests.
