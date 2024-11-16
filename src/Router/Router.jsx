
import {createBrowserRouter} from 'react-router-dom'

export const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
  ],{
    future: {
      v7_normalizeFormMethod: true,
    },
  });