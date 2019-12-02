import React, { Component } from "react";
import {
  Container,
  Grid,
  Row,
  Icon,
  Body,
  Button,
  Root,
  Toast
} from "native-base";
import { StatusBar, Platform, AsyncStorage, Linking } from "react-native";
import ActionSheetManager, {
  ActionSheet,
  ActionSheetItem
} from "react-native-action-sheet-component";
import Pdf from "react-native-pdf";
import NavigationService from "../Service";
import Share from "react-native-share";
import { setFavourite } from "../assets/schema/Schema";

const actionSheetItems = [
  <ActionSheetItem
    key="item-1"
    text="المشاركة عبر "
    value="share"
    icon={
      <Icon
        name="share"
        type="Ionicons"
        style={{ fontSize: 25, marginLeft: 15 }}
      />
    }
    style={{ justifyContent: "flex-end" }}
    onPress={async () => {
      let path = await AsyncStorage.getItem("path");
      const shareOptions = {
        title: "Share via",
        url: path,
        type: "application/pdf"
      };
      ActionSheetManager.hide();
      Share.open(shareOptions);
    }}
  />,
  <ActionSheetItem
    key="item-1"
    text="كتابة ملاحظات"
    value="download"
    icon={
      <Icon
        name="star"
        type="Ionicons"
        style={{ fontSize: 25, marginLeft: 15 }}
      />
    }
    style={{ justifyContent: "flex-end" }}
    onPress={() => NavigationService.navigate("notes")}
  />,
  <ActionSheetItem
    key="item-1"
    text="عرض ونسخ"
    value="book"
    icon={
      <Icon
        name="book"
        type="Ionicons"
        style={{ fontSize: 25, marginLeft: 15 }}
      />
    }
    style={{ justifyContent: "flex-end" }}
    onPress={async () => {
      let path = await AsyncStorage.getItem("path");
      Linking.openURL(path);
    }}
  />,
  <ActionSheetItem
    key="item-1"
    text="حفظ في المفضلة"
    value="bookmark"
    icon={
      <Icon
        name="bookmark"
        type="Ionicons"
        style={{ fontSize: 25, marginLeft: 15 }}
      />
    }
    style={{ justifyContent: "flex-end" }}
    onPress={async () => {
      let title = await AsyncStorage.getItem("subject");
      let mypdf = await AsyncStorage.getItem("path");
      const favourite = {
        id: Math.floor(Math.random() * 1000),
        name: title,
        file: mypdf
      };
      await setFavourite(favourite)
        .then(() => {
          alert("تم الاضافة الى المفضلات");
        })
        .catch(err => {
          if (err.exists) alert("هذة القيمة مضافة مسبقاً");
          else alert(err);
        });
    }}
  />
];
const options = {
  defaultValue: ["github"],
  children: actionSheetItems,
  showSparator: false,
  showSelectedIcon: false,
  onChange: (value, index, selectedData) => {}
};

export default class ValueView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title"),
    headerTitleStyle: {
      fontFamily: "Cairo-Regular",
      fontSize: Platform.OS == "ios" ? 16 : 18,
      color: "#fff",
      flex: 1,
      textAlign: "center"
    },
    headerStyle: {
      backgroundColor: navigation.getParam("color")
    },
    headerRight: (
      <Grid>
        <Row>
          <Body>
            <Button
              transparent
              icon
              onPress={() => {
                navigation.openDrawer();
              }}
            >
              <Icon
                name="ios-menu"
                type="Ionicons"
                style={{ fontSize: 25, color: "#fff" }}
              />
            </Button>
          </Body>
          {!navigation.getParam("title").includes("رؤية المشروع") && (
            <Body>
              <Button
                transparent
                icon
                onPress={() => {
                  ActionSheetManager.show(options, () => {
                    console.log("callback");
                  });
                }}
              >
                <Icon
                  name="more"
                  type="Ionicons"
                  style={{ fontSize: 25, color: "#fff" }}
                />
              </Button>
            </Body>
          )}
        </Row>
      </Grid>
    ),
    headerLeft: (
      <Grid>
        <Row>
          <Body>
            <Button
              transparent
              icon
              onPress={() => {
                navigation.pop();
              }}
            >
              <Icon
                name="arrow-round-back"
                type="Ionicons"
                style={{
                  fontSize: Platform.OS == "ios" ? 30 : 25,
                  color: "#fff"
                }}
              />
            </Button>
          </Body>
          <Body>
            <Button
              transparent
              icon
              onPress={() => {
                navigation.navigate("search");
              }}
            >
              <Icon
                name="search"
                type="Ionicons"
                style={{
                  fontSize: Platform.OS == "ios" ? 30 : 25,
                  color: "#fff"
                }}
              />
            </Button>
          </Body>
        </Row>
      </Grid>
    )
  });

  render() {
    const color = this.props.navigation.getParam("color");
    const title = this.props.navigation.getParam("title");
    const mypdf = this.props.navigation.getParam("pdf");
    return (
      <Root>
        <Container>
          {Platform.OS === "android" && <StatusBar backgroundColor={color} />}
          {
            <Pdf
              source={{ uri: this.props.navigation.getParam("pdf") }}
              fitPolicy={0}
              onLoadComplete={async () => {
              //  alert("title" + mypdf);
                const sub = await AsyncStorage.getItem("subject");
                const pdf = await AsyncStorage.getItem("path");
                if (sub === null && pdf === null) {
                  AsyncStorage.setItem("subject", title);
                  AsyncStorage.setItem(
                    "path",
                    this.props.navigation.getParam("pdf")
                  );
                } else {
                  AsyncStorage.removeItem("subject");
                  AsyncStorage.removeItem("path");
                  AsyncStorage.setItem("subject", title);
                  AsyncStorage.setItem(
                    "path",
                    this.props.navigation.getParam("pdf")
                  );
                }
              }}
              onError={() => {
                alert("لم نستطع تحميل الملف الرجاء إعادة المحاولة");
              }}
              style={{ flex: 1 }}
            />
          }
        </Container>
      </Root>
    );
  }
}
