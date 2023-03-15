import { Suspense, lazy } from "react"
import { Route, Routes, RouterProvider, createHashRouter, createRoutesFromElements, useRouteError } from "react-router-dom";

// const SearchPage = lazy(() => import('../pages/search'));
// const FeedbackPage = lazy(() => import('../pages/feedback'));
// const ResultPage = lazy(() => import('../pages/result'));
// const SSOPage = lazy(() => import('../pages/sso'));


export const routes = [
  {
    path: "/search",
    element: <SearchPage></SearchPage>,
  },
]

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div></div>;
}




const router = createHashRouter(createRoutesFromElements(
  routes.map((item) => (
    <Route key={item.path} path={item.path}
      element={
        <Suspense fallback={<div>loading...</div>}>{item.element}</Suspense>
      }
      errorElement={<ErrorBoundary />}
    >
    </Route >
  ))
));


export const RouteContainer = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}


export default RouteContainer
