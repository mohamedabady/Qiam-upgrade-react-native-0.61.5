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
  Thumbnail,
  Root,
  Toast
} from "native-base";
import {
  StatusBar,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Platform,
  Modal
} from "react-native";
import * as Progress from "react-native-progress";
import { setDownload } from "../assets/schema/Schema";
import Async from "react-promise";
import { deviceDimensions } from "../utils/device-helper";

const win = Dimensions.get("window");
var RNFS = require("react-native-fs");

const isIos =
  Platform.OS == "ios"
    ? RNFS.MainBundlePath
    : RNFS.ExternalStorageDirectoryPath;
const stat = Platform.OS == "ios" ? RNFS.MainBundlePath : "/storage/emulated/0";
const filePath =
  Platform.OS == "ios" ? RNFS.MainBundlePath : "file:///storage/emulated/0";

const { deviceHeight } = deviceDimensions;
export default class Value extends Component {
  state = {
    showProgress: false,
    downloads: []
  };
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("values").title,
    headerTitleStyle: {
      fontFamily: "Cairo-Regular",
      fontSize: Platform.OS == "ios" ? 14 : 16,
      color: "#fff",
      flex: 1,
      textAlign: "center"
    },
    headerStyle: {
      backgroundColor: navigation.getParam("values").color
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

  componentDidMount() {
    this.setState({ downloads: this.props.navigation.getParam("downloads") });
  }
  saveFileToDevice(value, index) {
    const download = {
      id: Math.floor(Math.random() * 1000),
      name: value.title,
      file: value.title + "" + index + ".pdf"
    };
    RNFS.mkdir(isIos + "/prophet_app")
      .then(val => {
        RNFS.stat(stat + "/prophet_app/" + value.title + "" + index + ".pdf")
          .then(val => {
            this.saveToDownloads(download);
          })
          .catch(err => {
            RNFS.downloadFile({
              fromUrl: value.file,
              toFile:
                isIos + "/prophet_app/" + value.title + "" + index + ".pdf",
              begin: res => {
                this.setState({ showProgress: true });
              }
            })
              .promise.then(val => {
                this.setState({ showProgress: false });
                this.saveToDownloads(download);
              })
              .catch(err => {
                alert(err);
              });
          });
      })
      .catch(err => {
        alert(err);
      });
  }
  async saveToDownloads(download) {
    const DOCUMENT = filePath + "/prophet_app/" + download.file;
    await setDownload(download)
      .then(() => {
        // alert("Document 1  " + DOCUMENT);
        this.props.navigation.navigate("pdf", {
          title: download.name,
          color: this.props.navigation.getParam("values").color,

          pdf: DOCUMENT
        });
      })
      .catch(err => {
        // alert("Document 2  " + DOCUMENT);

        if (err.exists)
          this.props.navigation.navigate("pdf", {
            title: download.name,
            color: this.props.navigation.getParam("values").color,
            pdf: DOCUMENT
          });
        else alert(err);
      });
  }

  onDownloadIcon(value) {
    const download = {
      id: Math.floor(Math.random() * 1000),
      name: value.title,
      file: value.title + ".pdf"
    };
    RNFS.mkdir(isIos + "/prophet_app")
      .then(val => {
        RNFS.stat(stat + "/prophet_app/" + value.title + ".pdf")
          .then(val => {
            Toast.show({
              text: "هذة القيمة محمله مسبقا",
              position: "bottom",
              type: "warning",
              duration: 2000,
              textStyle: { textAlign: "right" }
            });
          })
          .catch(err => {
            RNFS.downloadFile({
              fromUrl: value.file,
              toFile: isIos + "/prophet_app/" + value.title + ".pdf",
              begin: res => {
                this.setState({ showProgress: true });
              }
            })
              .promise.then(val => {
                const downloads = [...this.state.downloads, download];
                this.setState({ showProgress: false, downloads });
                setDownload(download)
                  .then(() => {
                    Toast.show({
                      text: "تم تحميل القيمة",
                      position: "bottom",
                      type: "success",
                      duration: 2000,
                      textStyle: { textAlign: "right" }
                    });
                  })
                  .catch(err => {
                    alert(err);
                  });
              })
              .catch(err => {
                alert(err);
              });
          });
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    const object = this.props.navigation.getParam("values");
    //alert(object.title);
    return (
      <Root>
        <Container>
          {Platform.OS === "android" && (
            <StatusBar backgroundColor={object.color} />
          )}

          {this.state.showProgress && (
            // <View
            //   style={{
            //     //flexDirection: "row",
            //     justifyContent: "center",
            //     alignItems: "center",
            //     flex: 1,
            //     //marginBottom: 10,
            //     marginTop: win.height * 0.3,
            //     marginLeft: win.width * 0.25,
            //     // backgroundColor:'red',
            //     //marginTop: deviceHeight * 0.3,
            //     //marginLeft: "20%",
            //     position: "absolute"
            //   }}
            // >
            //   <Progress.Circle
            //     size={25}
            //     indeterminate /*  style={{position:'absolute',top:110}} */
            //   />
            //   <Text
            //     style={{
            //       justifyContent: "center",
            //       alignItems: "center",
            //       color: "white",
            //       fontWeight: "900",
            //       fontSize: 22 /* ,position:'absolute',top:20 */,
            //       zIndex: 2
            //     }}
            //   >
            //     من فضلك انتظر
            //   </Text>
            //   <Text
            //     style={{
            //       justifyContent: "center",
            //       alignItems: "center",
            //       color: "white",
            //       fontWeight: "900",
            //       fontSize: 22 /* ,position:'absolute',top:30 */,
            //       zIndex: 2
            //     }}
            //   >
            //     يتم تحميل الملف ...
            //   </Text>
            // </View>

            <Modal
              visible={true}
              transparent
              animationType="slide"
              onRequestClose={() => {}}
            >
              <View
                style={{
                  backgroundColor: "rgba(0,0,0,0.5)",
                  position: "relative",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Progress.Circle
                  size={25}
                  indeterminate /*  style={{position:'absolute',top:110}} */
                />
                <Text
                  style={{
                    // justifyContent: "center",
                    // alignItems: "center",
                    marginTop: 15,
                    color: "white",
                    fontWeight: "900",
                    fontSize: 22
                    // zIndex: 2
                  }}
                >
                  من فضلك انتظر
                </Text>
                <Text
                  style={{
                    // justifyContent: "center",
                    // alignItems: "center",
                    color: "white",
                    fontWeight: "900",
                    fontSize: 22
                    //position:'absolute',top:30 */,
                    // zIndex: 2
                  }}
                >
                  يتم تحميل الملف ...
                </Text>
              </View>
            </Modal>
          )}
          <Content style={{ height: win.height }}>
            <ImageBackground
              source={require("../assets/images/placeholder.png")}
              style={styles.placeholder}
            ></ImageBackground>
            <Grid style={styles.container}>
              <Col>
                {object.values.map((value, index) => {
                  let downloaded = this.state.downloads.find(
                    val => val.name == value.title
                  );
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
                              { backgroundColor: object.color }
                            ]}
                            onPress={() =>
                              this.saveFileToDevice(value, object.id)
                            }
                          >
                            <Col size={15}>
                              {/* this.state.downloads[index].name == value.title ? 
                              
                              :*/
                              downloaded ? (
                                <Icon
                                  type="Ionicons"
                                  name="clipboard"
                                  style={{ fontSize: 30, color: "#fff" }}
                                  onPress={() => this.saveFileToDevice(value)}
                                />
                              ) : (
                                <Icon
                                  type="Ionicons"
                                  name="download"
                                  style={{ fontSize: 30, color: "#fff" }}
                                  onPress={() => this.onDownloadIcon(value)}
                                />
                              )}
                            </Col>
                            <Col size={65}>
                              {object.title == "المحتوى التدريبي" ? (
                                <View>
                                  <Text style={styles.cardsTitle3}>
                                    المحتوى التدريبي
                                  </Text>

                                  <Text style={styles.cardsTitle2}>
                                    {value.title}
                                  </Text>
                                </View>
                              ) : (
                                <Text style={styles.cardsTitle}>
                                  {value.title}
                                </Text>
                              )}
                              {/* <Text style={styles.cardsTitle}>
                                {value.title}
                              </Text> */}
                            </Col>
                            <Col size={20}>
                              <Thumbnail source={object.logo} square />
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
      </Root>
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
  },
  cardsTitle2: {
    //flexDirection: "column",
    color: "#fff",
    fontFamily: "Cairo-Regular",
    fontSize: 14,
    marginRight: 35,
    textAlign: "right"
  },
  cardsTitle3: {
    //flexDirection: "column",
    color: "#fff",
    fontFamily: "Cairo-Regular",
    fontSize: 16,
    marginRight: 35,
    textAlign: "right"
  }
});
