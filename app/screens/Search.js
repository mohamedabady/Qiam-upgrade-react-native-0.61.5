import React, { Component } from 'react';
import {
    Container,
    Content,
    Grid,
    Row,
    Col,
    Icon,
    Toast,
    Body,
    Button,
    Text,
    Input,
    Item,
    View,
    Root,
    CheckBox
  } from 'native-base';
import { StatusBar, ImageBackground, StyleSheet, Dimensions, Platform, NativeModules, AsyncStorage } from 'react-native';
import {  } from '../assets/schema/Schema';

const win = Dimensions.get('window');

export default class Search extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "البحث",
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
    error: false,
    search: '',
    checkboxes: [{
      id: 1,
      title: 'البحث فى العناوين',
      checked: false,
    }, {
      id: 2,
      title: 'التطبيق ككل',
      checked: false,
    }, {
      id: 3,
      title: 'القيم الإيمانية والأخلاقية',
      checked: false,
    },
    {
      id: 4,
      title: 'القيم المعرفية والعقلية',
      checked: false,
    },
    {
      id: 5,
      title: 'القيم الوطنية والأمنية',
      checked: false,
    },
    {
      id: 6,
      title: 'القيم الاجتماعية و الأسرية',
      checked: false,
    },
    {
      id: 7,
      title: 'القيم الاقتصادية',
      checked: false,
    },
    {
      id: 8,
      title: 'القيم الصحية و البيئية',
      checked: false,
    },
    {
      id: 9,
      title: 'القيم الإدارية',
      checked: false,
    }]
  }

  toggleCheckbox(id) {
    
    const changedCheckbox = this.state.checkboxes.find((cb) => cb.id === id);
  
    changedCheckbox.checked = !changedCheckbox.checked;
  
    const checkboxes = [...this.state.checkboxes];
  
    this.setState({ checkboxes });
  }

  toSearch = () => {
    if(this.state.search != '') {
      this.setState({error: false});
      const checked = [...this.state.checkboxes];
      const mapresult = [];

      checked.map(val => {
        if(val.checked)
          mapresult.push(val);
      });


      if(mapresult.length == 1 && mapresult[0].id <= 2) {
        this.props.navigation.navigate('result', {search: this.state.search, searchfor: mapresult[0]});
      } else {
        let reject = false;
        mapresult.map(val => {
          if(val.id <= 2) {
            reject = true;
          }
        });
        if(!reject && mapresult.length > 0) {
          this.props.navigation.navigate('result', {search: this.state.search, multisearch: mapresult});
        } else {
          Toast.show({text: 'الرجاء اختيار بحث محدد', position: 'bottom', type: 'warning', duration: 2000, textStyle: {textAlign: 'right'}});
        }
      }
    } else {
      this.setState({error: true})
    }
  }
  render() {
    console.disableYellowBox = true;
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
                    <Item regular error = {this.state.error} >
                      <Icon name='search' type = 'Ionicons' style = {{color: '#6B6D6D'}} />
                      <Input placeholder = 'عنوان البحث' style = {styles.text} onChangeText = {(search) => this.setState({search})} />
                    </Item>
                    <Text style = {[styles.text, {color: '#002323', paddingRight: 0, marginBottom: 10, marginTop: 10}]}>البحث داخل</Text>
                    {
                      this.state.checkboxes.map((val) => {
                        if(val.id < 3) {
                          return (
                            <View style = {{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10, marginBottom: 15,}}>
                              <Text style = {[styles.text, {color: '#002323', paddingRight: 5}]}>{val.title}</Text>
                              <CheckBox key = {val.id} checked = {val.checked} color = '#278773' onPress = {() => {
                                this.toggleCheckbox(val.id)
                              }} />
                            </View>
                          )
                        } else {
                          return (
                            <View style = {{flexDirection: 'row', marginRight: 10, marginBottom: 15}}>
                              <View style = {{flexDirection:'column', flex: 1}}>
                                <View style = {{flexDirection: 'row', justifyContent: 'flex-end'}}>
                                  <Text style = {[styles.text, {color: '#002323', paddingRight: 5}]}>{val.title}</Text>
                                  <CheckBox key = {val.id} checked={val.checked} color = '#278773' onPress = {() => {
                                    this.toggleCheckbox(val.id)
                                  }} />
                                </View>
                              </View>
                            </View>
                          )
                        }
                      })
                    }
                    <Button block style = {{backgroundColor: '#278773'}} onPress = {this.toSearch}>
                      <Text style = {[styles.text, {color: '#fff', fontSize: 18}]}>بحث</Text>
                    </Button>
                  </Col>
              </Grid>
          </Content>
      </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
    text: {
      fontSize: 14,
      fontFamily: 'Cairo-Regular',
      color: '#6B6D6D',
      paddingRight: 15
    },
    placeholder: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    }
});
