export function buildRoutePath(path) {
    // Identification dynamic parameters
    const routeParametersRegex = /:([a-zA-Z]+)/g

    // Replaces the dynamic url parameter with a Regex to accept any value that may come
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

    // Creating a new Regex to start with pathWithParams
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

    return pathRegex
}