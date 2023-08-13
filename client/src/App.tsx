import React from "react";

import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";

import{
  AccountCircleOutlined,
  PeopleAltOutlined,
  Restaurant
} from '@mui/icons-material';

import InfoIcon from '@mui/icons-material/Info';

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import { ColorModeContextProvider } from "contexts";
import { Title, Sider, Layout, Header } from "components/layout";


import { 
  Login,
  Home,
  AllRestaurants,
  CreateRestaurant,
  EditRestaurant

} from "pages";



function App() {

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider("http://localhost:8080/api/v1")}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "restaurants",
              options:{ label: 'Restaurants' },
              list:AllRestaurants,
              create:CreateRestaurant,
              edit:EditRestaurant,
              icon: <Restaurant></Restaurant>
            },
            {
              name: "agents",
              
              icon: <PeopleAltOutlined></PeopleAltOutlined>
            },
            {
              name: "about-us",
              options:{ label: 'About Us' },
              
              icon: <InfoIcon></InfoIcon>
            },
            {
              name: "my-profile",
              options:{ label: 'My profile'},
              
              icon: <AccountCircleOutlined></AccountCircleOutlined>
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          routerProvider={routerProvider}
         
          LoginPage={Login}
          DashboardPage={Home}
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
