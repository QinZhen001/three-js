import { Suspense, lazy } from "react"
import { Route, Routes, RouterProvider, createHashRouter, createRoutesFromElements, useRouteError } from "react-router-dom";

const ShadowPage = lazy(() => import('../pages/Shadow'));
const IndexPage = lazy(() => import('../pages/index'));
const AnimationPage = lazy(() => import('../pages/Animation'));


export const routes = [
  {
    path: "/shadow",
    element: <ShadowPage></ShadowPage>,
  }, {
    path: "/animation",
    element: <AnimationPage></AnimationPage>,
  }, {
    path: "/",
    element: <IndexPage></IndexPage>,
  }
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
