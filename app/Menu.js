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
  Text
} from "native-base";
import {
  Image,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Share,
  AsyncStorage,
  Platform,
  NativeModules,
  Linking
} from "react-native";
import { unzip } from "react-native-zip-archive";
import * as Progress from "react-native-progress";
import { setPackage } from "./assets/schema/Schema";
import Routes from "./assets/constants/Routes";

const win = Dimensions.get("window");
var RNFS = require("react-native-fs");
const isIos =
  Platform.OS == "ios"
    ? RNFS.MainBundlePath
    : RNFS.ExternalStorageDirectoryPath;
const stat = Platform.OS == "ios" ? RNFS.MainBundlePath : "/storage/emulated/0";

export default class Menu extends Component {
  state = {
    showProgress: false
  };

  async downloadFullPackage() {
    const item = await AsyncStorage.getItem("fullpackge");
    if (item !== null) {
      this.props.navigation.navigate("downloads");
    } else {
      RNFS.mkdir(isIos + "/prophet_app")
        .then(val => {
          RNFS.downloadFile({
            fromUrl: "https://www.kaiangroup.com/API/allvalues.zip",
            toFile: isIos + "/prophet_app/allvalues.zip",
            //fromUrl: 'http://nabtatok.com/allvalues.zip',
            //toFile: isIos + '/prophet_app/values.zip',

            begin: res => {
              this.setState({ showProgress: true });
              //alert(JSON.stringify(res))
              alert("قد يستغرق ذلك اكثر من دقيقة الرجاء الانتظار");
            }
          })
            .promise.then(val => {
              // alert(JSON.stringify(val))
              //alert('vaaaluee ',val)
              this.unzipFile();
            })
            .catch(err => {
              this.setState({ showProgress: false });
              alert(err);
            });
        })
        .catch(err => {
          alert(err);
        });
    }
  }

  unzipFile() {
    unzip(isIos + "/prophet_app/allvalues.zip", isIos + "/prophet_app/")
      .then(() => {
        this.setState({ showProgress: false });
        alert("تم تنزيل الموسوعة بالكامل");
        RNFS.unlink(stat + "/prophet_app/allvalues.zip")
          .then(val => {
            //alert('vaaaluee ',val)
            this.saveToDatabase();
          })
          .catch(err => {});
      })
      .catch(err => {
        //alert(err);
        alert("من فضلك اسمح للتطبيق بالوصول الى ذاكرة الجهاز");
      });
  }
  async saveToDatabase() {
    AsyncStorage.setItem("fullpackge", "true");
    await setPackage(Routes)
      .then(() => {
        this.props.navigation.navigate("downloads");
      })
      .catch(err => {
        //alert(err);
        alert("من فضلك اسمح للتطبيق بالوصول الى ذاكرة الجهاز");
      });
  }

  projectView() {
    RNFS.mkdir(isIos + "/prophet_app")
      .then(val => {
        RNFS.stat(stat + "/prophet_app/project.pdf")
          .then(val => {
            const filePath =
              Platform.OS == "ios"
                ? RNFS.MainBundlePath
                : "file:///storage/emulated/0";
            const DOCUMENT = filePath + "/prophet_app/project.pdf";
            this.props.navigation.navigate("pdf", {
              title: "رؤية المشروع",
              color: "#278773",
              pdf: DOCUMENT
            });
          })
          .catch(err => {
            RNFS.downloadFile({
              fromUrl: "https://failiem.lv/down.php?i=sypvd2f9",
              toFile: isIos + "/prophet_app/project.pdf"
            })
              .promise.then(val => {
                const filePath =
                  Platform.OS == "ios"
                    ? RNFS.MainBundlePath
                    : "file:///storage/emulated/0";
                const DOCUMENT = filePath + "/prophet_app/project.pdf";
                this.props.navigation.navigate("pdf", {
                  title: "رؤية المشروع",
                  color: "#278773",
                  pdf: DOCUMENT
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
    return (
      <Container>
        <Content style={{ height: win.height }}>
          <Grid style={{ height: win.height }}>
            <Col>
              <Row size={25}>
                <Col>
                  <ImageBackground
                    source={require("./assets/images/menuholder.png")}
                    style={styles.sideLogo}
                  ></ImageBackground>
                  <Row>
                    <Body>
                      <Image source={require("./assets/images/menulogo.png")} />
                    </Body>
                  </Row>
                </Col>
              </Row>
              <Row size={70}>
                <Col>
                  <CardItem
                    button
                    onPress={() => {
                      this.props.navigation.navigate("values");
                    }}
                  >
                    <Col size={90}>
                      <Text style={styles.cardTitle}>الأقسام الرئيسية</Text>
                    </Col>
                    <Col size={10}>
                      <Icon
                        name="ios-home"
                        type="Ionicons"
                        style={styles.cardLogo}
                      />
                    </Col>
                  </CardItem>
                  <CardItem
                    button
                    onPress={() => {
                      this.props.navigation.navigate("favourites");
                    }}
                  >
                    <Col size={90}>
                      <Text style={styles.cardTitle}>قائمة المفضلة </Text>
                    </Col>
                    <Col size={10}>
                      <Icon
                        name="bookmark"
                        type="Ionicons"
                        style={styles.cardLogo}
                      />
                    </Col>
                  </CardItem>
                  <CardItem
                    button
                    onPress={() => {
                      this.props.navigation.navigate("downloads");
                    }}
                  >
                    <Col size={90}>
                      <Text style={styles.cardTitle}>قائمة التحميلات</Text>
                    </Col>
                    <Col size={10}>
                      <Icon
                        name="download"
                        type="Ionicons"
                        style={styles.cardLogo}
                      />
                    </Col>
                  </CardItem>
                  <CardItem
                    button
                    onPress={() => {
                      this.downloadFullPackage();
                    }}
                  >
                    <Col size={15}>
                      {this.state.showProgress && (
                        <Progress.Circle size={20} indeterminate />
                      )}
                    </Col>
                    <Col size={90}>
                      <Text style={styles.cardTitle}>
                        تحميل الموسوعة بالكامل
                      </Text>
                    </Col>
                    <Col size={10}>
                      <Icon
                        name="cloud-download"
                        type="Ionicons"
                        style={styles.cardLogo}
                      />
                    </Col>
                  </CardItem>
                  <CardItem
                    button
                    onPress={() => {
                      Share.share(
                        {
                          message:
                            "يمكنك تحميل تطبيق القيم النبوية الشريفة من خلال متجر جوجل بلاي واب ستور ",
                          url: "https://itunes.apple.com",
                          title: "حمل تطبيق القيم النبوية"
                        },
                        {
                          // Android only:
                          dialogTitle: "Share via",
                          // iOS only:
                          excludedActivityTypes: [
                            "com.apple.UIKit.activity.PostToTwitter",
                            "com.apple.UIKit.activity.PostToFacebook",
                            "com.apple.UIKit.activity.PostToSlack",
                            "net.whatsapp.WhatsApp.ShareExtension",
                            "com.apple.UIKit.activity.Mail"
                          ]
                        }
                      );
                    }}
                  >
                    <Col size={90}>
                      <Text style={styles.cardTitle}>دعوة أصدقاءك</Text>
                    </Col>
                    <Col size={10}>
                      <Icon
                        name="add"
                        type="Ionicons"
                        style={styles.cardLogo}
                      />
                    </Col>
                  </CardItem>
                  <CardItem
                    button
                    onPress={() => {
                      this.props.navigation.navigate("contact");
                    }}
                  >
                    <Col size={90}>
                      <Text style={styles.cardTitle}>تواصل معنا</Text>
                    </Col>
                    <Col size={10}>
                      <Icon
                        name="mail"
                        type="Ionicons"
                        style={styles.cardLogo}
                      />
                    </Col>
                  </CardItem>
                  <CardItem
                    button
                    onPress={() => {
                      this.props.navigation.navigate("about");
                    }}
                  >
                    <Col size={90}>
                      <Text style={styles.cardTitle}>من نحن</Text>
                    </Col>
                    <Col size={10}>
                      <Icon
                        name="information-circle"
                        type="Ionicons"
                        style={styles.cardLogo}
                      />
                    </Col>
                  </CardItem>
                  <CardItem
                    button
                    onPress={() => {
                      this.projectView();
                    }}
                  >
                    <Col size={90}>
                      <Text style={styles.cardTitle}>رؤية المشروع</Text>
                    </Col>
                    <Col size={10}>
                      <Icon
                        name="eye"
                        type="Ionicons"
                        style={styles.cardLogo}
                      />
                    </Col>
                  </CardItem>
                </Col>
              </Row>
              <Row size={5}>
                <Col>
                  <Row style={styles.iconsBox}>
                    <Icon
                      name="instagram"
                      type="FontAwesome"
                      style={{ color: "#E09B3D", fontSize: 28 }}
                      onPress={() => {
                        Linking.canOpenURL(
                          "https://www.instagram.com/propheticvalue"
                        ).then(supported => {
                          if (supported) {
                            Linking.openURL(
                              "https://www.instagram.com/propheticvalue"
                            );
                          } else {
                            console.log("Don't know how to open URI: ");
                          }
                        });
                      }}
                    />
                    <Icon
                      name="twitter"
                      type="FontAwesome"
                      style={{ color: "#76A9EA", fontSize: 28 }}
                      onPress={() => {
                        Linking.canOpenURL(
                          "https://twitter.com/PropheticValue"
                        ).then(supported => {
                          if (supported) {
                            Linking.openURL(
                              "https://twitter.com/PropheticValue"
                            );
                          } else {
                            console.log("Don't know how to open URI: ");
                          }
                        });
                      }}
                    />
                    <Icon
                      name="facebook"
                      type="FontAwesome"
                      style={{ color: "#385C8E", fontSize: 28 }}
                      onPress={() => {
                        Linking.canOpenURL(
                          "https://www.facebook.com/PropheticValue"
                        ).then(supported => {
                          if (supported) {
                            Linking.openURL(
                              "https://www.facebook.com/PropheticValue"
                            );
                          } else {
                            console.log("Don't know how to open URI: ");
                          }
                        });
                      }}
                    />
                    <Icon
                      name="youtube"
                      type="FontAwesome"
                      style={{ color: "#F83F37", fontSize: 28 }}
                      onPress={() => {
                        Linking.canOpenURL(
                          "https://www.youtube.com/channel/UCa0IVFVa0mYI-EcZFROkyfg?view_as=subscriber"
                        ).then(supported => {
                          if (supported) {
                            Linking.openURL(
                              "https://www.youtube.com/channel/UCa0IVFVa0mYI-EcZFROkyfg?view_as=subscriber"
                            );
                          } else {
                            console.log("Don't know how to open URI: ");
                          }
                        });
                      }}
                    />
                  </Row>
                </Col>
              </Row>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  sideLogo: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.1
  },
  cardTitle: {
    fontFamily: "Cairo-Regular",
    fontSize: 14,
    marginRight: 25,
    textAlign: "right"
  },
  cardLogo: {
    fontSize: 28
  },
  iconsBox: {
    justifyContent: "space-between",
    marginRight: 20,
    marginLeft: 20
  }
});
