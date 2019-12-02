import React, { Component } from 'react';
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
    Toast,
    Root
  } from 'native-base';
import { StatusBar, ImageBackground, StyleSheet, Dimensions, Platform, NativeModules, AsyncStorage } from 'react-native';
import { getAllDownloads, removeDownload, removeFavourite } from '../assets/schema/Schema';

const win = Dimensions.get('window');
var RNFS = require('react-native-fs');

const stat = Platform.OS == 'ios' ? RNFS.MainBundlePath : '/storage/emulated/0';
const filePath = Platform.OS == 'ios' ? RNFS.MainBundlePath : 'file:///storage/emulated/0';

export default class Downloades extends Component {
  state = {
    downloads: []
  }
    static navigationOptions = ({navigation}) => ({
        title: "قائمة التحميلات",
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
  async componentDidMount() {
      await getAllDownloads().then((data) => {
        //alert(JSON.stringify(data[2]) )
        this.setState({downloads: data});
        if(this.state.downloads.length == 0)
          AsyncStorage.removeItem('fullpackge');
      }).catch(err => {
        alert(err);
      })
    }
  async removeValue(val) {
      RNFS.unlink(stat + '/prophet_app/'+val.file).then((val) => {
        Toast.show({text: 'تم الازالة من التحميلات', position: 'bottom', type: 'success', duration: 2000, textStyle: {textAlign: 'right'}});
      }).catch(err => {
        alert(err);
      });
      await removeDownload(val.id).then((data) => {
        this.setState({downloads: data});
      }).catch(err => {
        alert(err);
      });
    }
  showFile(file, title) {
    const DOCUMENT = filePath+'/prophet_app/'+file;
    //alert(DOCUMENT)
    this.props.navigation.navigate('pdf', {title, color: '#278773', pdf: DOCUMENT});
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
                    <Row>
                        <Col>
                        {
                              
                              this.state.downloads.map((val) => {
                                return (
                                  <View style = {{marginBottom: 20}}>
                                        <ImageBackground source = {require('../assets/images/cardholder.png')} style = {[styles.placeholder, {opacity: 0.11}]} ></ImageBackground>
                                        <CardItem button style = {styles.cards} onPress = {() => {
                                          this.showFile(val.file, val.name);
                                        }}>
                                            <Col size = {60}>
                                                <Icon name="trash" type="Ionicons" style = {styles.cardsIcon} onPress = {() => {
                                                    this.removeValue(val);
                                                }} />
                                            </Col>
                                            <Col size = {40}>
                                                <Text style = {styles.cardsTitle}>{val.name}</Text>
                                            </Col>
                                        </CardItem>
                                    </View>
                                )
                              })
                            
                          }
                        </Col>
                    </Row>
                  </Col>
              </Grid>
          </Content>
      </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
    cards: {
        height: 88, 
        opacity: 0.75, 
        borderRadius: 5,
        backgroundColor: '#39A99B',
    },
    cardsTitle: {
        color: '#fff', 
        fontFamily: 'Cairo-Regular',
        fontSize: 18,
        
    },
    cardsIcon: {
        fontSize: 35, 
        color: '#fff'
    },
    placeholder: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    }
});
