import React, { Component } from "react";
import {
  Container,
  Content,
  Grid,
  Row,
  Col,
  Icon,
  CardItem,
  Body,
  Button,
  Text,
  View,
  Thumbnail
} from "native-base";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  StatusBar,
  Modal
} from "react-native";
import Routes from "../assets/constants/Routes";
import { getAllDownloads } from "../assets/schema/Schema";
import * as Progress from "react-native-progress";
import { deviceDimensions } from "../utils/device-helper";
const win = Dimensions.get("window");
const { deviceHeight } = deviceDimensions;
export default class Values extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "مسارات موسوعة القيم النبوية ",
    headerTitleStyle: {
      fontFamily: "Cairo-Regular",
      fontSize: Platform.OS == "ios" ? 14 : 16,
      color: "#fff",
      flex: 1,
      textAlign: "center"
    },
    headerStyle: {
      backgroundColor: "#278773"
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

  componentDidMount() {
    setTimeout(() => {
      this.getPermission();
    }, 2000);
  }

  async getPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
    } catch (err) {
      console.warn(err);
    }
  }
  toValue = async values => {
    let downloads;
    await getAllDownloads().then(values => {
      downloads = values;
    });
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.props.navigation.navigate("value", { values, downloads });
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      this.props.navigation.navigate("value", { values, downloads });
    }
  };
  render() {
    console.disableYellowBox = true;
    return (
      <Container>
        {Platform.OS === "android" && <StatusBar backgroundColor="#278773" />}
        <Content style={{ height: win.height }}>
          <ImageBackground
            source={require("../assets/images/placeholder.png")}
            style={styles.placeholder}
          ></ImageBackground>
          <Grid style={styles.container}>
            <Col>
              {Routes.map((value, index) => {
                return (
                  <Row key={index}>
                    <Col>
                      <View>
                        <ImageBackground
                          source={require("../assets/images/cardholder.png")}
                          style={[styles.placeholder, { opacity: 0.11 }]}
                        ></ImageBackground>
                        <CardItem
                          button
                          style={[
                            styles.cards,
                            { backgroundColor: value.color }
                          ]}
                          onPress={() => this.toValue(value)}
                        >
                          <Col size={80}>
                            <Text style={styles.cardsTitle}>{value.title}</Text>
                          </Col>
                          <Col size={20}>
                            <Thumbnail source={value.logo} square />
                          </Col>
                        </CardItem>
                      </View>
                    </Col>
                  </Row>
                );
              })}
            </Col>
          </Grid>
        </Content>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: win.height,
    margin: 20
  },
  placeholder: {
    width: "100%",
    height: "100%",
    opacity: 0.03,
    position: "absolute"
  },
  cards: {
    height: 77,
    opacity: 0.75,
    borderRadius: 5
  },
  cardsTitle: {
    color: "#fff",
    fontFamily: "Cairo-Regular",
    fontSize: 18,
    marginRight: 35,
    textAlign: "right"
  }
});
