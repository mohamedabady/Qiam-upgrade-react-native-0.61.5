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
    Item,
    Input,
    Text,
    Textarea,
    Form
} from 'native-base';
import { StatusBar, ImageBackground, StyleSheet, Platform, Dimensions, Linking, Alert } from 'react-native';
import Mailer from 'react-native-mail';
const win = Dimensions.get('window');

export default class Contact extends Component {
    state = {
        name: '',
        email: '',
        message: ''
        
    }
  static navigationOptions = ({navigation}) => ({
    title: "تواصل معنا",
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

  sendEmail() {
    if(this.state.name== ''){
        this.setState({namerequired: true});
        return;
      }
          
      if(this.state.email== ''){
        this.setState({emailrequired: true});
        return;
      }

    if(this.state.message== ''){
      this.setState({messagerequired: true});
      return;
    }
    Mailer.mail({
        subject: 'تطبيق القيم النبوية',
        recipients: ['tazizqeiam@gmail.com'],
        body: '<h3>مستخدم</h3><p>'+this.state.name+'</p><br><br><p><b>'+this.state.message+'</b></p>',
        isHTML: true,
        }, (error, event) => {
        Alert.alert(
            error,
            event,
            [
            {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
            {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
            ],
            { cancelable: true }
        )
        });
    
  }
  render() {
    return (
      <Container>
          {
          Platform.OS === 'android' && 
          <StatusBar backgroundColor = "#278773" />
          }
          <Content >
            <ImageBackground source = {require('../assets/images/placeholder.png')} style = {[styles.placeholder, {opacity: 0.007}]}></ImageBackground>
              <Grid style = {{ margin: 20, minHeight: win.height}}>
                <Col>
                    <Item regular style = {{marginBottom: 25}} error = {this.state.namerequired}>
                        <Input placeholder = "الاسم" style = {styles.search} onChangeText = {(name) => this.setState({name})} />
                    </Item>
                    <Item regular style = {{marginBottom: 25}} error = {this.state.emailrequired}>
                        <Input placeholder = "البريد الإلكتروني" style = {styles.search} onChangeText = {(email) => this.setState({email})}/>
                    </Item>
                    <Form style = {{marginBottom: 25}} error = {this.state.messagerequired}>
                        <Textarea rowSpan={5} bordered placeholder="الرسالة" style = {[styles.search, {marginRight: 0, paddingRight: 20}]} onChangeText = {(message) => this.setState({message})} />
                    </Form>
                    <Button block style = {{backgroundColor: '#278773'}} onPress = {() => {
                        this.sendEmail();
                    }}>
                        <Text style = {styles.searchBtn}>إرسال</Text>
                    </Button>
                    <Button block style = {{backgroundColor: '#278773', marginTop: 20}} onPress = {() => {
                        const url = Platform.OS == 'ios' ? 'telprompt:00966550535682': 'tel:00966550535682';
                        Linking.canOpenURL(url).then(supported => {
                            if (supported) {
                            Linking.openURL(url);
                            } else {
                            console.log("Don't know how to open URI: " );
                            }
                        });
                    }}>
                        <Text style = {styles.searchBtn}>اتصال</Text>
                    </Button>
                </Col>
              </Grid>
          </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    search: {
        fontFamily: 'Cairo-Regular',
        fontSize: 14,
        color: '#6B6D6D',
        textAlign: 'right',
        marginRight: 15,
    },
    searchBtn: {
        fontFamily: 'Cairo-Regular',
        fontSize: 18
    },
    placeholder: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    }
});