/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './1-app/routes/__root'
import { Route as AuthSignUpImport } from './1-app/routes/auth/sign-up'
import { Route as AuthSignInImport } from './1-app/routes/auth/sign-in'

// Create Virtual Routes

const SettingsLazyImport = createFileRoute('/settings')()
const IndexLazyImport = createFileRoute('/')()
const EmployeesIndexLazyImport = createFileRoute('/employees/')()
const EmployeesAddLazyImport = createFileRoute('/employees/add')()
const EmployeesEditEmployeeIdLazyImport = createFileRoute(
  '/employees/edit/$employeeId',
)()

// Create/Update Routes

const SettingsLazyRoute = SettingsLazyImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./1-app/routes/settings.lazy').then((d) => d.Route),
)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./1-app/routes/index.lazy').then((d) => d.Route))

const EmployeesIndexLazyRoute = EmployeesIndexLazyImport.update({
  id: '/employees/',
  path: '/employees/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./1-app/routes/employees/index.lazy').then((d) => d.Route),
)

const EmployeesAddLazyRoute = EmployeesAddLazyImport.update({
  id: '/employees/add',
  path: '/employees/add',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./1-app/routes/employees/add.lazy').then((d) => d.Route),
)

const AuthSignUpRoute = AuthSignUpImport.update({
  id: '/auth/sign-up',
  path: '/auth/sign-up',
  getParentRoute: () => rootRoute,
} as any)

const AuthSignInRoute = AuthSignInImport.update({
  id: '/auth/sign-in',
  path: '/auth/sign-in',
  getParentRoute: () => rootRoute,
} as any)

const EmployeesEditEmployeeIdLazyRoute =
  EmployeesEditEmployeeIdLazyImport.update({
    id: '/employees/edit/$employeeId',
    path: '/employees/edit/$employeeId',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./1-app/routes/employees/edit.$employeeId.lazy').then(
      (d) => d.Route,
    ),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/settings': {
      id: '/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof SettingsLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth/sign-in': {
      id: '/auth/sign-in'
      path: '/auth/sign-in'
      fullPath: '/auth/sign-in'
      preLoaderRoute: typeof AuthSignInImport
      parentRoute: typeof rootRoute
    }
    '/auth/sign-up': {
      id: '/auth/sign-up'
      path: '/auth/sign-up'
      fullPath: '/auth/sign-up'
      preLoaderRoute: typeof AuthSignUpImport
      parentRoute: typeof rootRoute
    }
    '/employees/add': {
      id: '/employees/add'
      path: '/employees/add'
      fullPath: '/employees/add'
      preLoaderRoute: typeof EmployeesAddLazyImport
      parentRoute: typeof rootRoute
    }
    '/employees/': {
      id: '/employees/'
      path: '/employees'
      fullPath: '/employees'
      preLoaderRoute: typeof EmployeesIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/employees/edit/$employeeId': {
      id: '/employees/edit/$employeeId'
      path: '/employees/edit/$employeeId'
      fullPath: '/employees/edit/$employeeId'
      preLoaderRoute: typeof EmployeesEditEmployeeIdLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/settings': typeof SettingsLazyRoute
  '/auth/sign-in': typeof AuthSignInRoute
  '/auth/sign-up': typeof AuthSignUpRoute
  '/employees/add': typeof EmployeesAddLazyRoute
  '/employees': typeof EmployeesIndexLazyRoute
  '/employees/edit/$employeeId': typeof EmployeesEditEmployeeIdLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/settings': typeof SettingsLazyRoute
  '/auth/sign-in': typeof AuthSignInRoute
  '/auth/sign-up': typeof AuthSignUpRoute
  '/employees/add': typeof EmployeesAddLazyRoute
  '/employees': typeof EmployeesIndexLazyRoute
  '/employees/edit/$employeeId': typeof EmployeesEditEmployeeIdLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/settings': typeof SettingsLazyRoute
  '/auth/sign-in': typeof AuthSignInRoute
  '/auth/sign-up': typeof AuthSignUpRoute
  '/employees/add': typeof EmployeesAddLazyRoute
  '/employees/': typeof EmployeesIndexLazyRoute
  '/employees/edit/$employeeId': typeof EmployeesEditEmployeeIdLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/settings'
    | '/auth/sign-in'
    | '/auth/sign-up'
    | '/employees/add'
    | '/employees'
    | '/employees/edit/$employeeId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/settings'
    | '/auth/sign-in'
    | '/auth/sign-up'
    | '/employees/add'
    | '/employees'
    | '/employees/edit/$employeeId'
  id:
    | '__root__'
    | '/'
    | '/settings'
    | '/auth/sign-in'
    | '/auth/sign-up'
    | '/employees/add'
    | '/employees/'
    | '/employees/edit/$employeeId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  SettingsLazyRoute: typeof SettingsLazyRoute
  AuthSignInRoute: typeof AuthSignInRoute
  AuthSignUpRoute: typeof AuthSignUpRoute
  EmployeesAddLazyRoute: typeof EmployeesAddLazyRoute
  EmployeesIndexLazyRoute: typeof EmployeesIndexLazyRoute
  EmployeesEditEmployeeIdLazyRoute: typeof EmployeesEditEmployeeIdLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  SettingsLazyRoute: SettingsLazyRoute,
  AuthSignInRoute: AuthSignInRoute,
  AuthSignUpRoute: AuthSignUpRoute,
  EmployeesAddLazyRoute: EmployeesAddLazyRoute,
  EmployeesIndexLazyRoute: EmployeesIndexLazyRoute,
  EmployeesEditEmployeeIdLazyRoute: EmployeesEditEmployeeIdLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/settings",
        "/auth/sign-in",
        "/auth/sign-up",
        "/employees/add",
        "/employees/",
        "/employees/edit/$employeeId"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/settings": {
      "filePath": "settings.lazy.tsx"
    },
    "/auth/sign-in": {
      "filePath": "auth/sign-in.tsx"
    },
    "/auth/sign-up": {
      "filePath": "auth/sign-up.tsx"
    },
    "/employees/add": {
      "filePath": "employees/add.lazy.tsx"
    },
    "/employees/": {
      "filePath": "employees/index.lazy.tsx"
    },
    "/employees/edit/$employeeId": {
      "filePath": "employees/edit.$employeeId.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
