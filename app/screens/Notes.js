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
    View,
    Toast,
    Root,
    Textarea,
    Item,
    Form,
    Input
  } from 'native-base';
import { StatusBar, ImageBackground, StyleSheet, Dimensions, Platform, AsyncStorage } from 'react-native';
import { getNote, setNote } from '../assets/schema/Schema';
import Mailer from 'react-native-mail';

const win = Dimensions.get('window');

export default class Notes extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "ملاحظات",
        headerTitleStyle : {
          fontFamily: 'Cairo-Regular',
          fontSize: 16,
          color: '#fff',
          flex: 1,
          textAlign: 'right'
        },
        headerStyle : {
            backgroundColor: '#278773',
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

    state = {
      title: '',
      content: '',
      subject: '',
      name: '',
      phone: '',
      email: '',
      value: '',
      message: ''
    }
    async componentWillMount(){
      const subject = await AsyncStorage.getItem('subject');
      await getNote(subject).then((info) => {
        if(info != null) {
          this.setState({title: info.title, content: info.content});
        }
      }).catch(err => {
        alert(err);
      });

      this.setState({subject});
      
    };

   getHTML = async () => {
    
    const data = {id: Date.now() * 1000, name: this.state.subject, content: this.state.content};

    await setNote(data).then(() => {
      Toast.show({text: 'تم اضافة الملاحظات', position: 'bottom', type: 'success', duration: 2000, textStyle: {textAlign: 'right'}});
    }).catch(err => {
      Toast.show({text: 'لم يتم اضافة الملاحظات', position: 'bottom', type: 'warning', duration: 2000, textStyle: {textAlign: 'right'}});
    })
  }

  sendEmail() {
    if(this.state.name== ''){
      this.setState({namerequired: true});
      return;
    }

    if(this.state.phone== ''){
      this.setState({phonerequired: true});
      return;
    }
        
    if(this.state.email== ''){
      this.setState({emailrequired: true});
      return;
    }
        
    if(this.state.value== ''){
      this.setState({valuerequired: true});
      return;
    }
        
    if(this.state.message== ''){
      this.setState({messagerequired: true});
      return;
    }
        
      this.setState({namerequired: false, messagerequired: false, emailrequired: false, valuerequired: false});
      Mailer.mail({
          subject: 'تطبيق القيم النبوية - تعليقات',
          recipients: ['tazizqeiam@gmail.com'],
          body: '<h3>مستخدم</h3><p>'+this.state.name+'</p><br><br><p>'+this.state.value+'</p><br><br><p><b>'+this.state.message+'</b></p>',
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
      <Root>
        <Container>
            {
            Platform.OS === 'android' && 
            <StatusBar backgroundColor = "#278773" />
            }
            <Content>
              <ImageBackground source = {require('../assets/images/placeholder.png')} style = {[styles.placeholder, {opacity: 0.01}]}></ImageBackground>
                <Grid style = {{margin: 20, minHeight: win.height}}>
                    <Col>
                      <View>
                        <Text style = {{fontFamily: 'Cairo-Regular',fontSize: 17}}>ملاحظات {this.state.subject}</Text>
                        <Textarea rowSpan = {12} placeholder = 'كتابة ملاحظات' value = {this.state.content} onChangeText = {(content) => this.setState({content})} />
                      </View>
                      <Button block style = {{backgroundColor: '#278773', marginTop: 25}} onPress = {this.getHTML}>
                          <Text style = {styles.searchBtn}>حفظ</Text>
                      </Button>
                      <Text style = {{textAlign: 'right', padding: 15, fontFamily: 'Cairo-Regular',fontSize: 16}}>ارسال ملحوظات او تعليقات لإدارة البرنامج</Text>
                      <View style = {{marginTop: 12}}>
                        <Item regular style = {{marginBottom: 25}} error = {this.state.namerequired}>
                          <Input placeholder = "الاسم" style = {styles.search} onChangeText = {(name) => this.setState({name})} />
                        </Item>
                        <Item regular style = {{marginBottom: 25}} error = {this.state.phonerequired}>
                          <Input placeholder = "رقم الجوال" style = {styles.search} onChangeText = {(phone) => this.setState({phone})} />
                        </Item>
                        <Item regular style = {{marginBottom: 25}} error = {this.state.emailrequired}>
                            <Input placeholder = "البريد الإلكتروني" style = {styles.search} onChangeText = {(email) => this.setState({email})}/>
                        </Item>
                        <Item regular style = {{marginBottom: 25}} error = {this.state.valuerequired}>
                            <Input placeholder = "اسم القيمة" style = {styles.search} onChangeText = {(value) => this.setState({value})}/>
                        </Item>
                        <Form style = {{marginBottom: 25}} error = {this.state.messagerequired}>
                            <Textarea rowSpan={5} bordered placeholder="الرسالة" style = {[styles.search, {marginRight: 0, paddingRight: 20}]} onChangeText = {(message) => this.setState({message})} />
                        </Form>
                        <Button block style = {{backgroundColor: '#278773'}} onPress = {() => {
                            this.sendEmail();
                        }}>
                            <Text style = {styles.searchBtn}>إرسال</Text>
                        </Button>
                      </View>
                    </Col>
                </Grid>
            </Content>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
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
