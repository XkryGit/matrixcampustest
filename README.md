# Matrix Campus Test

App developed by Adolfo Zambrana.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

### `npm run prod`

Runs the app in the production mode.\
It is necessary to first build the app with "npm run build".\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run test`

Runs the tests battery generated with Jest in the console.\
These tests include:

- **Component Tests**: Verifies that React components render correctly and behave as expected.

  - `AudioPlayer`
  - `SideBar`
  - `Episode`
  - `Podcast`
  - `Home`

- **Hook Tests**: Verifies that custom hooks handle state and side effects correctly.

  - `useLoading`
  - `usePodcastFilter`
  - `usePodcastData`

- **Integration Tests**: Verifies the interaction between multiple components and hooks.
  - `Episode`
  - `Podcast`

### `npm run cypress`

Runs the tests battery e2e generated with Cypress, showing in Cypress controller.\
It is necessary to first run the app, with "npm run dev" for example.\

Once the Cypress driver is open, we must click on e2e testing, start e2e testing in Chrome, and on the next control screen in the specs teste2e.cy.js.\

These tests include:

- **Navigation Tests**: Verifies that navigation between different pages works correctly.

  - Navigation to the Home Page
  - Navigation to the Podcast Page
  - Navigation to the Episode Page

- **User Interaction Tests**: Verifies that user interactions with the interface work as expected.

  - Filtering Podcasts
  - Playing Episodes

- **Data Loading Tests**: Verifies that data loads correctly from the API and is displayed in the interface.
  - Loading the Podcast List
  - Loading Episodes of a Podcast
