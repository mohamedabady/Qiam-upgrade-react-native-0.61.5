import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  StatusBar,
  Platform
} from "react-native";
import {
  Container,
  Content,
  Grid,
  Row,
  Col,
  Text,
  Body,
  View
} from "native-base";

const win = Dimensions.get("window");

export default class Splash extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("app");
    }, 5000);
  }

  render() {
    console.disableYellowBox = true;
    return (
      <View style={{ flex: 1 }}>
        {Platform.OS === "android" && <StatusBar backgroundColor="#278773" />}
        <Image
          source={require("./assets/images/splash.jpg")}
          style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
        />
      </View>
    );

   /*  return (
      <Container>
        {Platform.OS === "android" && <StatusBar backgroundColor="#278773" />}
        <Content>
          <Grid>
            <Col>
              <Row size={25} style={styles.row1}>
                <Col style={{ alignItems: "center", paddingTop: 20 }}>
                  <Image source={require("./assets/images/logo1.png")} />
                </Col>
                <Col style={{ alignItems: "center" }}>
                  <Image
                    source={require("./assets/images/logo2.png")}
                    style={{ width: 120, height: 120 }}
                  />
                </Col>
              </Row>
              <Row size={60}>
                <Col style={{ alignItems: "center" }}>
                  <Image source={require("./assets/images/logo.png")} />
                  <Text style={[styles.text, { paddingTop: 15 }]}>
                    جامعة القصيم
                  </Text>
                  <Text style={[styles.text, { paddingTop: 15 }]}>
                    كرسي الشيخ عبدالله الصالح الراشد لخدمة السيرة والرسول ﷺ
                  </Text>
                  <Text style={[styles.text, { paddingTop: 15 }]}>
                    تعزيز القيم النبوية فى المجتمع مشروع علمي وتطبيق عملي{" "}
                  </Text>
                  <Text style={[styles.text, { paddingTop: 15 }]}>
                    برعاية الشيخ عبدالله الصالح الراشد
                  </Text>
                  <Text style={[styles.text, { paddingTop: 15 }]}>
                    المشرف العام
                  </Text>
                  <Text style={[styles.text, { paddingTop: 15 }]}>
                    أ.د. خالد بن عبدالعزيز الشريدة
                  </Text>
                  <Text style={[styles.text, { paddingTop: 10 }]}>
                    القصيم، بريدة
                  </Text>
                </Col>
              </Row>
              <Row size={10}>
                <Col
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: "Cairo-Regular",
                      color: "#000000",
                      paddingLeft: 10
                    }}
                  >
                    تصميم وتطوير
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: "Cairo-Regular",
                        color: "#2E9BD2"
                      }}
                    >
                      {" "}
                      كيان تك
                    </Text>
                  </Text>
                </Col>
              </Row>
            </Col>
          </Grid>
        </Content>
      </Container>
    ); */
  }
}

const styles = StyleSheet.create({
  row1: {
    paddingTop: 30
  },
  text: {
    fontSize: 16,
    fontFamily: "Cairo-Regular",
    color: "#278773",
    textAlign: "center"
  }
});
