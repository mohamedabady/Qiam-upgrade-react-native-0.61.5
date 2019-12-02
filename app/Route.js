import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";
import Values from "./screens/Values";
import Splash from "./Splash";
import Value from "./screens/Value";
import Pdf from "./screens/ValueView";
import Search from "./screens/Search";
import SearchResult from "./screens/SearchResult";
import Notes from "./screens/Notes";
import Menu from "./Menu";
import Downloads from "./menu/Downloades";
import Favourites from "./menu/Favourites";
import About from "./menu/About";
import Contact from "./menu/Contact";

import NavigationService from "./Service";

const app = createStackNavigator({
  values: { screen: Values },
  value: { screen: Value },
  downloads: { screen: Downloads },
  favourites: { screen: Favourites },
  about: { screen: About },
  contact: { screen: Contact },
  pdf: { screen: Pdf },
  notes: { screen: Notes },
  result: { screen: SearchResult },
  search: { screen: Search }
});

const drawer = createDrawerNavigator(
  {
    menu: { screen: app }
  },
  {
    drawerPosition: "right",
    contentComponent: props => <Menu {...props} />
  }
);

const switcher = createSwitchNavigator({
  board: { screen: Splash },
  app: { screen: drawer }
});

const AppContainer = createAppContainer(switcher);

export default class Route extends React.Component {
  // ...

  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
