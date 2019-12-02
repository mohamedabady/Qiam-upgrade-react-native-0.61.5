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
    Input,
    Item,
    View,
    Spinner,
  } from 'native-base';
import { Platform, ImageBackground, StatusBar, StyleSheet,Dimensions  } from 'react-native';
import ViewMoreText from 'react-native-view-more-text';
import Highlighter from 'react-native-highlight-words';
import mainfields from '../assets/constants/Search';
import values from '../assets/constants/Routes';

var RNFS = require('react-native-fs');



const win = Dimensions.get('window');
const filePath = Platform.OS == 'ios' ? RNFS.MainBundlePath : 'file:///storage/emulated/0';
const isIos = Platform.OS == 'ios' ? RNFS.MainBundlePath : RNFS.ExternalStorageDirectoryPath;
const stat = Platform.OS == 'ios' ? RNFS.MainBundlePath : '/storage/emulated/0';

export default class SearchResult extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "نتيجة البحث",
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
    titles: [],
    subjects: [],
    spinner: false,
    isDownloading: false,
  }
  componentDidMount(){
    this.setState({spinner: true});
    setTimeout(() => {
    const searchfor = this.props.navigation.getParam('searchfor');
    const keyword = this.props.navigation.getParam('search');
    if(searchfor != null) {
      switch(searchfor.id) {
        case 1:
        // search for subjects title
        const titles = [];
        mainfields.map(val => {
          val.subfileds.map(sub => {
            if(sub.name.indexOf(keyword) > -1) {
              titles.push({subfiled: val.name, name: sub.name});
            }
          });
        });
        this.setState({titles, spinner: false});
        break;

        case 2:
        const subjects = [];
        mainfields.map(val => {
          val.subfileds.map(sub => {
            let index = sub.content.indexOf(keyword);
            if(index > -1) {
              subjects.push({mainfield: val.name, subfiled: sub.name, content: sub.content.substring(index) });
            }
          });
        });
        this.setState({subjects, spinner: false});
        break;
      }
    } else {
      const searchsubjects = this.props.navigation.getParam('multisearch');
      const subjects = [];
      searchsubjects.map(key => {
        mainfields.map(val => {
          if(val.name == key.title) {
            val.subfileds.map(sub => {
              let index = sub.content.indexOf(keyword);
              if(index > -1) {
                subjects.push({mainfield: val.name, subfiled: sub.name, content: sub.content.substring(index) });
              }
            });
          }
        });
      });
      this.setState({subjects, spinner: false});
      
    }
    }, 1000);
  };
  
  showPdf(name) {
    let file;
    values.map(val => {
      val.values.map(sub => {
        if(sub.title == name) {
          file = sub.file;
        }
      })
    })
    RNFS.stat(stat + '/prophet_app/'+name+'.pdf').then(val => {
      const DOCUMENT = filePath + '/prophet_app/'+name+'.pdf';
      this.props.navigation.navigate('pdf', {title: name, color: '#278773', pdf: DOCUMENT});
    }).catch(err => {
      RNFS.downloadFile({
        fromUrl: file,
        toFile: isIos + '/prophet_app/'+name+'.pdf',
        begin: (res) => {
          this.setState({isDownloading: true});
        }
      }).promise.then((val) => {
          this.setState({isDownloading: false});
          const DOCUMENT = filePath + '/prophet_app/'+name+'.pdf';
          this.props.navigation.navigate('pdf', {title: name, color: '#278773', pdf: DOCUMENT});
      }).catch(err => {
          alert(err);
      })
    });
  }

  render() {
    const keyword = this.props.navigation.getParam('search');
    return (
     <Container>
          {
          Platform.OS === 'android' && 
          <StatusBar backgroundColor = "#278773" />
          }
          <Content>
            <ImageBackground source = {require('../assets/images/placeholder.png')} style = {[styles.placeholder, {opacity: 0.01}]}></ImageBackground>
              <Grid style = {{margin: 20, minHeight: win.height}}>
                  <Col>
                    <Text style = {[styles.text, {color: '#002323', paddingRight: 0, marginBottom: 10, marginTop: 10}]}>عبارة البحث</Text>
                    <Item regular >
                      <Icon name='search' type = 'Ionicons' style = {{color: '#6B6D6D'}} />
                      <Input placeholder = 'عنوان البحث' value = {this.props.navigation.getParam('search')} style = {styles.text} />
                    </Item>
                    {
                      this.state.isDownloading &&
                      <Body>
                        <Spinner animating = {this.state.isDownloading} size = 'large' />
                      </Body>
                    }
                    {
                      this.state.subjects.length > 0 &&
                        this.state.subjects.map(val => {
                          return (
                            <View style = {{backgroundColor: '#002323', marginTop: 20, borderRadius: 6}}>
                              <Text style = {{color: '#fff', fontFamily: 'Cairo-Bold', fontSize: 14, textAlign: 'center', borderBottomWidth: 2, borderColor: '#fff', paddingTop: 15, paddingBottom: 15,}}> نتائج البحث فى قسم : {val.mainfield}  قيمة : {val.subfiled} </Text>
                              <ViewMoreText
                                  numberOfLines={8}
                                  textStyle={{textAlign: 'right', color: '#fff', fontFamily: 'Cairo-Regular', fontSize: 13, padding: 8 }}
                                >
                                  <Highlighter
                                        highlightStyle={{backgroundColor: 'yellow'}}
                                        searchWords={[keyword]}
                                        textToHighlight= {val.content}
                                  />
                              </ViewMoreText>
                              <Body>
                                <Button style = {{padding: 10, backgroundColor: '#002323', borderWidth: 2, borderColor: '#fff', marginBottom: 10}} onPress = {() => {
                                  this.showPdf(val.subfiled);
                                }} >
                                  <Text style = {{color: '#fff', fontFamily: 'Cairo-Regular', fontSize: 14}}>عرض الدرس</Text>
                                </Button>
                              </Body>
                            </View>
                          )
                        })
                    }
                    {
                      this.state.titles.length > 0 && 
                      
                        this.state.titles.map(val => {
                          return (
                            <View style = {{ backgroundColor: '#002323', marginTop: 20, borderRadius: 6}}>
                              <Text style = {{color: '#fff', fontFamily: 'Cairo-Bold', fontSize: 14, textAlign: 'center', borderBottomWidth: 2, borderColor: '#fff', paddingTop: 15, paddingBottom: 15,}}> نتائج البحث فى قسم : {val.subfiled}</Text>
                              
                              <Text style = {{color: '#fff', fontFamily: 'Cairo-Regular', fontSize: 12, textAlign: 'right', paddingTop: 20, paddingBottom: 20, paddingRight: 12}}>{val.name}</Text>
                              <Body>
                                <Button style = {{backgroundColor: '#002323', borderWidth: 2, borderColor: '#fff', marginBottom: 10, padding: 10,}} onPress = {() => {
                                  this.showPdf(val.name);
                                }}>
                                  <Text style = {{color: '#fff', fontFamily: 'Cairo-Regular', fontSize: 14}}>عرض الدرس</Text>
                                </Button>
                              </Body>
                            </View>
                          )
                        })
                      
                    }
                    {
                      this.state.spinner &&
                      <Body>
                        <Spinner animating = {this.state.spinner} size = 'large' />
                      </Body>
                    }

                    {
                      this.state.subjects.length < 1 &&  this.state.titles.length < 1 && !this.state.spinner ? 
                      <Text style = {{color: '#002323', fontFamily: 'Cairo-Bold', fontSize: 16, textAlign: 'center', marginTop: 15}}>
                        لم يتم العثور على بيانات
                      </Text> : null
                      
                    }
                    
                    
                    
                  </Col>
              </Grid>
          </Content>
      </Container>
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
