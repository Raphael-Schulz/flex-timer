import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import EditTimer from "./pages/EditTimer";
import ExecuteTimer from "./pages/ExecuteTimer";
import { HOME_ROUTE, EDIT_ROUTE, EXECUTE_ROUTE } from "./utils/constants";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { graphQLserverUri } from "./utils/constants";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const client = new ApolloClient({
  uri: graphQLserverUri,
});

const App: React.FC = () => {


  return (
    <ApolloProvider client={client}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path={HOME_ROUTE} component={Home} exact={true} />
            <Route
              path={EDIT_ROUTE + ":id"}
              component={EditTimer}
              exact={true}
            />
            <Route path={EXECUTE_ROUTE + ":id"} component={ExecuteTimer} />
            <Route
              path="/"
              render={() => <Redirect to={HOME_ROUTE} />}
              exact={true}
            />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </ApolloProvider>
  );
};

export default App;
