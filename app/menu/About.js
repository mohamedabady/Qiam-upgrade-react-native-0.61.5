import React, { Component } from 'react';
import {
    Container,
    Content,
    Grid,
    Row,
    Col,
    Icon,
    Body,
    Button,
    Text,
    Linking
  } from 'native-base';
import { StatusBar, ImageBackground, StyleSheet, Image, Platform } from 'react-native';

  
export default class About extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "عن الشركة",
        headerTitleStyle : {
            fontFamily: 'Cairo-Regular',
            fontSize: 16,
            color: '#fff',
            flex: 1,
            textAlign: 'right'
        },
        headerStyle : {
            backgroundColor: "#278773",
        },
        headerRight: (
            <Grid>
            <Row>
                <Body>
                    <Button transparent icon onPress = {() => {
                        navigation.openDrawer();
                    }}>
                        <Icon name = 'ios-menu' type = 'Ionicons' style = {{fontSize: 25, color: '#fff'}} />
                    </Button>
                </Body>
            </Row>
            </Grid>
        ),
        headerLeft: (
            <Grid>
            <Row>
                <Body>
                    <Button transparent icon onPress = {() => {
                        navigation.pop()
                    }}>
                        <Icon name = 'arrow-round-back' type = 'Ionicons' style = {{fontSize: Platform.OS == 'ios' ? 30 : 25, color: '#fff'}} />
                    </Button>
                </Body>
            </Row>
            </Grid>
        ),
      
  });
  render() {
    return (
      <Container>
          {
          Platform.OS === 'android' && 
          <StatusBar backgroundColor = "#278773" />
          }
          <Content>
              <ImageBackground source = {require('../assets/images/placeholder.png')} style = {[styles.placeholder, {opacity: 0.01}]}></ImageBackground>
              <Grid style = {{ margin: 20}}>
                  <Col>
                    <Row size = {25} style = {{justifyContent: 'center', marginBottom: 15,}}>
                        <Image source = {require('../assets/images/aboutlogo1.png')} />
                    </Row>
                    <Row size = {20} style = {{marginBottom: 25}}>
                        <Col>
                            <Text style = {{backgroundColor: '#335592', color: '#fff', padding: 15, textAlign: 'center', fontFamily: 'Cairo-Regular', fontSize: 14}}>معلومات عن الشركة</Text>
                            <Text style = {{color: '#002323', fontFamily: 'Cairo-Regular', fontSize: 12, marginTop: 15}}>
                            ‏مشروع تعزيز القيم النبوية في المجتمع يهدف إلى التعريف بالقيم النبوية وتعزيز تطبيقها وتمكينها في المجتمع وفق المرجعية التنظيمية و التقويمية في كرسي الشيخ عبدالله الراشد لخدمة السيرة النبوية و الرسول  ﷺ بجامعة القصيم، وذلك بالشراكة مع مؤسسات المجتمع المحلي و الجهات ذات العلاقة .
                            </Text>
                        </Col>
                    </Row>
                    <Row size = {5} style = {{marginBottom: 10}}>
                        <Col>
                            <Row>
                                <Icon  style = {{color: '#278773', fontSize: 24, paddingRight: 10}} name = 'email-open-outline' type = 'MaterialCommunityIcons' />
                                <Text style = {{color: '#2E9BD2', fontFamily: 'Cairo-Regular', fontSize: 14}} >tazizqeiam@gmail.com</Text>
                            </Row>
                        </Col>
                        <Col>
                            <Row style = {{justifyContent: 'center'}}>
                                <Icon style = {{color: '#278773', fontSize: 24, paddingRight: 10}} name = 'phone-in-talk' type = 'MaterialCommunityIcons' />
                                <Text style = {{color: '#2E9BD2', fontFamily: 'Cairo-Regular', fontSize: 14}}>‭0550535682</Text>
                            </Row>
                        </Col>
                    </Row>
                    <Row size = {25} style = {{justifyContent: 'center', marginBottom: 15}}>
                        <Image source = {require('../assets/images/aboutlogo2.png')} />
                    </Row>
                    <Row size = {10} style = {{}}>
                        <Col>
                            <Text style = {{backgroundColor: '#335592', color: '#fff', padding: 15, textAlign: 'center', fontFamily: 'Cairo-Regular', fontSize: 14}}>برمجة وتطوير</Text>
                            <Text style = {{color: '#002323', fontFamily: 'Cairo-Regular', fontSize: 12, marginTop: 15}}>
                            تطوير وبرمجة مؤسسة كيان التقني لتفنية المعلومات 
                            </Text>
                        </Col>
                    </Row>
                    <Row size = {5} style = {{marginTop: 20}}>
                        <Col>
                            <Row>
                                <Icon  style = {{color: '#278773', fontSize: 24, paddingRight: 10}} name = 'email-open-outline' type = 'MaterialCommunityIcons' />
                                <Text style = {{color: '#2E9BD2', fontFamily: 'Cairo-Regular', fontSize: 14}} >http://kaiangroup.com</Text>
                            </Row>
                        </Col>
                        <Col>
                            <Row style = {{justifyContent: 'center'}}>
                                <Icon style = {{color: '#278773', fontSize: 24, paddingRight: 10}} name = 'phone-in-talk' type = 'MaterialCommunityIcons' />
                                <Text style = {{color: '#2E9BD2', fontFamily: 'Cairo-Regular', fontSize: 14}}>‭+966533323416‬</Text>
                            </Row>
                        </Col>
                    </Row>
                    <Row size = {5} style = {{marginTop: 10}}>
                        <Col>
                            <Row>
                                <Icon style = {{color: '#278773', fontSize: 24, paddingRight: 10}} name = 'email-open-outline' type = 'MaterialCommunityIcons' />
                                <Text style = {{color: '#2E9BD2', fontFamily: 'Cairo-Regular', fontSize: 14}}>Hi@kaiangroup.com</Text>
                            </Row>
                        </Col>
                        <Col>
                            <Row style = {{justifyContent: 'center'}}>
                                <Icon style = {{color: '#278773', fontSize: 24, paddingRight: 10}} name = 'phone-in-talk' type = 'MaterialCommunityIcons' />
                                <Text style = {{color: '#2E9BD2', fontFamily: 'Cairo-Regular', fontSize: 14}}>00966568043150</Text>
                            </Row>
                        </Col>
                    </Row>
                    <Row size = {5} style = {{marginTop: 10}}>
                        <Col style = {{alignItems: 'center'}}>
                            <Text style = {{color: '#000304', fontFamily: 'Cairo-Regular', fontSize: 16}}>@officialkaian</Text>
                        </Col>
                        <Col>
                            <Row style = {{justifyContent: 'center'}}>
                            <Icon name = 'instagram' type = 'FontAwesome' style = {{color: '#E09B3D', fontSize: 28, paddingRight: 15}} />
                                <Icon name = 'twitter' type = 'FontAwesome' style = {{color: '#76A9EA', fontSize: 28, paddingRight: 15}} />
                                <Icon name = 'facebook' type = 'FontAwesome' style = {{color: '#385C8E', fontSize: 28, paddingRight: 15}}  />
                                <Icon name = 'linkedin' type = 'FontAwesome' style = {{color: '#0077B7', fontSize: 28}}/>
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
    placeholder: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    }
});