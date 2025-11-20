import React from "react";
import { Router, parsePath, createPath } from "react-router-dom";
import { Action as RouterAction } from "@remix-run/router";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";

const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

const createHref = (to) => (typeof to === "string" ? to : createPath(to));

const encodeLocation = (to) => {
  let href = createHref(to);
  href = href.replace(/ $/, "%20");
  const encoded = ABSOLUTE_URL_REGEX.test(href) ? new URL(href) : new URL(href, "http://localhost");
  return {
    pathname: encoded.pathname,
    search: encoded.search,
    hash: encoded.hash,
  };
};

const getServerNavigator = () => {
  const errorFor = (method) =>
    `You cannot use navigator.${method}() on the server because it is a stateless environment.`;
  return {
    createHref,
    encodeLocation,
    push() {
      throw new Error(errorFor("push"));
    },
    replace() {
      throw new Error(errorFor("replace"));
    },
    go() {
      throw new Error(errorFor("go"));
    },
    back() {
      throw new Error(errorFor("back"));
    },
    forward() {
      throw new Error(errorFor("forward"));
    },
  };
};

function StaticRouter({ basename, children, location: locationProp = "/", future }) {
  const parsedLocation = typeof locationProp === "string" ? parsePath(locationProp) : locationProp;
  const location = {
    pathname: parsedLocation?.pathname || "/",
    search: parsedLocation?.search || "",
    hash: parsedLocation?.hash || "",
    state: parsedLocation?.state ?? null,
    key: parsedLocation?.key || "default",
  };

  return (
    <Router
      basename={basename}
      location={location}
      navigationType={RouterAction.Pop}
      navigator={getServerNavigator()}
      future={future}
      static
    >
      {children}
    </Router>
  );
}

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}
